from collections.abc import Iterable
from collections.abc import Mapping
from collections.abc import Sequence

import re


PATTERNS = {
    "facebook": re.compile(
        r"^(http:|https:|)\/\/(m.|www.)?(facebook)\.com\/(?P<username>[A-Za-z0-9._-]*)$"
    ),
    "x": re.compile(
        r"^(http:|https:|)\/\/(m.|www.)?(x|twitter)\.com\/(?P<username>[A-Za-z0-9._-]*)$"
    ),
}

#: Texts that hold no value, the literal string ``"None"`` included.
EMPTY_VALUES = frozenset({"", "None", "none", "null"})

#: A social link, as a ``social_links`` field stores it.
SocialLink = dict[str, str | list[dict[str, str]]]


def _text(value: object) -> str:
    """Return a value as usable text.

    :param value: The value, as stored.
    :returns: The value, stripped, or an empty string when it is not a string,
        or is one of :data:`EMPTY_VALUES`.
    """
    if not isinstance(value, str):
        return ""
    text = value.strip()
    return "" if text in EMPTY_VALUES else text


def _as_group(links: object) -> list:
    """Return a group of links as a list.

    :param links: The group, such as a list, a ``PersistentList``, or ``None``.
    :returns: Its items, or an empty list when it is not a sequence.
    """
    if isinstance(links, Sequence) and not isinstance(links, str | bytes):
        return list(links)
    return []


def link_target(link: object) -> str:
    """Return the address of a social link's first target.

    The backend validates no key of a link, so a link written through the
    REST API may have no target, or one of another shape.

    :param link: A social link, as a ``social_links`` field stores it.
    :returns: The ``@id`` of the link's first target, stripped, or an empty
        string when the link has no such target.
    """
    if not isinstance(link, Mapping):
        return ""
    targets = _as_group(link.get("href"))
    first = targets[0] if targets else None
    return _text(first.get("@id")) if isinstance(first, Mapping) else ""


def filter_social_links(social_links: list[dict], network_id: str) -> dict | None:
    """Return the first link to a network that has a target.

    A link without a target is skipped, as the frontend does not render it.

    :param social_links: The links, as a ``social_links`` field stores them.
    :param network_id: The network's id, such as ``x``.
    :returns: The link, or ``None`` when no link to the network has a target.
    """
    for link in social_links:
        if link.get("id") == network_id and link_target(link):
            return link
    return None


def extract_username_from_profile(profile: str, network_id: str) -> str:
    """Extract the username from a profile url."""
    pattern = PATTERNS.get(network_id)
    if pattern and (match := re.match(pattern, profile)):
        username = match.groupdict()["username"]
        return username
    return ""


def extract_username_from_social_links(
    social_links: list[dict], network_id: str
) -> str:
    """Return the username in the first link to a network that has a target.

    :param social_links: The links, as a ``social_links`` field stores them.
    :param network_id: The network's id, such as ``x``.
    :returns: The username, or an empty string when no link to the network
        has a target, or its target is not a profile address.
    """
    link = filter_social_links(social_links, network_id)
    if link:
        return extract_username_from_profile(link_target(link), network_id)
    return ""


def create_social_link(network_id: str, url: str, title: str) -> SocialLink:
    """Create a social link.

    :param network_id: The network's id, such as ``x``. It is also the link's
        ``@id``.
    :param url: The address the link points to.
    :param title: The title of the link, and of its target.
    :returns: The link, as a ``social_links`` field stores it.
    """
    return {
        "@id": network_id,
        "href": [{"@id": url, "title": title}],
        "id": network_id,
        "title": title,
    }


def add_social_link(
    social_links: Sequence[Mapping] | None,
    network_id: str,
    url: str,
    title: str,
) -> tuple[list[SocialLink], bool]:
    """Append a link to a network the links have no link to.

    The links given are not modified. Assign the list this returns to the
    field: a stored list changed in place is not saved.

    :param social_links: The links, as a ``social_links`` field stores them.
        ``None`` counts as no links.
    :param network_id: The network's id, such as ``x``.
    :param url: The address the link points to.
    :param title: The title of the link, and of its target.
    :returns: The links, with the new link last, and whether it was added. It
        is not added when a link to the network with a target is already
        there, or when ``network_id`` or ``url`` holds no text.
    """
    links = _as_group(social_links)
    network = _text(network_id)
    target = _text(url)
    if not (network and target):
        return links, False
    for link in links:
        if (
            isinstance(link, Mapping)
            and _text(link.get("id")) == network
            and link_target(link)
        ):
            return links, False
    return [*links, create_social_link(network, target, title)], True


def cleanse_social_links(
    base_links: Sequence[Mapping] | None,
    sources: Iterable[Sequence[Mapping] | None] = (),
) -> tuple[list[SocialLink], bool]:
    """Merge groups of social links, keeping one link per network.

    The stored links win over the links of every source, and an earlier source
    wins over a later one. A link without a network or a target is dropped.

    :param base_links: The stored links, as a ``social_links`` field stores
        them. ``None`` counts as no links.
    :param sources: Further groups of links, in precedence order, such as
        links built with :func:`create_social_link`. A group that is not a
        sequence is skipped.
    :returns: The merged links, as plain dicts, and whether they differ from
        ``base_links``.
    """
    base = _as_group(base_links)
    merged: list[SocialLink] = []
    seen: set[str] = set()
    for group in (base, *(_as_group(source) for source in sources)):
        for link in group:
            if not isinstance(link, Mapping):
                continue
            network = _text(link.get("id"))
            if not network or network in seen or not link_target(link):
                continue
            seen.add(network)
            merged.append(dict(link))
    return merged, merged != base

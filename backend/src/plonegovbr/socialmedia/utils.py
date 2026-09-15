import re


PATTERNS = {
    "facebook": re.compile(
        r"^(http:|https:|)\/\/(m.|www.)?(facebook)\.com\/(?P<username>[A-Za-z0-9._-]*)$"
    ),
    "x": re.compile(
        r"^(http:|https:|)\/\/(m.|www.)?(x|twitter)\.com\/(?P<username>[A-Za-z0-9._-]*)$"
    ),
}


def link_target(link: dict) -> str:
    """Return the address of a social link's first target.

    The backend validates no key of a link, so a link written through the
    REST API may have no target, or one of another shape.

    :param link: A social link, as a ``social_links`` field stores it.
    :returns: The ``@id`` of the link's first target, or an empty string when
        the link has no such target.
    """
    targets = link.get("href")
    if isinstance(targets, list) and targets and isinstance(targets[0], dict):
        url = targets[0].get("@id")
        return url if isinstance(url, str) else ""
    return ""


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

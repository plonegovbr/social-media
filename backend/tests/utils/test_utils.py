from collections import UserDict
from plonegovbr.socialmedia import utils

import copy
import pytest


@pytest.mark.parametrize(
    "profile,network_id,expected",
    [
        ("https://x.com/ploneorgbr", "x", "ploneorgbr"),
        ("https://twitter.com/ploneorgbr", "x", "ploneorgbr"),
        ("https://facebook.com/plonecms", "facebook", "plonecms"),
        ("https://facebook.com/PloneBr", "facebook", "PloneBr"),
    ],
)
def test_extract_username_from_profile(profile: str, network_id: str, expected: str):
    func = utils.extract_username_from_profile
    result = func(profile, network_id)
    assert result == expected


@pytest.mark.parametrize(
    "profile,network_id",
    [
        # No pattern for the network
        ("https://instagram.com/plonebr", "instagram"),
        # Not a profile on the network
        ("https://example.com/ploneorgbr", "x"),
        ("https://facebook.com/PloneBr/about", "facebook"),
    ],
)
def test_extract_username_from_profile_no_match(profile: str, network_id: str):
    func = utils.extract_username_from_profile
    result = func(profile, network_id)
    assert result == ""


@pytest.mark.parametrize(
    "link,expected",
    [
        ({"href": [{"@id": "https://x.com/plone"}]}, "https://x.com/plone"),
        ({"href": [{"@id": "  https://x.com/plone  "}]}, "https://x.com/plone"),
        ({"href": ({"@id": "https://x.com/plone"},)}, "https://x.com/plone"),
        (
            UserDict({"href": [UserDict({"@id": "https://x.com/plone"})]}),
            "https://x.com/plone",
        ),
        ({"href": [{"@id": "None"}]}, ""),
        ("https://x.com/plone", ""),
        (None, ""),
    ],
    ids=[
        "target",
        "padded-target",
        "href-a-tuple",
        "link-a-mapping",
        "target-none-text",
        "link-a-string",
        "link-none",
    ],
)
def test_link_target(link, expected: str):
    func = utils.link_target
    result = func(link)
    assert result == expected


@pytest.mark.parametrize(
    "network_id,expected",
    [
        ("x", "x"),
        ("facebook", "facebook"),
        ("linkedin", None),
    ],
)
def test_filter_social_links(social_links, network_id: str, expected: str | None):
    func = utils.filter_social_links
    result = func(social_links, network_id)
    assert (result["id"] if result else None) == expected


def test_filter_social_links_first_match(social_links):
    func = utils.filter_social_links
    duplicated = [*social_links, {**social_links[0], "title": "Second X"}]
    result = func(duplicated, "x")
    assert result is social_links[0]


def test_filter_social_links_skips_links_without_target(social_links):
    func = utils.filter_social_links
    untargeted = {"id": "x", "title": "Old X"}
    result = func([untargeted, *social_links], "x")
    assert result is social_links[0]


@pytest.mark.parametrize(
    "link",
    [
        {"id": "x", "title": "X"},
        {"id": "x", "title": "X", "href": []},
        {"id": "x", "title": "X", "href": [{"title": "x.com/plone"}]},
        {"id": "x", "title": "X", "href": [{"@id": None}]},
        {"id": "x", "title": "X", "href": ["https://x.com/plone"]},
        {"id": "x", "title": "X", "href": "https://x.com/plone"},
        {"title": "X", "href": [{"@id": "https://x.com/plone"}]},
    ],
    ids=[
        "no-href",
        "empty-href",
        "target-without-id",
        "id-not-a-string",
        "target-not-an-object",
        "href-not-a-list",
        "no-network",
    ],
)
def test_extract_username_from_social_links_without_target(link: dict):
    func = utils.extract_username_from_social_links
    result = func([link], "x")
    assert result == ""


@pytest.mark.parametrize(
    "network_id,expected",
    [
        ("x", "ploneorgbr"),
        ("facebook", "PloneBr"),
        # Linked, but no pattern for the network
        ("bluesky", ""),
        # Not linked
        ("linkedin", ""),
    ],
)
def test_extract_username_from_social_links(
    social_links, network_id: str, expected: str
):
    func = utils.extract_username_from_social_links
    result = func(social_links, network_id)
    assert result == expected


def test_extract_username_from_social_links_skips_links_without_target(
    social_links,
):
    func = utils.extract_username_from_social_links
    untargeted = {"id": "x", "title": "Old X"}
    result = func([untargeted, *social_links], "x")
    assert result == "ploneorgbr"


def test_create_social_link():
    func = utils.create_social_link
    result = func("github", "https://github.com/plonegovbr", "GitHub")
    assert result == {
        "@id": "github",
        "href": [{"@id": "https://github.com/plonegovbr", "title": "GitHub"}],
        "id": "github",
        "title": "GitHub",
    }


def test_add_social_link(social_links):
    func = utils.add_social_link
    result, added = func(
        social_links, "github", "https://github.com/plonegovbr", "GitHub"
    )
    assert added is True
    assert result == [
        *social_links,
        utils.create_social_link("github", "https://github.com/plonegovbr", "GitHub"),
    ]


def test_add_social_link_network_already_linked(social_links):
    func = utils.add_social_link
    result, added = func(social_links, "x", "https://x.com/plone", "X")
    assert added is False
    assert result == social_links


def test_add_social_link_network_linked_without_target(social_links):
    func = utils.add_social_link
    base = [{"id": "x", "title": "Old X"}, *social_links[1:]]
    result, added = func(base, "x", "https://x.com/plone", "X")
    assert added is True
    assert result == [*base, utils.create_social_link("x", "https://x.com/plone", "X")]


@pytest.mark.parametrize(
    "network_id,url",
    [
        ("", "https://github.com/plonegovbr"),
        ("github", ""),
        ("github", "   "),
        ("github", "None"),
    ],
    ids=["no-network", "no-url", "blank-url", "url-none-text"],
)
def test_add_social_link_without_network_or_url(
    social_links, network_id: str, url: str
):
    func = utils.add_social_link
    result, added = func(social_links, network_id, url, "GitHub")
    assert added is False
    assert result == social_links


@pytest.mark.parametrize("base", [None, []])
def test_add_social_link_to_no_links(base):
    func = utils.add_social_link
    result, added = func(base, "x", "https://x.com/plone", "X")
    assert added is True
    assert result == [utils.create_social_link("x", "https://x.com/plone", "X")]


def test_add_social_link_strips_network_and_url():
    func = utils.add_social_link
    result, _ = func([], " x ", " https://x.com/plone ", "X")
    assert result == [utils.create_social_link("x", "https://x.com/plone", "X")]


def test_add_social_link_does_not_modify_links(social_links):
    func = utils.add_social_link
    before = copy.deepcopy(social_links)
    func(social_links, "github", "https://github.com/plonegovbr", "GitHub")
    assert social_links == before


def test_add_social_link_again_adds_nothing():
    func = utils.add_social_link
    links, _ = func([], "x", "https://x.com/ploneorgbr", "X")
    result, added = func(links, "x", "https://x.com/ploneorgbr", "X")
    assert added is False
    assert result == links


def test_add_social_link_gives_username():
    links, _ = utils.add_social_link([], "x", "https://x.com/ploneorgbr", "X")
    result = utils.extract_username_from_social_links(links, "x")
    assert result == "ploneorgbr"


def _link(network_id: str, url: str) -> utils.SocialLink:
    """Build a link the way :func:`utils.create_social_link` does.

    :param network_id: The network's id.
    :param url: The address the link points to.
    :returns: The link.
    """
    return utils.create_social_link(network_id, url, network_id.capitalize())


#: Links without a network or a target, which a merge drops.
UNRENDERABLE = [
    {},
    {"id": "github"},
    {"id": "github", "href": []},
    {"id": "github", "href": [{}]},
    {"id": "github", "href": [{"@id": ""}]},
    {"id": "github", "href": [{"@id": "None"}]},
    {"id": "github", "href": "https://github.com/plonegovbr"},
    {"id": "", "href": [{"@id": "https://github.com/plonegovbr"}]},
    {"href": [{"@id": "https://github.com/plonegovbr"}]},
    None,
    "not a link",
]


def test_cleanse_social_links_sources_add_missing_networks():
    func = utils.cleanse_social_links
    base = [_link("github", "https://github.com/plonegovbr")]
    source = [_link("linkedin", "https://linkedin.com/company/plone")]
    result, changed = func(base, sources=[source])
    assert [link["id"] for link in result] == ["github", "linkedin"]
    assert changed is True


def test_cleanse_social_links_base_wins_for_the_same_network():
    func = utils.cleanse_social_links
    base = [_link("github", "https://github.com/old")]
    source = [_link("github", "https://github.com/new")]
    result, changed = func(base, sources=[source])
    assert result == base
    assert changed is False


def test_cleanse_social_links_earlier_source_wins():
    func = utils.cleanse_social_links
    first = [_link("github", "https://github.com/first")]
    second = [_link("github", "https://github.com/second")]
    result, _ = func([], sources=[first, second])
    assert result == first


def test_cleanse_social_links_order_is_first_appearance():
    func = utils.cleanse_social_links
    base = [_link("x", "https://x.com/ploneorgbr")]
    sources = [
        [
            _link("github", "https://github.com/plonegovbr"),
            _link("x", "https://x.com/b"),
        ],
        [_link("linkedin", "https://linkedin.com/company/plone")],
    ]
    result, _ = func(base, sources=sources)
    assert [link["id"] for link in result] == ["x", "github", "linkedin"]


def test_cleanse_social_links_drops_second_link_to_a_network():
    func = utils.cleanse_social_links
    kept = _link("github", "https://github.com/plonegovbr")
    base = [kept, _link("github", "https://github.com/other")]
    result, changed = func(base)
    assert result == [kept]
    assert changed is True


@pytest.mark.parametrize("link", UNRENDERABLE)
def test_cleanse_social_links_drops_unrenderable_links(link):
    func = utils.cleanse_social_links
    valid = _link("linkedin", "https://linkedin.com/company/plone")
    result, changed = func([link, valid], sources=[[link]])
    assert result == [valid]
    assert changed is True


@pytest.mark.parametrize("base", [None, []])
def test_cleanse_social_links_nothing_in_nothing_out(base):
    func = utils.cleanse_social_links
    assert func(base, sources=[]) == ([], False)


def test_cleanse_social_links_sources_fill_missing_base():
    func = utils.cleanse_social_links
    source = [_link("x", "https://x.com/ploneorgbr")]
    assert func(None, sources=[source]) == (source, True)


def test_cleanse_social_links_returns_plain_dicts():
    func = utils.cleanse_social_links
    stored = UserDict(_link("github", "https://github.com/plonegovbr"))
    result, changed = func([stored])
    assert type(result[0]) is dict
    assert changed is False


def test_cleanse_social_links_skips_unusable_groups():
    func = utils.cleanse_social_links
    valid = [_link("github", "https://github.com/plonegovbr")]
    result, _ = func([], sources=[None, "junk", 42, valid])
    assert result == valid


def test_cleanse_social_links_does_not_modify_links(social_links):
    func = utils.cleanse_social_links
    base = [*social_links, {}]
    source = [_link("linkedin", "https://linkedin.com/company/plone")]
    before = (copy.deepcopy(base), copy.deepcopy(source))
    func(base, sources=[source])
    assert (base, source) == before


def test_cleanse_social_links_again_is_no_change(social_links):
    func = utils.cleanse_social_links
    source = [_link("linkedin", "https://linkedin.com/company/plone")]
    merged, _ = func(social_links, sources=[source])
    result, changed = func(merged, sources=[source])
    assert result == merged
    assert changed is False

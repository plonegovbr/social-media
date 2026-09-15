from plonegovbr.socialmedia import utils

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

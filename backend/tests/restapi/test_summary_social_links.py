"""Tests for ``social_links`` in the summaries of catalog results."""

from plone import api
from plone.dexterity.content import DexterityContent
from plone.restapi.interfaces import ISerializeToJsonSummary
from plone.restapi.serializer.summary import merge_serializer_metadata_utilities_data
from plonegovbr.socialmedia import PACKAGE_NAME
from zope.component import getMultiAdapter

import pytest


COLUMN = "social_links"

DEMO_PROFILE = f"{PACKAGE_NAME}:demo"


def test_default_metadata_field(portal):
    """Every summary asks for the column, without metadata_fields."""
    fields = merge_serializer_metadata_utilities_data()["default_metadata_fields"]
    assert COLUMN in fields


@pytest.mark.portal(profiles=[DEMO_PROFILE])
class TestBrainSummary:
    @pytest.fixture(autouse=True)
    def _setup(self, portal, http_request):
        self.portal = portal
        self.request = http_request

    def summary(self, obj: DexterityContent) -> dict:
        """Serialize the brain of an object as a summary.

        :param obj: A catalogued object.
        :returns: The summary.
        """
        catalog = api.portal.get_tool("portal_catalog")
        brain = catalog.unrestrictedSearchResults(UID=obj.UID())[0]
        return getMultiAdapter((brain, self.request), ISerializeToJsonSummary)()

    def test_carries_the_links(self):
        document = self.portal["profiles"]
        assert self.summary(document)[COLUMN] == document.social_links

    def test_is_plain_json(self):
        """Lists and dicts, not the catalog's persistent types."""
        value = self.summary(self.portal["profiles"])[COLUMN]
        assert type(value) is list
        assert all(type(link) is dict for link in value)
        assert all(type(link["href"]) is list for link in value)

    def test_content_without_links_is_null(self):
        with api.env.adopt_roles(["Manager"]):
            news_item = api.content.create(
                container=self.portal, type="News Item", id="news-item", title="News"
            )
        summary = self.summary(news_item)
        assert COLUMN in summary
        assert summary[COLUMN] is None

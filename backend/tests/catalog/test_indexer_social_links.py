"""Tests for the ``social_links`` catalog metadata column."""

from persistent.list import PersistentList
from persistent.mapping import PersistentMapping
from plone import api
from plone.dexterity.content import DexterityContent
from plonegovbr.socialmedia import PACKAGE_NAME
from plonegovbr.socialmedia import utils

import Missing
import pytest


COLUMN = "social_links"

DEMO_PROFILE = f"{PACKAGE_NAME}:demo"


def brain_value(obj: DexterityContent) -> object:
    """Read the column off an object's brain.

    :param obj: A catalogued object.
    :returns: The value the catalog holds for it.
    """
    catalog = api.portal.get_tool("portal_catalog")
    brain = catalog.unrestrictedSearchResults(UID=obj.UID())[0]
    return getattr(brain, COLUMN)


class TestColumnIsInstalled:
    @pytest.fixture(autouse=True)
    def _setup(self, portal):
        self.catalog = portal.portal_catalog

    def test_column_exists(self):
        """Listings read the links off the brain, without waking the object."""
        assert COLUMN in self.catalog.schema()

    def test_no_index(self):
        """Links are shown, not searched."""
        assert COLUMN not in self.catalog.indexes()


@pytest.mark.portal(profiles=[DEMO_PROFILE])
class TestColumnValue:
    @pytest.fixture(autouse=True)
    def _setup(self, portal):
        self.portal = portal
        self.document = portal["profiles"]

    def create(self, portal_type: str, id_: str) -> DexterityContent:
        """Create an object at the site root, which has links of its own.

        :param portal_type: The content type.
        :param id_: The object's id.
        :returns: The object.
        """
        with api.env.adopt_roles(["Manager"]):
            return api.content.create(
                container=self.portal, type=portal_type, id=id_, title=id_
            )

    @pytest.mark.parametrize("path", ["", "profiles"], ids=["site-root", "document"])
    def test_holds_the_links(self, path: str):
        obj = self.portal[path] if path else self.portal
        assert brain_value(obj) == obj.social_links

    def test_is_persistent_at_every_depth(self):
        value = brain_value(self.document)
        assert isinstance(value, PersistentList)
        for link in value:
            assert isinstance(link, PersistentMapping)
            assert isinstance(link["href"], PersistentList)
            assert all(isinstance(target, PersistentMapping) for target in link["href"])

    def test_follows_a_change(self):
        links, _ = utils.add_social_link(
            self.document.social_links,
            "github",
            "https://github.com/plonegovbr",
            "GitHub",
        )
        self.document.social_links = links
        self.document.reindexObject()
        assert brain_value(self.document) == links

    def test_no_links_store_nothing(self):
        self.document.social_links = []
        self.document.reindexObject()
        assert brain_value(self.document) is Missing.Value

    def test_content_without_links_stores_nothing(self):
        """A Document at the site root does not read the root's links."""
        document = self.create("Document", "no-links")
        assert brain_value(document) is Missing.Value

    def test_content_without_the_behavior_stores_nothing(self):
        """A News Item at the site root does not read the root's links."""
        news_item = self.create("News Item", "news-item")
        assert brain_value(news_item) is Missing.Value

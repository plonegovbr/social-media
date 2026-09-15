"""Upgrade to profile version 1001: the ``social_links`` metadata column.

``catalog.xml`` is read on install only. An existing site gets the column
through the upgrade step alone, and gets it filled only because the step
catalogues again every object that can hold links.
"""

from plone import api
from plone.dexterity.content import DexterityContent
from plonegovbr.socialmedia import PACKAGE_NAME
from plonegovbr.socialmedia.upgrades.v1001 import add_social_links_column
from Products.GenericSetup.tool import SetupTool
from unittest.mock import patch

import Missing
import pytest


PROFILE_ID = f"{PACKAGE_NAME}:default"

DEMO_PROFILE = f"{PACKAGE_NAME}:demo"

COLUMN = "social_links"


@pytest.fixture
def upgrade_steps(setup_tool: SetupTool) -> list:
    """The steps registered to take the profile from 1000 to 1001."""
    return [
        step
        for step in setup_tool.listUpgrades(PROFILE_ID, show_old=True, simple=True)
        if step.source == ("1000",) and step.dest == ("1001",)
    ]


class TestUpgradeStepRegistered:
    def test_one_step(self, upgrade_steps):
        assert len(upgrade_steps) == 1

    def test_destination_is_the_profile_version(self, setup_tool: SetupTool):
        """A step whose destination outruns ``metadata.xml`` never shows up."""
        assert setup_tool.getVersionForProfile(PROFILE_ID) == "1001"

    def test_a_site_at_1000_is_offered_the_step(self, setup_tool: SetupTool):
        setup_tool.setLastVersionForProfile(PROFILE_ID, "1000")
        assert setup_tool.listUpgrades(PROFILE_ID)

    def test_a_site_at_1001_is_offered_nothing(self, setup_tool: SetupTool):
        assert setup_tool.listUpgrades(PROFILE_ID) == []


@pytest.mark.portal(profiles=[DEMO_PROFILE])
class TestRunningTheUpgrade:
    """Run the step against a catalog as a 1000 site holds it."""

    @pytest.fixture(autouse=True)
    def _setup(self, portal, setup_tool: SetupTool):
        self.portal = portal
        self.setup_tool = setup_tool
        self.catalog = api.portal.get_tool("portal_catalog")
        self.catalog.delColumn(COLUMN)
        assert COLUMN not in self.catalog.schema()

    def upgrade(self) -> None:
        """Run the upgrade machinery as a site at 1000 would."""
        self.setup_tool.setLastVersionForProfile(PROFILE_ID, "1000")
        self.setup_tool.upgradeProfile(PROFILE_ID)

    def value(self, obj: DexterityContent) -> object:
        """Read the column off an object's brain.

        :param obj: A catalogued object.
        :returns: The value the catalog holds for it.
        """
        brain = self.catalog.unrestrictedSearchResults(UID=obj.UID())[0]
        return getattr(brain, COLUMN, Missing.Value)

    def test_adds_the_column(self):
        self.upgrade()
        assert COLUMN in self.catalog.schema()

    @pytest.mark.parametrize("path", ["", "profiles"], ids=["site-root", "document"])
    def test_fills_the_column(self, path: str):
        """The reason this is a handler: a column added alone holds nothing."""
        obj = self.portal[path] if path else self.portal
        self.upgrade()
        assert self.value(obj) == obj.social_links

    def test_moves_the_version_forward(self):
        self.upgrade()
        assert self.setup_tool.getLastVersionForProfile(PROFILE_ID) == ("1001",)

    def test_a_missing_column_after_the_import_is_loud(self):
        """Filling a column that was never created succeeds and does nothing."""
        with (
            patch.object(
                self.setup_tool, "runImportStepFromProfile", return_value=None
            ),
            pytest.raises(ValueError, match="still missing"),
        ):
            add_social_links_column(self.setup_tool)

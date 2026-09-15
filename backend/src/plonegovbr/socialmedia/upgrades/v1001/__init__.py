"""Take a site to profile version 1001: the ``social_links`` metadata column.

``catalog.xml`` gained a ``social_links`` column. Re-importing the ``catalog``
step creates it, empty: a column added to a catalog holds nothing for the
objects already in it until each one is catalogued again. A site that upgraded
and stopped there would have the column, no error, and listings without links.

So the step also catalogues again every object that can hold links: the ones
providing the marker of either behavior, the site root among them.
"""

from plone import api
from plonegovbr.socialmedia import logger
from plonegovbr.socialmedia.behaviors.social_links import ISocialLinks
from plonegovbr.socialmedia.behaviors.social_media import ISocialMedia
from Products.CMFPlone.CatalogTool import CatalogTool
from Products.GenericSetup.tool import SetupTool


#: The profile this step re-imports from.
PROFILE = "profile-plonegovbr.socialmedia:default"

#: The metadata column this upgrade exists to create and fill.
COLUMN = "social_links"

#: The one index named when cataloguing an object again. The catalog updates
#: the whole metadata record of an object it catalogues, and only the indexes
#: named, so naming one that does not change keeps the step from rebuilding
#: every index of every object.
INDEX = "getId"


def add_social_links_column(context: SetupTool) -> None:
    """Create the ``social_links`` metadata column and fill it.

    :param context: The setup tool running the upgrade.
    :raises ValueError: When the column is still missing after the import.
    """
    context.runImportStepFromProfile(PROFILE, "catalog")

    catalog: CatalogTool = api.portal.get_tool("portal_catalog")  # type: ignore[assignment]
    if COLUMN not in catalog.schema():
        # The import above should have created it. If it did not, cataloguing
        # the objects again would silently fill nothing.
        raise ValueError(
            f"The {COLUMN!r} column is still missing after re-importing the "
            f"catalog step. The upgrade would have reported success and "
            f"changed nothing."
        )

    brains = catalog.unrestrictedSearchResults(
        object_provides=[
            # The stubs omit Interface.__identifier__.
            ISocialMedia.__identifier__,  # type: ignore[attr-defined]
            ISocialLinks.__identifier__,  # type: ignore[attr-defined]
        ]
    )
    for brain in brains:
        obj = brain.getObject()
        catalog.reindexObject(obj, idxs=[INDEX], update_metadata=True)
    logger.info("Refreshed the %r column for %s objects.", COLUMN, len(brains))

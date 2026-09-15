"""The ``social_links`` catalog metadata.

The catalog keeps a copy of an object's links in the metadata column of the
same name, so a listing reads them off the brain without waking the object up.
As for Plone's own ``image_scales`` column, the copy is built of persistent
types: a ``PersistentList`` of ``PersistentMapping``.
"""

from Acquisition import aq_base
from collections.abc import Mapping
from collections.abc import Sequence
from persistent.list import PersistentList
from persistent.mapping import PersistentMapping
from plone.dexterity.interfaces import IDexterityContent
from plone.indexer.decorator import indexer
from plonegovbr.socialmedia.behaviors.social_links import ISocialLinks
from plonegovbr.socialmedia.behaviors.social_media import ISocialMediaSettings


def _persistent(value: object) -> object:
    """Return a value with its mappings and lists made persistent.

    :param value: A value read from a ``social_links`` field.
    :returns: The value, with every mapping a :class:`PersistentMapping` and
        every list a :class:`PersistentList`, at every depth.
    """
    if isinstance(value, Mapping):
        return PersistentMapping({
            key: _persistent(item) for key, item in value.items()
        })
    if isinstance(value, Sequence) and not isinstance(value, str | bytes):
        return PersistentList(_persistent(item) for item in value)
    return value


def _stored_links(obj: IDexterityContent) -> object:
    """Return the links an object stores itself.

    :param obj: The object, without acquisition, so that an object without
        links never reads the links of a parent.
    :returns: The ``social_links`` of the first of the two behaviors the object
        has, or ``None`` when it has neither.
    """
    for schema in (ISocialMediaSettings, ISocialLinks):
        adapted = schema(obj, None)
        if adapted is not None:
            return adapted.social_links
    return None


@indexer(IDexterityContent)
def social_links(obj: IDexterityContent) -> PersistentList:
    """Index a copy of an object's social links, for the metadata column.

    :param obj: The object being catalogued.
    :returns: The links, as a :class:`PersistentList` of
        :class:`PersistentMapping`.
    :raises AttributeError: When the object has neither behavior, or has no
        links, so that the catalog stores nothing for it.
    """
    links = _stored_links(aq_base(obj))
    if not links or not isinstance(links, Sequence):
        # Raising an AttributeError makes the catalog store nothing.
        raise AttributeError("social_links")
    return PersistentList(_persistent(link) for link in links)

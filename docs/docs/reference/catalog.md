---
myst:
  html_meta:
    "description": "The social_links metadata column plonegovbr.socialmedia adds to the catalog, and the value it holds."
    "property=og:description": "The social_links metadata column plonegovbr.socialmedia adds to the catalog, and the value it holds."
    "property=og:title": "Catalog metadata"
    "keywords": "Plone, plonegovbr.socialmedia, catalog, metadata, social_links, indexer"
---

(reference-catalog)=

# Catalog metadata

The `default` profile adds one metadata column named `social_links` to `portal_catalog`.
It adds no index, so the catalog cannot be searched by link.

## Metadata column

The column holds a copy of an object's links, so a brain carries them without waking the object up.
The REST API reads it to add `social_links` to every summary of a catalog result, as {ref}`reference-rest-api-summary` describes.

The indexer `plonegovbr.socialmedia.indexers.social_links.social_links` computes the value for every Dexterity object.

| Object | The column holds |
|---|---|
| With the `plonegovbr.socialmedia.settings` behavior, and links | A copy of the behavior's `social_links` |
| With the `plonegovbr.socialmedia.links` behavior, and links | A copy of its `social_links` |
| With either behavior, and no links | Nothing |
| With neither behavior | Nothing |

-   The links are read from the object itself, never acquired from a parent.
    A page inside a site whose root has links holds nothing.
-   When an object has both behaviors, the column holds the links of `plonegovbr.socialmedia.settings`.
-   Where the column holds nothing, the brain returns `Missing.Value`.

## Value types

The copy is built of persistent types, as Plone's own `image_scales` column is.

-   The list of links, and each list inside a link, such as `href`, is a `persistent.list.PersistentList`.
-   Each link, and each target inside `href`, is a `persistent.mapping.PersistentMapping`.

A `PersistentList` compares equal to a `list` with the same items, and a `PersistentMapping` to a `dict` with the same keys and values.
The field itself keeps the plain lists and dictionaries it was given.

## When the column changes

The catalog rewrites an object's whole metadata record each time it catalogues the object, a partial reindex included.
Saving an object from its edit form or through the REST API reindexes it, and so updates the column.

Code that changes `social_links` from Python must reindex the object, as {ref}`howto-add-a-link-from-python` shows.

A site installed before profile version `1001` has no column until it runs the upgrade step {ref}`reference-profiles-upgrades` describes.

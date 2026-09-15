---
myst:
  html_meta:
    "description": "The GenericSetup profiles plonegovbr.socialmedia ships, what each one applies, and its upgrade steps."
    "property=og:description": "The GenericSetup profiles plonegovbr.socialmedia ships, what each one applies, and its upgrade steps."
    "property=og:title": "GenericSetup profiles"
    "keywords": "Plone, plonegovbr.socialmedia, GenericSetup, profile, install, demo, upgrade step"
---

(reference-profiles)=

# GenericSetup profiles

`plonegovbr.socialmedia` ships three profiles.

| Profile | Title | Applied by |
|---|---|---|
| `plonegovbr.socialmedia:default` | Social Media support for Plone: Install | Installing the add-on |
| `plonegovbr.socialmedia:demo` | Social Media support for Plone: Demo content | The integrator, explicitly |
| `plonegovbr.socialmedia:uninstall` | Social Media support for Plone: Uninstall | Uninstalling the add-on |

The package declares a `plone.autoinclude.plugin` entry point with the target `plone`, so Plone loads its ZCML without an `<include />`.

## `plonegovbr.socialmedia:default`

The installation profile.
Version `1001`; depends on `plone.volto:default`.

It applies the following.

-   The browser layer `plonegovbr.socialmedia.interfaces.IBrowserLayer`.
-   The `plonegovbr.socialmedia.settings` behavior, on the `Plone Site` content type.
-   The `socialmedia` action of the Plone control panel, set to invisible.
-   The `social_links` metadata column of `portal_catalog`, as {doc}`catalog` describes.

The third step hides Plone's own **Social Media** control panel from {guilabel}`Site Setup`.
Its view, `@@social-controlpanel`, stays registered.

## `plonegovbr.socialmedia:demo`

Example content.
Version `1000`; it declares no dependency.

It applies the following.

-   The `plonegovbr.socialmedia.links` behavior, on the `Document` content type.
-   A post-handler, `plonegovbr.socialmedia.setuphandlers.demo.create_example_content`, which imports the content in `setuphandlers/examplecontent` with `plone.exportimport`.

The imported content is:

| Object | What it holds |
|---|---|
| The site root | `social_links` with four links: X, BlueSky, Facebook, and Instagram |
| `/profiles`, a `Document` | `social_links` with the same four links |

The demo profile needs the settings behavior on the site root, so apply `default` first.

## `plonegovbr.socialmedia:uninstall`

It applies the following.

-   Removes the browser layer.
-   Removes the `plonegovbr.socialmedia.settings` behavior from the `Plone Site` content type.
-   Makes the `socialmedia` action of the Plone control panel visible again, as Plone defines it.
-   Removes the `social_links` metadata column from `portal_catalog`.

Plone's own **Social Media** control panel is back in {guilabel}`Site Setup`.

A `HiddenProfiles` utility hides this profile from the site creation form and from the add-ons control panel.

(reference-profiles-upgrades)=

## Upgrade steps

The upgrade steps belong to the `plonegovbr.socialmedia:default` profile.

| Source | Destination | Title |
|---|---|---|
| `1000` | `1001` | Add the `social_links` catalog metadata |

### `1000` to `1001`

The handler `plonegovbr.socialmedia.upgrades.v1001.add_social_links_column` does the following, in order.

1.  Re-imports the `catalog` step of the `default` profile, which adds the `social_links` metadata column, empty.
2.  Raises a `ValueError` when the column is still missing.
3.  Catalogues again every object providing `ISocialMedia` or `ISocialLinks`, the interfaces that mark content with either behavior.
    For each object, the catalog rewrites its metadata, and reindexes the `getId` index alone.

The site root is one of those objects.
The step takes time in proportion to the number of objects with either behavior, not to the size of the site.

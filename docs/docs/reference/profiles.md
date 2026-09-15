---
myst:
  html_meta:
    "description": "The GenericSetup profiles plonegovbr.socialmedia ships, and what each one applies."
    "property=og:description": "The GenericSetup profiles plonegovbr.socialmedia ships, and what each one applies."
    "property=og:title": "GenericSetup profiles"
    "keywords": "Plone, plonegovbr.socialmedia, GenericSetup, profile, install, demo"
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
Version `1000`; depends on `plone.volto:default`.

It applies the following.

-   The browser layer `plonegovbr.socialmedia.interfaces.IBrowserLayer`.
-   The `plonegovbr.socialmedia.settings` behavior, on the `Plone Site` content type.
-   The `socialmedia` action of the Plone control panel, set to invisible.

The last step hides Plone's own **Social Media** control panel from {guilabel}`Site Setup`.
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

It does not make the `socialmedia` control panel action visible again.

A `HiddenProfiles` utility hides this profile from the site creation form and from the add-ons control panel.

## Upgrade steps

The package registers no upgrade step.

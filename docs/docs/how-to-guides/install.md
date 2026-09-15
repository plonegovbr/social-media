---
myst:
  html_meta:
    "description": "Add the plonegovbr.socialmedia package to a Plone project, and install its profile."
    "property=og:description": "Add the plonegovbr.socialmedia package to a Plone project, and install its profile."
    "property=og:title": "How to install the backend"
    "keywords": "Plone, plonegovbr.socialmedia, install, add-on, profile"
---

(howto-install)=

# How to install the backend

This guide shows you how to add `plonegovbr.socialmedia` to a Plone project, and install it in a site.

## Prerequisites

-   A Plone 6.1 or 6.2 project.
-   Python 3.11 or later.
-   A Volto frontend, to edit and show the settings.

## Add the package

Add `plonegovbr.socialmedia` to the dependencies of your project's backend package.

```toml
dependencies = [
    "Products.CMFPlone",
    "plonegovbr.socialmedia",
]
```

Then install it as your project normally does.

```shell
make backend-install
```

The package declares a `plone.autoinclude.plugin` entry point, so Plone loads its ZCML without an `<include />`.

## Install it in your site

Declare the profile as a dependency of your own package's profile, in `profiles/default/metadata.xml`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<metadata>
  <version>1000</version>
  <dependencies>
    <dependency>profile-plonegovbr.socialmedia:default</dependency>
  </dependencies>
</metadata>
```

Installing your package now installs this one with it, on every site you create.

If your project has no package of its own, install **Social Media support for Plone: Install** from {menuselection}`Site Setup --> Add-ons` instead.

Either way, the profile enables the settings behavior on the site root, and hides Plone's own **Social Media** control panel.
See {doc}`/reference/profiles` for everything it applies.

```{important}
Installing does not copy the values of Plone's **Social Media** control panel.
On a site that had them, set them again on the site root, as {doc}`set-the-site-links` shows.
```

## Verify the installation

Ask the site for the schema of its root.

```http
GET /Plone/@types/Plone%20Site HTTP/1.1
Accept: application/json
```

The response lists a `social_media` fieldset holding `share_social_data`, `facebook_app_id`, and `social_links`.

## Next steps

-   {doc}`install-the-frontend`, so editors can change the settings.
-   {doc}`/tutorials/add-social-links-to-a-site`, to see the whole package working on a development site.

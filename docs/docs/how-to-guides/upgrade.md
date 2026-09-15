---
myst:
  html_meta:
    "description": "Bring a site that already has plonegovbr.socialmedia installed up to date after updating the package."
    "property=og:description": "Bring a site that already has plonegovbr.socialmedia installed up to date after updating the package."
    "property=og:title": "How to upgrade an existing site"
    "keywords": "Plone, plonegovbr.socialmedia, upgrade, upgrade step, GenericSetup, catalog"
---

(howto-upgrade)=

# How to upgrade an existing site

This guide shows you how to bring a site that already has `plonegovbr.socialmedia` installed up to date, after you update the package.

A release may change what the add-on installs in a site, such as a catalog column.
An upgrade step applies that change to a site installed with an earlier release.
{ref}`reference-profiles-upgrades` lists every upgrade step, and what it does.

## Update the package

Update `plonegovbr.socialmedia` in your project's dependencies, and restart the backend.

## Run the upgrade steps

Run them from the add-ons control panel, or through the REST API.

### From the control panel

1.  Select {menuselection}`Site Setup --> Add-ons`.
2.  In {guilabel}`Update installed addons:`, find the social media add-on, and select {guilabel}`Update`.

### Through the `@addons` endpoint

Send a `POST` to the `@addons` endpoint of the site, as a user with the `Manager` role.

```http
POST /Plone/@addons/plonegovbr.socialmedia/upgrade HTTP/1.1
Accept: application/json
```

## Check the result

The profile version of the site is now the version of the `default` profile the release ships.

```python
from plone import api

setup_tool = api.portal.get_tool("portal_setup")
setup_tool.getLastVersionForProfile("plonegovbr.socialmedia:default")
```

For the release that adds the `social_links` catalog column, the version is `1001`, and the summaries of `@search` results carry each item's `social_links`, as {ref}`reference-rest-api-summary` describes.

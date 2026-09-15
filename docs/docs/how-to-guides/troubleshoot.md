---
myst:
  html_meta:
    "description": "Symptoms you may see with Social Media support for Plone, their causes, and their fixes."
    "property=og:description": "Symptoms you may see with Social Media support for Plone, their causes, and their fixes."
    "property=og:title": "How to troubleshoot"
    "keywords": "Plone, Volto, plonegovbr.socialmedia, volto-social-media, troubleshoot, icons, meta tags"
---

(howto-troubleshoot)=

# How to troubleshoot

This guide is organized by symptom.
Find the one you see, and follow its checks in order.

Several checks read the settings a page inherits.
Ask the backend for them directly, replacing the path with the page's.

```http
GET /Plone/news?expand=inherit&expand.inherit.behaviors=plonegovbr.socialmedia.settings HTTP/1.1
Accept: application/json
```

{doc}`/reference/rest-api` describes the response.

## The **Profiles** field is not a table

The frontend add-on is not loaded.
Check that `@plonegovbr/volto-social-media` is in the `addons` key of your add-on's `package.json`, install again, and restart the frontend.
See {doc}`install-the-frontend`.

## A page shows no icons

1.  **Does the page inherit links?**
    Request the settings for the page.
    If the response has no `plonegovbr.socialmedia.settings` key, no object above the page provides the settings behavior: install the backend profile, as {doc}`install` shows.
2.  **Do they come from the object you expect?**
    Read `from` in the response.
    If it names a section rather than the site, that section provides the behavior, and its own `social_links` win, even when empty.
    See {doc}`give-a-section-its-own-links`.
3.  **Does each link have a target?**
    A link without a target is not rendered.

## One link has no icon

The link's network has no `socialNetwork` utility in the frontend.
Its anchor is rendered, empty.

Read the link's `id` in the response, and register a utility with that name, as {doc}`configure-networks` shows.

## The icons have no styles

The add-on's styles reach the page through the theme, which must import `addonsThemeCustomizationsMain`.
Volto Light Theme imports it; if your theme does not, the styles are never loaded.
See {ref}`reference-frontend-styles`.

## The Follow Us block offers no network to pick

The block's sidebar offers the networks of the links the page inherits.
Add links to the site first, as {doc}`set-the-site-links` shows.

## A network disappeared from a Follow Us block

The site no longer links to that network.
A block shows only networks the site links to, and keeps the rest of its list.
Add the link to the site again, and the block shows it again.

## The `twitter:site` or `og:article:publisher` tag is missing

1.  **Is sharing on?**
    `share_social_data` must be `true`.
2.  **Is there a username?**
    Read `x_username` or `facebook_username` in the response.
    An empty value means the site has no link to that network, or that the link's target is not a plain profile address.
    A trailing slash is enough to lose it: {ref}`reference-behaviors-usernames` lists the accepted addresses.

## The `fb:app_id` tag is missing

`share_social_data` must be `true`, and `facebook_app_id` must be set on the object the page inherits from.

## Plone's **Social Media** control panel has no effect

The package hides that control panel, and the frontend does not read its values.
Set the values on the site root instead, as {doc}`set-the-site-links` shows.

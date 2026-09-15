---
myst:
  html_meta:
    "description": "Why plonegovbr.socialmedia keeps a site's social media settings in a behavior on content, rather than in a control panel."
    "property=og:description": "Why plonegovbr.socialmedia keeps a site's social media settings in a behavior on content, rather than in a control panel."
    "property=og:title": "Settings that live on content"
    "keywords": "Plone, plonegovbr.socialmedia, behavior, control panel, inherit, subsite"
---

(concepts-settings-on-content)=

# Settings that live on content

Plone ships a **Social Media** control panel.
It keeps one set of social media settings in the registry, for the whole site.
This package hides that control panel and keeps the settings in a {term}`behavior` instead, enabled on the site root.
This page explains why, and what that choice costs.

## The settings arrive with the page

Volto builds every page out of one content request.
The frontend add-on asks that request for the {term}`inherit expansion` of the settings behavior, so the settings arrive in the same response as the page they belong to.

No page makes a second request for them.
The footer, the Follow Us block, and the head tags all read the same data, from the same place in the store.
That matters most for an anonymous visitor, who is the reader the social media links exist for.

## A section can speak for itself

The expansion serves the settings of the *closest* object that provides the behavior.
On a new site that is always the site root.

Enable the behavior on a folderish content type, though, and any item of that type becomes the source of the settings for everything inside it.
A government portal can give a department its own profiles and its own Facebook app, while the rest of the site keeps the portal's.
A registry record cannot do that, because it has one value per site.

The closest object wins entirely.
A section that provides the behavior serves all of its fields, including an empty `social_links`, rather than falling back to the site's value field by field.
When the section's list is empty, Volto shows the fallback links of the frontend configuration, if the project set any, and not the links of the site.

## Editors change them where they edit

The settings are fields of the site root, in a **Social Media** section of the same form an editor already uses.
Changing a link needs the permission to edit the site root, and no access to {guilabel}`Site Setup`.

The frontend reads the form while it is open.
An editor who reorders the links sees the footer reorder before saving.

## Usernames are derived, not typed

Plone's control panel asks for the X and Facebook usernames as separate fields.
They are the same fact as the profile links, entered twice, and nothing keeps the two copies in step.

The behavior computes `x_username` and `facebook_username` from the links instead.
Change the X link, and the `twitter:site` tag follows.

The price is strictness.
Only a plain profile address yields a username, as {ref}`reference-behaviors-usernames` details.
An address with a trailing slash, a query string, or a path beyond the username yields none, and the tag is left out.

## What the choice costs

**Classic UI does not see it.**
Plone's Classic UI reads its social media settings from the registry.
This package writes nothing there, and hides the control panel that would.
A site that serves Classic UI pages keeps the registry's values, and cannot edit them from {guilabel}`Site Setup`.

**Existing settings are not moved.**
Installing the package does not copy the control panel's values into the behavior.
A site that had them sets them again, on the site root.

**Everything rides on the expansion.**
A frontend that does not request the `inherit` expansion receives no settings at all.
The frontend add-on registers the request itself, so this matters only to a client other than Volto.

```{seealso}
-   {doc}`/how-to-guides/set-the-site-links` and {doc}`/how-to-guides/give-a-section-its-own-links` put this to work.
-   {doc}`/reference/rest-api` describes the expansion's request and response.
```

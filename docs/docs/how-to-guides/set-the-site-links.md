---
myst:
  html_meta:
    "description": "Add, reorder, change, and remove a site's social links, and set its sharing settings, from the Volto edit form."
    "property=og:description": "Add, reorder, change, and remove a site's social links, and set its sharing settings, from the Volto edit form."
    "property=og:title": "How to set the site's links"
    "keywords": "Plone, Volto, plonegovbr.socialmedia, social links, settings, edit"
---

(howto-set-the-site-links)=

# How to set the site's links

This guide shows you how to change a site's social links and its sharing settings.

You need both packages installed, and permission to edit the site root.

## Open the settings

1.  Log in, go to the site root, and select {guilabel}`Edit` in the toolbar.
2.  In the sidebar, open the **Social Media** section.

The section holds three fields: **Share social data**, **Facebook App ID**, and **Profiles**.

## Add a link

1.  Select {guilabel}`Add Link`, beside the **Profiles** label.
2.  In **Network**, pick the network.
3.  In **Title**, name the link.
    The title shows when the pointer rests on the icon, and is what a screen reader announces.
4.  In **Target**, type the profile's address, and press {kbd}`Enter`.
    To link to a page of the site instead, browse to it.
5.  Select {guilabel}`Save` in the dialog.

All three fields are required.

## Reorder the links

Drag a row by its handle.
The first row is the first icon.

## Change a link

Select {guilabel}`Edit` on its row, change the fields, and select {guilabel}`Save` in the dialog.

## Remove a link

Select {guilabel}`Delete` on its row, and confirm with {guilabel}`Delete`.

## Set the sharing settings

**Share social data**
:   Switch it off to leave out the `fb:app_id`, `og:article:publisher`, and `twitter:site` tags.
    The other head tags are not affected.

**Facebook App ID**
:   The value of the `fb:app_id` tag.

The usernames in `twitter:site` and `og:article:publisher` come from the X and Facebook links.
They need a plain profile address, as {ref}`reference-behaviors-usernames` lists.

## Save

Select {guilabel}`Save` in the toolbar.

Nothing is stored until you do.
While the form is open, the footer already shows your changes; {guilabel}`Cancel` discards them.

```{seealso}
-   {doc}`give-a-section-its-own-links`, for a section with links of its own.
-   {doc}`/reference/rest-api`, to change the same fields without the edit form.
```

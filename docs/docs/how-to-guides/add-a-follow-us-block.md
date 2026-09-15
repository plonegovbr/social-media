---
myst:
  html_meta:
    "description": "Show a site's social links on a page with a Follow Us block, limited to some networks if you want."
    "property=og:description": "Show a site's social links on a page with a Follow Us block, limited to some networks if you want."
    "property=og:title": "How to add a Follow Us block"
    "keywords": "Plone, Volto, volto-social-media, Follow Us, block, social links"
---

(howto-follow-block)=

# How to add a Follow Us block

This guide shows you how to show the site's social links on a page, with a Follow Us block.

The block shows links the site already has.
Set them first, as {doc}`set-the-site-links` shows.

## Add the block

1.  Edit the page.
2.  Add a block, and choose **Follow Us Block**.

The block shows every link the page inherits, in the site's order.

## Give it a headline

In the sidebar, type the headline in **Headline**.
Leave it empty to show the icons alone.

## Show only some networks

1.  In the sidebar, under **Filter Networks**, select {guilabel}`Add Network`.
2.  In **Network**, pick one of the site's networks, and select {guilabel}`Save` in the dialog.
3.  Repeat for each network to show.

The block shows those networks alone, in the order of the rows.
Drag a row by its handle to change the order.
Delete every row to show all the site's links again.

## Animate the icons

Switch **Animate Icon** on to move the icons on hover, or off to keep them still.
A block saved without a value for this setting animates its icons.

## Align the block

Pick the alignment in **Align**.

## Save

Select {guilabel}`Save` in the toolbar.

```{seealso}
-   {ref}`reference-frontend-block` describes what the block stores and renders.
-   {doc}`/concepts/links-and-networks` explains why a block picks from the site's links.
```

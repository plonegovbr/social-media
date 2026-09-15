---
myst:
  html_meta:
    "description": "What a social link stores, why networks are described in the frontend, and why the links are edited as a table."
    "property=og:description": "What a social link stores, why networks are described in the frontend, and why the links are edited as a table."
    "property=og:title": "Links and networks"
    "keywords": "Plone, Volto, plonegovbr.socialmedia, social links, networks, utilities, widget"
---

(concepts-links-and-networks)=

# Links and networks

A {term}`social link` is small: a {term}`network`, a title, and a target.
Almost everything that makes it look like a social media icon is decided somewhere else.
This page explains that split.

## A link names its network

A link stores the network as a short id, such as `mastodon`.
It stores neither the network's name nor its icon.

The frontend describes each network with a `socialNetwork` {term}`utility`, holding the title an editor picks from and the SVG a visitor sees.
So restyling an icon, or renaming *Twitter* to *X*, is a change to the frontend configuration.
No content is migrated, and every link to that network changes at once.

The same split decides what happens to a link the frontend cannot describe.
If a project stops registering a network, its links stay in the content, and the frontend renders them without an icon.
Nothing breaks, and registering the network again brings the icons back.

## The backend keeps no list of networks

The `social_links` field is a JSON field whose schema allows any list of objects.
The backend accepts any network id, and any shape of entry.

The choices an editor sees come from the frontend, at the moment the form is built.
They are a client-side vocabulary, read from the registered utilities, so a network a project registers is offered with the rest.
That keeps the list of networks in one place, the place that also has the icons.

The cost is that the backend validates nothing.
A link written through the REST API with a misspelled network is stored as written, and shown without an icon.

## A target is a list of one

`href` holds a list with one object in it, rather than a string.
That is the shape Volto's object browser stores, and the object browser is what lets a target be either an external address or a page of the site.
A department's contact page can sit in the same row of icons as its Mastodon account.

A link without a target is not rendered at all.

## Every link is marked as the site's own

Each icon links with `rel="me"`.
The attribute says that the page and the profile belong to the same owner.
Services that verify a profile, such as Mastodon, look for it on the site the profile links to.

## Order is meaning

The list is stored in the order it is shown.
The first icon in the footer is the first entry of the field.

That is why the links are edited as a table.
Volto's own `object_list` widget edits the same kind of value as a stack of accordions, which shows one entry at a time and makes the order hard to see.
The table shows every link as a row, by its network's icon and its title, with a handle to drag it by, and opens the whole link in a dialog.

Both widgets store the same shape, including the `@id` each entry is given.
A value edited with one stays editable with the other.

## A block chooses from the site's links

The Follow Us block does not hold links of its own.
It stores a list of network ids, and shows the page's inherited links for those networks, in the block's order.

The sidebar offers only networks the site already links to.
When the site's Mastodon address changes, every Follow Us block showing Mastodon follows.
A block cannot point somewhere the site does not.

```{seealso}
-   {doc}`/how-to-guides/configure-networks` adds or changes a network.
-   {doc}`/reference/frontend` lists the networks, the widgets, and the block.
```

---
myst:
  html_meta:
    "description": "Social media links, sharing settings, and meta tags for Plone sites, edited on content and shown by Volto."
    "property=og:description": "Social media links, sharing settings, and meta tags for Plone sites, edited on content and shown by Volto."
    "property=og:title": "Social Media support for Plone"
    "keywords": "Plone, Volto, plonegovbr.socialmedia, volto-social-media, social media, links, Open Graph"
---

# Social Media support for Plone

Social media links, sharing settings, and meta tags for Plone sites, edited on content and shown by Volto.

An editor keeps the site's profiles in an ordered list on the site root.
Every page shows them as icons, in the footer or in a Follow Us block, and carries the head tags that tell social networks how to render it when shared.

**Status:** alpha, tested with Plone 6.1 and 6.2, and with Volto 19.4.1.
{doc}`reference/compatibility` has the full matrix.

```{warning}
This documentation was written with Claude Opus 5, following the [Plone documentation style skill](https://github.com/plone/plone-doc-style-skill).
```

## Two add-ons, installed together

| Package | Is | Gives you |
|---|---|---|
| `plonegovbr.socialmedia` | A Plone backend add-on | The behaviors that store the settings and the links, and the profile that enables them on the site root. |
| `@plonegovbr/volto-social-media` | A Volto frontend add-on | The table that edits the links, the icons, the Follow Us block, and the head tags. |

Install {doc}`the backend <how-to-guides/install>` first, then {doc}`the frontend <how-to-guides/install-the-frontend>`.

`````{grid} 1 1 2 2
:gutter: 3

````{grid-item-card} 🎓 Tutorial
:link: tutorials/add-social-links-to-a-site
:link-type: doc

Add social links to a development site and show them on a page.
+++
Start here if the package is new to you.
````

````{grid-item-card} 🛠️ How-to guides
:link: how-to-guides/index
:link-type: doc

Install the packages, set the links, add a network, style the icons.
+++
Directions toward a result.
````

````{grid-item-card} 💡 Concepts
:link: concepts/index
:link-type: doc

Why the settings live on content, and why networks live in the frontend.
+++
Understanding, away from the keyboard.
````

````{grid-item-card} 📖 Reference
:link: reference/index
:link-type: doc

The behaviors, the REST API, the profiles, and everything the Volto add-on registers.
+++
Technical description of the machinery.
````

````{grid-item-card} 🎨 Storybook
:link: https://plonegovbr.github.io/social-media/storybook/

Every component the Volto add-on ships, rendered with its props.
+++
Built from this repository and published beside these pages.
````
`````

## What it gives you

**Settings on the site root.**
The site's links and sharing settings are fields of the site root, edited in its own form, and served with every page.

**Sections with their own links.**
Enable the settings behavior on a folderish content type, and a section speaks for itself.

**Links edited as a table.**
Every link is a row, by network and title, with a handle to drag it into place.

**Icons wherever you need them.**
A footer slot, a Follow Us block, a view widget, and components to render the links anywhere else.

**Head tags from the same data.**
`twitter:site` and `og:article:publisher` follow the X and Facebook links, with no username typed twice.

## What you need

| | |
|---|---|
| Plone | 6.1 or 6.2 |
| Python | 3.11 to 3.14 |
| Frontend | Volto, developed against 19.4.1 |

```{toctree}
:caption: Tutorials
:maxdepth: 2
:hidden: true

tutorials/index
```

```{toctree}
:caption: How-to guides
:maxdepth: 2
:hidden: true

how-to-guides/index
```

```{toctree}
:caption: Concepts
:maxdepth: 2
:hidden: true

concepts/index
```

```{toctree}
:caption: Reference
:maxdepth: 2
:hidden: true

reference/index
```

```{toctree}
:caption: Appendices
:maxdepth: 2
:hidden: true

contributing
glossary
genindex
```

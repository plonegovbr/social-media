---
myst:
  html_meta:
    "description": "Terms and definitions used throughout the Social Media support for Plone documentation."
    "property=og:description": "Terms and definitions used throughout the Social Media support for Plone documentation."
    "property=og:title": "Glossary"
    "keywords": "Plone, plonegovbr.socialmedia, glossary, term, definition"
---

(glossary-label)=

# Glossary

```{glossary}
:sorted: true

social link
    One entry of a `social_links` field: a {term}`network`, a title, and a target address.

network
    A social network or a kind of link, such as `mastodon` or `website`, that a {term}`social link` names by id.
    The frontend describes each network with a `socialNetwork` {term}`utility` holding its title and icon.

settings behavior
    The `plonegovbr.socialmedia.settings` {term}`behavior`, holding the social media settings of a site or of a section.

inherit expansion
    A {term}`plone.restapi` expansion that serves a {term}`behavior`'s fields from the closest object providing it.
    It is how every page of a site reads the site's social media settings.

utility
    A named object registered in Volto's configuration registry under a type.
    This add-on registers utilities of the types `socialNetwork` and `schema`.

slot
    A named place in a Volto page where add-ons render components, such as a footer area.

widget
    The component Volto renders a field with.
    An edit widget renders it in a form, and a view widget renders it on a page.

behavior
    A reusable, optional set of fields and features that can be enabled per content type in Plone.

add-on
    A package that extends Plone's functionality.
    In Volto, an add-on is a JavaScript package; in Plone's backend, it is a Python package.

Plone
    [Plone](https://plone.org/) is an open source content management system used to create, edit, and manage digital content, including websites, intranets, and custom solutions.

plone.restapi
    The [REST API](https://6.docs.plone.org/plone.restapi/docs/source/index.html) Plone serves, and the package providing it.

Volto
    [Volto](https://6.docs.plone.org/volto/index.html) is Plone's React-based frontend.

Volto Light Theme
    [Volto Light Theme](https://github.com/kitconcept/volto-light-theme) is a Volto theme, and the one this repository's development site uses.

Storybook
    [Storybook](https://storybook.js.org/) renders user interface components in isolation, each with the props it is given.

Diátaxis
    A [framework](https://diataxis.fr/) for structuring technical documentation around four needs: tutorials, how-to guides, reference, and explanation.

MyST
    [Markedly Structured Text](https://myst-parser.readthedocs.io/en/latest/), the Markdown flavor this documentation is written in.
```

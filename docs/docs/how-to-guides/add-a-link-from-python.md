---
myst:
  html_meta:
    "description": "Add social links to a site or a content object from Python, such as in an upgrade step or an import script."
    "property=og:description": "Add social links to a site or a content object from Python, such as in an upgrade step or an import script."
    "property=og:title": "How to add a social link from Python"
    "keywords": "Plone, plonegovbr.socialmedia, Python, social links, upgrade step, import"
---

(howto-add-a-link-from-python)=

# How to add a social link from Python

This guide shows you how to add social links to an object from Python, such as in an upgrade step, an event subscriber, or an import script.

The object must have one of the two behaviors {doc}`/reference/behaviors` lists.

## Add one link

Pass the object's links, the network, the address, and the title to `add_social_link`.
When it added the link, assign the links it returns to the object, and reindex the object, so that listings show the new link.

```python
from plone import api
from plonegovbr.socialmedia.utils import add_social_link

portal = api.portal.get()
links, added = add_social_link(
    portal.social_links, "github", "https://github.com/plonegovbr", "GitHub"
)
if added:
    portal.social_links = links
    portal.reindexObject()
```

The site now links to its GitHub organization, after its other links.

If the object already links to the network, `add_social_link` adds nothing, and returns `False`.
Running the code again changes nothing.

## Merge links from another source

To import several links at once, build each one with `create_social_link`, and merge them into the stored links with `cleanse_social_links`.

```python
from plone import api
from plonegovbr.socialmedia.utils import cleanse_social_links
from plonegovbr.socialmedia.utils import create_social_link

speaker = api.content.get(path="/speakers/jane-doe")
imported = [
    create_social_link("github", "https://github.com/janedoe", "GitHub"),
    create_social_link("x", "https://x.com/janedoe", "X"),
]
links, changed = cleanse_social_links(speaker.social_links, sources=[imported])
if changed:
    speaker.social_links = links
    speaker.reindexObject()
```

A network the speaker already links to keeps its stored link.

`cleanse_social_links` also drops every link without a target, and every second link to a network, from the stored links.
To keep the stored links as they are, call `add_social_link` once for each imported link instead.

```{seealso}
{ref}`reference-python` describes each function.
```

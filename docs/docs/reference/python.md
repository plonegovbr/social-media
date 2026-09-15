---
myst:
  html_meta:
    "description": "The functions of plonegovbr.socialmedia.utils, which build, add, merge, and read social links from Python."
    "property=og:description": "The functions of plonegovbr.socialmedia.utils, which build, add, merge, and read social links from Python."
    "property=og:title": "Python helpers"
    "keywords": "Plone, plonegovbr.socialmedia, Python, social links, utils"
---

(reference-python)=

# Python helpers

The module `plonegovbr.socialmedia.utils` provides functions to build, add, merge, and read the value of a `social_links` field, as {ref}`reference-behaviors-value` describes it.

No function modifies the links it is given.
A function that adds or merges links returns a new list.

```{important}
Assign the returned list to the field.
The database does not notice a stored list changed in place.
```

(reference-python-values)=

## Values

`SocialLink`
:   The type of one link: `dict[str, str | list[dict[str, str]]]`.

`EMPTY_VALUES`
:   The texts that count as empty in a network id or an address: `""`, `"None"`, `"none"`, and `"null"`.
    Leading and trailing spaces are stripped before the comparison.

`PATTERNS`
:   The regular expressions that read a username from a profile address, by network id.
    It has entries for `facebook` and `x`, as {ref}`reference-behaviors-usernames` describes.

(reference-python-create)=

## `create_social_link`

Returns one link to a network.

| Parameter | Type | Description |
|---|---|---|
| `network_id` | `str` | The network, such as `x`. It is both the link's `id` and its `@id`. |
| `url` | `str` | The address the link points to. |
| `title` | `str` | The title of the link, and of its target. |

Returns
:   A `SocialLink`, with its arguments stored as given.

```pycon
>>> from plonegovbr.socialmedia.utils import create_social_link
>>> create_social_link("github", "https://github.com/plonegovbr", "GitHub")
{'@id': 'github', 'href': [{'@id': 'https://github.com/plonegovbr', 'title': 'GitHub'}], 'id': 'github', 'title': 'GitHub'}
```

(reference-python-add)=

## `add_social_link`

Appends a link to a network the links have no link to.

| Parameter | Type | Description |
|---|---|---|
| `social_links` | `Sequence[Mapping]` or `None` | The links. `None` counts as no links. |
| `network_id` | `str` | The network, such as `x`. |
| `url` | `str` | The address the link points to. |
| `title` | `str` | The title of the link, and of its target. |

Returns
:   A tuple of the links, as a `list`, and a `bool` that is `True` when the link was added.
    The new link is last.
    {ref}`reference-python-create` builds it from `network_id` and `url` stripped of leading and trailing spaces.

The link is not added, and the links are returned as they were, in either of these cases.

-   A link whose `id` names the network, and that has a target, is already in the list.
    A link to the network without a target does not count.
-   `network_id` or `url` is empty, or one of `EMPTY_VALUES`.

(reference-python-cleanse)=

## `cleanse_social_links`

Merges groups of links into one list, with one link per network.

| Parameter | Type | Description |
|---|---|---|
| `base_links` | `Sequence[Mapping]` or `None` | The stored links. `None` counts as no links. |
| `sources` | `Iterable` of `Sequence[Mapping]` or `None` | Further groups of links, in precedence order. A group that is not a sequence is skipped. Defaults to no group. |

Returns
:   A tuple of the merged links, as a `list` of `dict`, and a `bool` that is `True` when they differ from `base_links`.

The links are read in order: `base_links` first, then each group of `sources`.

-   The first link to each network is kept, in the order it was read.
-   A later link to the same network is dropped, from `base_links` as well as from `sources`.
-   A link that is not an object, has no `id`, or has no target is dropped.

```{warning}
`cleanse_social_links` drops a second link to a network from the stored links, too.
To keep the stored links as they are, use {ref}`reference-python-add`.
```

(reference-python-target)=

## `link_target`

Returns the address of a link's first target.

| Parameter | Type | Description |
|---|---|---|
| `link` | `object` | A link. |

Returns
:   The `@id` of the first object in the link's `href`, stripped of leading and trailing spaces.
    An empty string when the link is not an object, its `href` is not a list or does not start with an object, or that object's `@id` is not a string or is one of `EMPTY_VALUES`.

(reference-python-filter)=

## `filter_social_links`

Returns the first link to a network that has a target.

| Parameter | Type | Description |
|---|---|---|
| `social_links` | `list[dict]` | The links. |
| `network_id` | `str` | The network, such as `x`. It must equal the link's `id`. |

Returns
:   The link itself, or `None` when no link to the network has a target.

(reference-python-username-profile)=

## `extract_username_from_profile`

Returns the username in a profile address.

| Parameter | Type | Description |
|---|---|---|
| `profile` | `str` | A profile address, such as `https://x.com/ploneorgbr`. |
| `network_id` | `str` | The network, such as `x`. |

Returns
:   The username that the network's entry in `PATTERNS` reads from the address.
    An empty string when the network has no entry, or the address does not match it.

(reference-python-username-links)=

## `extract_username_from_social_links`

Returns the username in the first link to a network that has a target.

| Parameter | Type | Description |
|---|---|---|
| `social_links` | `list[dict]` | The links. |
| `network_id` | `str` | The network, such as `x`. |

Returns
:   The username that {ref}`reference-python-username-profile` reads from the target of the link {ref}`reference-python-filter` returns.
    An empty string when there is no such link.

```{seealso}
{ref}`howto-add-a-link-from-python` puts these functions to use.
```

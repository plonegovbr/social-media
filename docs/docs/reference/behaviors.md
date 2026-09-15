---
myst:
  html_meta:
    "description": "The two behaviors plonegovbr.socialmedia registers, their fields, and the value their social_links field stores."
    "property=og:description": "The two behaviors plonegovbr.socialmedia registers, their fields, and the value their social_links field stores."
    "property=og:title": "Behaviors"
    "keywords": "Plone, plonegovbr.socialmedia, behavior, social links, Dexterity"
---

(reference-behaviors)=

# Behaviors

`plonegovbr.socialmedia` registers two behaviors.

| Name | Title | Enabled by the `default` profile on |
|---|---|---|
| `plonegovbr.socialmedia.settings` | Social Media: Settings | `Plone Site` |
| `plonegovbr.socialmedia.links` | Social Media: Links | No content type |

Both put their fields in a fieldset with the id `social_media`, labeled **Social Media**.

(reference-behaviors-settings)=

## `plonegovbr.socialmedia.settings`

The social media settings of a site, or of a section of one.

| | |
|---|---|
| Schema | `plonegovbr.socialmedia.behaviors.social_media.ISocialMediaSettings` |
| Marker | `plonegovbr.socialmedia.behaviors.social_media.ISocialMedia` |
| Factory | `plonegovbr.socialmedia.behaviors.social_media.SocialMediaSettings` |

The factory stores each editable field as an attribute of the content object.

### Fields

| Field | Type | Default | In the fieldset | Description |
|---|---|---|---|---|
| `share_social_data` | `Bool` | `True` | Yes | Whether pages carry the social media meta tags. |
| `facebook_app_id` | `ASCIILine` | `""` | Yes | The value of the `fb:app_id` meta tag. |
| `social_links` | `JSONField` | `[]` | Yes | The links, as {ref}`reference-behaviors-value` describes. |
| `x_username` | `TextLine`, read-only | none | No | Computed from `social_links`. |
| `facebook_username` | `TextLine`, read-only | none | No | Computed from `social_links`. |

The frontend add-on turns these fields into meta tags, as {ref}`reference-frontend-metadata` lists.

(reference-behaviors-usernames)=

### Computed usernames

Each username is read from the first link whose `id` names its network and that has a target, and from the address of that target.
A link without a target is skipped, as the frontend does not render it.

| Field | Link `id` | Accepted target | Example |
|---|---|---|---|
| `x_username` | `x` | `https://x.com/<username>` or `https://twitter.com/<username>` | `https://x.com/ploneorgbr` gives `ploneorgbr` |
| `facebook_username` | `facebook` | `https://facebook.com/<username>` | `https://facebook.com/PloneBr` gives `PloneBr` |

The target must match the whole pattern.

-   The scheme is `http:`, `https:`, or absent, as in `//x.com/plone`.
-   The host may start with `www.` or `m.`.
-   The username consists of letters, digits, `.`, `_`, and `-`.

A target with a path after the username, a query string, or a trailing slash gives an empty string.
So does a site with no link for the network.

(reference-behaviors-links)=

## `plonegovbr.socialmedia.links`

The social media profiles of one content object, such as a speaker or an organization.

| | |
|---|---|
| Schema | `plonegovbr.socialmedia.behaviors.social_links.ISocialLinks` |

### Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `social_links` | `JSONField` | `[]` | The links, as {ref}`reference-behaviors-value` describes. |

The `default` profile enables it on no content type.
The `demo` profile enables it on `Document`, as {doc}`profiles` lists.

(reference-behaviors-value)=

## The `social_links` value

Both behaviors store `social_links` as a JSON array of objects, in the order they are shown.

| Key | Type | Description |
|---|---|---|
| `@id` | string | A unique id: a UUID the widget gives every entry, or the network's id for a link built by {ref}`reference-python-create`. |
| `id` | string | The network: the name of a `socialNetwork` utility in the frontend. |
| `title` | string | The link's title. |
| `href` | array | The target, as a list of one object holding the address in `@id`, and optionally a `title`. |

The field's JSON schema is `{"type": "array", "items": {"type": "object"}}`.
The backend validates no key of an entry.

```json
[
  {
    "@id": "7e90497e-3ef4-473c-b781-7d7767ab9f1a",
    "id": "x",
    "title": "X",
    "href": [
      {
        "@id": "https://x.com/ploneorgbr",
        "title": "x.com/ploneorgbr"
      }
    ]
  }
]
```

(reference-behaviors-widget)=

## The widget

Both `social_links` fields name their Volto widget in `frontendOptions`.

```python
directives.widget(
    "social_links",
    frontendOptions={
        "widget": "social_media_object_list",
        "widgetProps": {"schemaName": "socialMedia"},
    },
)
```

`plone.restapi` serves `frontendOptions` as written, and Volto looks the widget up by name.
The frontend add-on registers the edit widget, the view widget, and the `socialMedia` schema, as {ref}`reference-frontend-widgets` describes.

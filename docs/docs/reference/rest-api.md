---
myst:
  html_meta:
    "description": "How plonegovbr.socialmedia's fields are read and written through plone.restapi, including the inherit expansion."
    "property=og:description": "How plonegovbr.socialmedia's fields are read and written through plone.restapi, including the inherit expansion."
    "property=og:title": "Endpoints and expansions"
    "keywords": "Plone, plonegovbr.socialmedia, plone.restapi, inherit, expansion, JSON"
---

(reference-rest-api)=

# Endpoints and expansions

`plonegovbr.socialmedia` adds no endpoint.
Its fields are read and written through the services {term}`plone.restapi` already provides.

The examples use a site with the id `Plone`, served at `http://localhost:8080/Plone`.

(reference-rest-api-inherit)=

## Settings, through the `inherit` expansion

The `inherit` expansion serves a behavior's fields from the closest object that provides it.
The frontend add-on asks for it with every content request.

```http
GET /Plone/news?expand=inherit&expand.inherit.behaviors=plonegovbr.socialmedia.settings HTTP/1.1
Accept: application/json
```

The response is the content object, as usual.
Its `@components` holds the expansion.

```json
{
  "@components": {
    "inherit": {
      "@id": "http://localhost:8080/Plone/news/@inherit?expand.inherit.behaviors=plonegovbr.socialmedia.settings",
      "plonegovbr.socialmedia.settings": {
        "from": {
          "@id": "http://localhost:8080/Plone",
          "title": "My site"
        },
        "data": {
          "share_social_data": true,
          "facebook_app_id": "",
          "facebook_username": "PloneBr",
          "x_username": "ploneorgbr",
          "social_links": [
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
            },
            {
              "@id": "3822d3a9-6c9c-4f04-bee0-5d56b1f5523c",
              "id": "facebook",
              "title": "Facebook",
              "href": [
                {
                  "@id": "https://facebook.com/PloneBr",
                  "title": "https://facebook.com/PloneBr"
                }
              ]
            }
          ]
        }
      }
    }
  }
}
```

`from`
:   The object the settings were read from: its address and its title.

`data`
:   Every field of the behavior, the computed usernames included.

The same object is served on its own by the `@inherit` endpoint.

```http
GET /Plone/news/@inherit?expand.inherit.behaviors=plonegovbr.socialmedia.settings HTTP/1.1
Accept: application/json
```

### Which object the settings come from

The expansion walks the acquisition chain of the requested object, starting with the object itself.
It serves the first object that provides the `ISocialMedia` marker and that the caller has the `View` permission on.

-   An object without an ancestor providing the marker gets no `plonegovbr.socialmedia.settings` key.
-   `expand.inherit.behaviors` takes a comma-separated list of behavior names.
    The frontend add-on appends its own name to the names other add-ons ask for.

Anonymous callers read the settings of any object they can view.

## Settings, written

Write the settings on the object that provides the behavior, with each field at the top level of the body.

```http
PATCH /Plone HTTP/1.1
Accept: application/json
Content-Type: application/json

{
  "share_social_data": false,
  "facebook_app_id": "123456789"
}
```

A successful request answers `204 No Content`.

`x_username` and `facebook_username` are read-only.
They are computed from `social_links` each time the settings are read.

## Links of a content object

A content object with the `plonegovbr.socialmedia.links` behavior serves its links at the top level of its own response.

```http
GET /Plone/profiles HTTP/1.1
Accept: application/json
```

```json
{
  "social_links": [
    {
      "@id": "3892d3a9-6c9c-4f04-bee0-5d56b1f5523c",
      "id": "bluesky",
      "title": "BlueSky",
      "href": [
        {
          "@id": "https://bsky.app/profile/plone.org.br",
          "title": "bsky.app/profile/plone.org.br"
        }
      ]
    }
  ]
}
```

A `PATCH` to the object with a `social_links` key replaces the whole list.

## Schemas

`@types` lists each behavior's editable fields in the `social_media` fieldset.

```http
GET /Plone/@types/Plone%20Site HTTP/1.1
Accept: application/json
```

| Content type | Fields in `social_media` |
|---|---|
| A type with `plonegovbr.socialmedia.settings` | `share_social_data`, `facebook_app_id`, `social_links` |
| A type with `plonegovbr.socialmedia.links` | `social_links` |

Each `social_links` property carries the `widget` and `widgetProps` described in {ref}`reference-behaviors-widget`.

```{seealso}
The [`inherit` expansion](https://6.docs.plone.org/plone.restapi/docs/source/endpoints/inherit.html) in the plone.restapi documentation.
```

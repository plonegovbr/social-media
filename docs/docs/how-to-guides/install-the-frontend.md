---
myst:
  html_meta:
    "description": "Add the volto-social-media add-on to a Volto project."
    "property=og:description": "Add the volto-social-media add-on to a Volto project."
    "property=og:title": "How to install the frontend"
    "keywords": "Plone, Volto, volto-social-media, install, add-on"
---

(howto-install-the-frontend)=

# How to install the frontend

This guide shows you how to add `@plonegovbr/volto-social-media` to a Volto project.

Do {doc}`install` first.
The frontend reads what the backend package serves, and shows nothing without it.

## Requirements

| | |
|---|---|
| Volto | Developed against 19.4.1 |
| React | 18 |
| Also needs | `react-intl`, `react-redux` 8 |

## Add the add-on

A [Cookieplone](https://github.com/plone/cookieplone) project has an add-on package of its own under `frontend/packages/`, and that package is where the project's add-ons are declared.

1.  Edit `frontend/packages/<your-addon>/package.json`, naming `@plonegovbr/volto-social-media` in **both** keys.

    ```json
    {
      "addons": [
        "@plonegovbr/volto-social-media"
      ],
      "dependencies": {
        "@plonegovbr/volto-social-media": "*"
      }
    }
    ```

    `dependencies` fetches the package.
    `addons` is what Volto reads to load it: an add-on only in `dependencies` is installed, and never loaded.

2.  Install.

    ```shell
    make frontend-install
    ```

3.  Start.

    ```shell
    make frontend-start
    ```

If your project has no add-on package of its own, add the name to the `addons` list in `volto.config.js` instead.

## Styles

The add-on's styles reach the page through the theme.
Volto Light Theme includes them.
With another theme, see {ref}`reference-frontend-styles` for what your theme must import.

## Verify

1.  Log in, and edit the site root.
2.  Open the **Social Media** section of the sidebar.

The **Profiles** field is a table with an {guilabel}`Add Link` button beside its label.
If it is not a table, the add-on is not loaded: check that it is in the `addons` key, and install again.

## Next steps

-   {doc}`set-the-site-links`, to fill in the links.
-   {doc}`add-a-follow-us-block`, to show them on a page.
-   {doc}`/reference/frontend`, for everything the add-on registers.

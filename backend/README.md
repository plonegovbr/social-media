<div align="center">

<h1 align="center">Social Media support for Plone</h1>
<h2 align="center">plonegovbr.socialmedia</h2>

</div>

<div align="center">

[![PyPI](https://img.shields.io/pypi/v/plonegovbr.socialmedia)](https://pypi.org/project/plonegovbr.socialmedia/)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/plonegovbr.socialmedia)](https://pypi.org/project/plonegovbr.socialmedia/)
[![PyPI - Plone Versions](https://img.shields.io/pypi/frameworkversions/plone/plonegovbr.socialmedia)](https://pypi.org/project/plonegovbr.socialmedia/)

[![Documentation](https://img.shields.io/badge/docs-plonegovbr.github.io-0083be)](https://plonegovbr.github.io/social-media/)
[![CI](https://github.com/plonegovbr/social-media/actions/workflows/main.yml/badge.svg)](https://github.com/plonegovbr/social-media/actions/workflows/main.yml)

[![GitHub contributors](https://img.shields.io/github/contributors/plonegovbr/social-media)](https://github.com/plonegovbr/social-media)
[![GitHub Repo stars](https://img.shields.io/github/stars/plonegovbr/social-media?style=social)](https://github.com/plonegovbr/social-media)

</div>

The backend package for Social Media support for Plone: the behaviors that keep a site's social media links and sharing settings on content, and serve them through plone.restapi.
See also the frontend package [@plonegovbr/volto-social-media](https://github.com/plonegovbr/social-media/tree/main/frontend), which edits and shows them.

## Features

- **`plonegovbr.socialmedia.settings`** — the social media settings of a site or of a section: `share_social_data`, `facebook_app_id`, and `social_links`. The installation profile enables it on the Plone Site. Any page reads the settings of the closest object that provides it, through plone.restapi's `inherit` expansion, so the frontend receives them with the page it requests.
- **Usernames derived from the links** — `x_username` and `facebook_username` are read-only, computed from the first X and Facebook links. A username is never typed twice, and the tags built from it follow the link.
- **`plonegovbr.socialmedia.links`** — a `social_links` field of its own for any content type, such as a speaker's profiles. The installation profile enables it on no content type.
- **The widget is the field's decision** — both `social_links` fields ask Volto for the `social_media_object_list` widget and the `socialMedia` item schema through `frontendOptions`, which the frontend package registers.
- **Replaces Plone's Social Media control panel** — installing the add-on hides that control panel, since the settings now live on the site root, and uninstalling it shows the control panel again.
- **Example content** — the `demo` profile gives the site root four links, and enables the links behavior on `Document` with a page that uses it.

### A link

Each entry of `social_links` names its network by id, and its target the way Volto's object browser stores one:

```json
{
  "@id": "7e90497e-3ef4-473c-b781-7d7767ab9f1a",
  "id": "x",
  "title": "X",
  "href": [{ "@id": "https://x.com/ploneorgbr", "title": "x.com/ploneorgbr" }]
}
```

The backend keeps no list of networks: the frontend describes each one, with its title and icon.

### Not in scope

- **Classic UI.** The settings live on content, not in the registry Classic UI reads, and the package renders nothing of its own.
- **Moving existing settings.** Installing does not copy the values of Plone's Social Media control panel onto the site root.

## Documentation

Full documentation is published at [plonegovbr.github.io/social-media](https://plonegovbr.github.io/social-media/), and its source lives in [`docs/`](https://github.com/plonegovbr/social-media/tree/main/docs) at the repository root.

The pages closest to this package:

- **Start here:** [Install the backend](https://github.com/plonegovbr/social-media/blob/main/docs/docs/how-to-guides/install.md) and [Set the site's links](https://github.com/plonegovbr/social-media/blob/main/docs/docs/how-to-guides/set-the-site-links.md).
- **How-to guides:** [Give a section its own links](https://github.com/plonegovbr/social-media/blob/main/docs/docs/how-to-guides/give-a-section-its-own-links.md), [Add links to a content type](https://github.com/plonegovbr/social-media/blob/main/docs/docs/how-to-guides/add-links-to-a-content-type.md).
- **Concepts:** [Settings that live on content](https://github.com/plonegovbr/social-media/blob/main/docs/docs/concepts/settings-on-content.md).
- **Reference:** [behaviors](https://github.com/plonegovbr/social-media/blob/main/docs/docs/reference/behaviors.md), [REST API](https://github.com/plonegovbr/social-media/blob/main/docs/docs/reference/rest-api.md), [GenericSetup profiles](https://github.com/plonegovbr/social-media/blob/main/docs/docs/reference/profiles.md).

## Installation

Requires Plone 6.1 or 6.2, and Python 3.11 or later.

Install plonegovbr.socialmedia with uv.

```shell
uv add plonegovbr.socialmedia
```

Then install **Social Media support for Plone: Install** from the add-ons control panel, or declare `profile-plonegovbr.socialmedia:default` as a dependency of your own package's profile.

## Contribute

- [Issue tracker](https://github.com/plonegovbr/social-media/issues)
- [Source code](https://github.com/plonegovbr/social-media/)

### Prerequisites ✅

-   An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
-   [uv](https://6.docs.plone.org/install/create-project-cookieplone.html#uv)
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) (optional)

### Installation 🔧

1.  Clone this repository.

    ```shell
    git clone git@github.com:plonegovbr/social-media.git
    cd social-media/backend
    ```

2.  Install this code base.

    ```shell
    make install
    ```

3.  Create a Plone site with the example content.

    ```shell
    make create-site
    ```

### Tests

```shell
make test
```

To see the test coverage as well:

```shell
make test-coverage
```

## License

The project is licensed under GPLv2.

## Credits and acknowledgements 🙏

Generated using [cookieplone-templates (a83957d)](https://github.com/plone/cookieplone-templates/commit/a83957d67a92031ad7f79b150c66349e3e662eef) on 2025-04-16. Maintained by the [PloneGov-Br Community](https://plone.org.br/gov) 🇧🇷❤️.

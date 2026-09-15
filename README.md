<div align="center">

<h1 align="center">Social Media support for Plone</h1>

</div>

<div align="center">

[![Built with Cookieplone](https://img.shields.io/badge/built%20with-Cookieplone-0083be.svg?logo=cookiecutter)](https://github.com/plone/cookieplone-templates/)

[![PyPI](https://img.shields.io/pypi/v/plonegovbr.socialmedia)](https://pypi.org/project/plonegovbr.socialmedia/)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/plonegovbr.socialmedia)](https://pypi.org/project/plonegovbr.socialmedia/)
[![PyPI - Plone Versions](https://img.shields.io/pypi/frameworkversions/plone/plonegovbr.socialmedia)](https://pypi.org/project/plonegovbr.socialmedia/)
[![npm](https://img.shields.io/npm/v/@plonegovbr/volto-social-media)](https://www.npmjs.com/package/@plonegovbr/volto-social-media)

[![Documentation](https://img.shields.io/badge/docs-plonegovbr.github.io-0083be)](https://plonegovbr.github.io/social-media/)
[![Storybook](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://plonegovbr.github.io/social-media/storybook/)

[![GitHub contributors](https://img.shields.io/github/contributors/plonegovbr/social-media)](https://github.com/plonegovbr/social-media)
[![GitHub Repo stars](https://img.shields.io/github/stars/plonegovbr/social-media?style=social)](https://github.com/plonegovbr/social-media)

[![CI](https://github.com/plonegovbr/social-media/actions/workflows/main.yml/badge.svg)](https://github.com/plonegovbr/social-media/actions/workflows/main.yml)

</div>

Social media links, sharing settings, and meta tags for Plone sites, edited on content and shown by Volto.

📖 **[Read the documentation](https://plonegovbr.github.io/social-media/)**

## What it does 📋

An editor keeps the site's social media profiles in an ordered list on the site root. Every page shows them as icons, and carries the head tags that tell social networks how to render it when shared.

- **Settings on the site root** — the site's links, whether to share social data, and the Facebook App ID are fields of the `plonegovbr.socialmedia.settings` behavior, which installing the add-on enables on the Plone Site. They are edited in the site root's own form, and served with every page through plone.restapi's `inherit` expansion.
- **Sections with their own links** — enable the behavior on a folderish content type, and the content inside an item of that type reads the item's settings instead of the site's.
- **Links edited as a table** — one row per link, by network and title, with a handle to drag it into place and a dialog to edit it.
- **Networks described in the frontend** — 25 networks, from BlueSky to YouTube, each a `socialNetwork` utility with a title and an icon. A project adds a network, or replaces an icon, in its own configuration, and no content is migrated.
- **Icons wherever you need them** — a Follow Us block that can show some of the networks in its own order, a footer slot that Volto Light Theme renders, a view widget, and components for anywhere else.
- **Head tags from the same data** — `twitter:site` and `og:article:publisher` follow the X and Facebook links, so no username is typed twice.
- **Links on any content type** — a second behavior, `plonegovbr.socialmedia.links`, gives items such as speakers a list of profiles of their own.

## Documentation 📚

Full documentation lives in [`docs/`](./docs) and is published at [plonegovbr.github.io/social-media](https://plonegovbr.github.io/social-media/).

- **Start here:** [Add social links to a site](./docs/docs/tutorials/add-social-links-to-a-site.md) — run the development site, and change what every page shows.
- **How-to guides:** [installing the backend](./docs/docs/how-to-guides/install.md) and [the frontend](./docs/docs/how-to-guides/install-the-frontend.md), [setting the site's links](./docs/docs/how-to-guides/set-the-site-links.md), [giving a section its own](./docs/docs/how-to-guides/give-a-section-its-own-links.md), [adding a network](./docs/docs/how-to-guides/configure-networks.md).
- **Concepts:** [settings that live on content](./docs/docs/concepts/settings-on-content.md), [links and networks](./docs/docs/concepts/links-and-networks.md).
- **Reference:** [behaviors](./docs/docs/reference/behaviors.md), [REST API](./docs/docs/reference/rest-api.md), [profiles](./docs/docs/reference/profiles.md), [Volto add-on](./docs/docs/reference/frontend.md).

## Install in your project 🔧

Both packages are installed separately, and a site needs both: the backend stores the settings, and the frontend edits and shows them.

### Backend

Requires Plone 6.1 or 6.2, and Python 3.10 or later.

```shell
uv add plonegovbr.socialmedia
```

Then install **Social Media support for Plone: Install** from the add-ons control panel. It enables the settings behavior on the site root, and hides Plone's own Social Media control panel.

### Frontend

The add-on is developed against Volto 19.4.1.

Add `@plonegovbr/volto-social-media` to your `package.json`.

```json
"addons": [
    "@plonegovbr/volto-social-media"
],
"dependencies": {
    "@plonegovbr/volto-social-media": "*"
}
```

> [!IMPORTANT]
> Adding the package to `dependencies` without listing it under `addons` installs the code but never registers it, so nothing is rendered.

## Quick Start 🏁

### Prerequisites ✅

-   An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
-   [uv](https://6.docs.plone.org/install/create-project-cookieplone.html#uv)
-   [nvm](https://6.docs.plone.org/install/create-project-cookieplone.html#nvm)
-   [Node.js and pnpm](https://6.docs.plone.org/install/create-project.html#node-js) 24
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) (optional)


### Installation 🔧

1.  Clone this repository, then change your working directory.

    ```shell
    git clone git@github.com:plonegovbr/social-media.git
    cd social-media
    ```

2.  Install this code base.
    It also creates a Plone site with example content.

    ```shell
    make install
    ```


### Fire Up the Servers 🔥

1.  Start the backend at http://localhost:8080/.

    ```shell
    make backend-start
    ```

2.  In a new shell session, start the frontend at http://localhost:3000/.

    ```shell
    make frontend-start
    ```

Voila! Your Plone site should be live and kicking! 🎉 Log in with the username `admin` and the password `admin`.

To create the site again from scratch, run the following command.

```shell
DELETE_EXISTING=1 make backend-create-site
```

### Local Stack Deployment 📦

Deploy a local Docker Compose environment that includes the following.

- Docker images for Backend and Frontend 🖼️
- A stack with a Traefik router and a PostgreSQL database 🗃️
- Accessible at [http://social-media.localhost](http://social-media.localhost) 🌐

Run the following commands in a shell session.

```shell
make stack-start
make stack-create-site
```

And... you're all set! Your Plone site is up and running locally! 🚀

## Project structure 🏗️

This monorepo consists of the following distinct sections:

- **backend**: The Plone add-on `plonegovbr.socialmedia`, installed with uv, plus its test suite and example content.
- **frontend**: The Volto add-on `@plonegovbr/volto-social-media`, plus its tests and Storybook stories.
- **docs**: The Sphinx and MyST documentation published at [plonegovbr.github.io/social-media](https://plonegovbr.github.io/social-media/).

### Why this structure? 🤔

- Both halves of the add-on live together, so a change to a field and the change to the widget that edits it are one commit.
- GitHub Workflows are triggered per section, so a documentation change does not rebuild the frontend (refer to .github/workflows).
- The documentation is built from the same checkout as the code it describes, so a reference page and the source it documents cannot drift between repositories.

## Code quality assurance 🧐

To check your code against quality standards, run the following shell command.

```shell
make check
```

### Format the codebase

To format and rewrite the code base, ensuring it adheres to quality standards, run the following shell command.

```shell
make format
```

| Section | Tool | Description | Configuration |
| --- | --- | --- | --- |
| backend | Ruff | Python code formatting, imports sorting  | [`backend/pyproject.toml`](./backend/pyproject.toml) |
| backend | `zpretty` | XML and ZCML formatting  | -- |
| frontend | ESLint | Fixes most common frontend issues | [`frontend/.eslintrc.js`](./frontend/.eslintrc.js) |
| frontend | prettier | Format JS and Typescript code  | [`frontend/.prettierrc`](./frontend/.prettierrc) |
| frontend | Stylelint | Format Styles (css, less, sass)  | [`frontend/.stylelintrc`](./frontend/.stylelintrc) |

Formatters can also be run within the `backend` or `frontend` folders.

### Linting the codebase

To check the code base without rewriting it, run the following shell command.

```shell
make lint
```

| Section | Tool | Description | Configuration |
| --- | --- | --- | --- |
| backend | Ruff | Checks code formatting, imports sorting  | [`backend/pyproject.toml`](./backend/pyproject.toml) |
| backend | Pyroma | Checks Python package metadata  | -- |
| backend | check-python-versions | Checks Python version information  | -- |
| backend | `zpretty` | Checks XML and ZCML formatting  | -- |
| frontend | ESLint | Checks JS / Typescript lint | [`frontend/.eslintrc.js`](./frontend/.eslintrc.js) |
| frontend | TypeScript | Checks the add-on's types, leaving out tests and stories | [`tsconfig.json`](./frontend/packages/volto-social-media/tsconfig.json) |
| frontend | prettier | Check JS / Typescript formatting  | [`frontend/.prettierrc`](./frontend/.prettierrc) |
| frontend | Stylelint | Check Styles (css, less, sass) formatting  | [`frontend/.stylelintrc`](./frontend/.stylelintrc) |

Linters can be run individually within the `backend` or `frontend` folders.

## Internationalization 🌐

Generate translation files for Plone and Volto with ease:

```shell
make i18n
```

## Packages 📦

This repository holds two packages, released separately and each under its own license.

| Package | Location | Registry | License |
| ------- | -------- | -------- | ------- |
| `plonegovbr.socialmedia` | [backend/](./backend/) | [PyPI](https://pypi.org/project/plonegovbr.socialmedia/) | GPL-2.0-only |
| `@plonegovbr/volto-social-media` | [frontend/](./frontend/) | [npm](https://www.npmjs.com/package/@plonegovbr/volto-social-media) | MIT |

The frontend package requires the backend, because everything it renders comes from what the backend serves. The backend package stores the settings on its own, but ships no Classic UI integration, so nothing shows them without the frontend.

## Credits and acknowledgements 🙏

Generated using [cookieplone-templates (a83957d)](https://github.com/plone/cookieplone-templates/commit/a83957d67a92031ad7f79b150c66349e3e662eef) on 2025-04-16. Maintained by the [PloneGov-Br Community](https://plone.org.br/gov) 🇧🇷❤️.

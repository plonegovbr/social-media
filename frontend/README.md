<div align="center">

<h1 align="center">Social Media support for Plone</h1>
<h2 align="center">@plonegovbr/volto-social-media</h2>

</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/@plonegovbr/volto-social-media)](https://www.npmjs.com/package/@plonegovbr/volto-social-media)
[![Backend on PyPI](https://img.shields.io/pypi/v/plonegovbr.socialmedia?label=backend)](https://pypi.org/project/plonegovbr.socialmedia/)

[![Documentation](https://img.shields.io/badge/docs-plonegovbr.github.io-0083be)](https://plonegovbr.github.io/social-media/)
[![Storybook](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://plonegovbr.github.io/social-media/storybook/)
[![CI](https://github.com/plonegovbr/social-media/actions/workflows/main.yml/badge.svg)](https://github.com/plonegovbr/social-media/actions/workflows/main.yml)

[![GitHub contributors](https://img.shields.io/github/contributors/plonegovbr/social-media)](https://github.com/plonegovbr/social-media)
[![GitHub Repo stars](https://img.shields.io/github/stars/plonegovbr/social-media?style=social)](https://github.com/plonegovbr/social-media)

</div>

The frontend package for Social Media support for Plone: the table that edits a site's social links, the icons that show them, the Follow Us block, and the head tags built from the site's settings.
See also the backend package [plonegovbr.socialmedia](https://github.com/plonegovbr/social-media/tree/main/backend), which this package requires.

> **Note:** This package replaces the deprecated [`@plonegovbr/volto-network-block`](https://github.com/plonegovbr/volto-network-block) package.

## Features

Everything here renders from what the backend serves: the settings arrive with every page, through plone.restapi's `inherit` expansion, which the add-on requests.

- **Social links widget** — `social_media_object_list`, the widget the backend asks for on its `social_links` fields. It edits the links as a table: one row per link, by network and title, dragged by a handle, edited in a dialog, and deleted after a confirmation. The same name has a view widget, which renders the links as icons.
- **Follow Us block** — the site's links as icons, under an optional headline. The block can show some of the networks, in its own order, picked from the networks the site links to.
- **Footer slot** — the icons registered in the `followUs` slot, which Volto Light Theme renders in its footer.
- **25 networks** — each a `socialNetwork` utility with a title and an icon. A link stores the network's id, so a project adds a network, or replaces an icon, in its own configuration.
- **Head tags** — a shadow of Volto's `ContentMetadataTags` reads the settings from the behavior rather than from Plone's control panel: `fb:app_id`, and `twitter:site` and `og:article:publisher` from the X and Facebook links.
- **Components and hooks** — `SocialNetworks`, `SocialNetwork`, `SocialNetworkIcon`, and `FooterLinks`, with `useNetworks` and `useSocialMedia`, to render the links anywhere else.
- **Typed** — written in TypeScript, with the shapes the backend serves in `src/types`.

### Adding a network

Register a `socialNetwork` utility in your add-on's configuration. Its `name` and the `id` it returns must be the same.

```typescript
import type { ConfigType } from '@plone/registry';
import codebergIcon from './icons/codeberg.svg';

export default function applyConfig(config: ConfigType) {
  config.registerUtility({
    name: 'codeberg',
    type: 'socialNetwork',
    method: () => ({ id: 'codeberg', title: 'Codeberg', icon: codebergIcon }),
  });
  return config;
}
```

Registering an existing network's name replaces its title and icon.

## Documentation

Full documentation is published at [plonegovbr.github.io/social-media](https://plonegovbr.github.io/social-media/), and its source lives in [`docs/`](https://github.com/plonegovbr/social-media/tree/main/docs) at the repository root.

The pages closest to this package are [Install the frontend](https://github.com/plonegovbr/social-media/blob/main/docs/docs/how-to-guides/install-the-frontend.md), [Add a Follow Us block](https://github.com/plonegovbr/social-media/blob/main/docs/docs/how-to-guides/add-a-follow-us-block.md), [Add or change a network](https://github.com/plonegovbr/social-media/blob/main/docs/docs/how-to-guides/configure-networks.md), and the [Volto add-on reference](https://github.com/plonegovbr/social-media/blob/main/docs/docs/reference/frontend.md), which lists everything the add-on registers.

Every component this add-on ships is in [Storybook](https://plonegovbr.github.io/social-media/storybook/), which is the fastest way to see one without a running Plone site.

## Installation

This add-on requires `plonegovbr.socialmedia` installed on the Plone site.
It is developed against Volto 19.4.1.

Add `@plonegovbr/volto-social-media` to your `package.json`.

```json
"addons": [
    "@plonegovbr/volto-social-media"
],
"dependencies": {
    "@plonegovbr/volto-social-media": "*"
}
```

**Name it in both keys.** Adding the package to `dependencies` without listing it under `addons` installs the code but never registers it, so nothing is rendered.

The add-on's styles reach the page through the theme. Volto Light Theme includes them.

## Test installation

Visit http://localhost:3000/ in a browser, log in, and edit the site root: its **Social Media** section holds the table of links.


## Development

The development of this add-on is done in isolation using pnpm workspaces, the latest `mrs-developer`, and other Volto core improvements.
For these reasons, development requires pnpm. `mrs.developer.json` pins the Volto version this repository develops against.


### Prerequisites ✅

-   An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
-   [nvm](https://6.docs.plone.org/install/create-project-cookieplone.html#nvm)
-   [Node.js and pnpm](https://6.docs.plone.org/install/create-project.html#node-js) 24
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) (optional)

### Installation 🔧

1.  Clone this repository, then change your working directory.

    ```shell
    git clone git@github.com:plonegovbr/social-media.git
    cd social-media/frontend
    ```

2.  Install this code base.

    ```shell
    make install
    ```


### Make convenience commands

Run `make help` to list the available Make commands.


### Start developing

Start the backend.

```shell
make backend-docker-start
```

In a separate terminal session, start the frontend.

```shell
make start
```

### Lint code

Run ESLint, the TypeScript type check, Prettier, and Stylelint in analyze mode.
The type check leaves out tests and stories.

```shell
make lint
```

### Format code

Run ESLint, Prettier, and Stylelint in fix mode.

```shell
make format
```

### i18n

Extract the i18n messages to locales.

```shell
make i18n
```

### Unit tests

Run unit tests.

```shell
make test
```

### Storybook

Start Storybook on [port 6006](http://localhost:6006/).

```shell
make storybook-start
```

Build the static site, as CI does before publishing it:

```shell
make storybook-build
```

#### Writing a story

Every component this add-on ships has stories, and a `.stories.tsx` beside a component is as expected here as a `.test.tsx`.
Stories use Component Story Format 3, and payloads come from `src/stories/fixtures.ts`, which holds social links and site state shaped exactly like the backend serves them.
Reuse those rather than inventing a payload, so a story that renders is evidence the component handles the real contract.

The decorators and loaders in `src/stories/decorators.tsx` cover what these components need from their surroundings.

- `withWrapper` renders a story inside Volto's own Storybook `Wrapper`, with its store, router, and translations.
- `withState` puts state in that store, and loads the Volto lazy libraries a component needs, such as the drag-and-drop libraries of the links table.

### Run Cypress tests

Run each of these steps in separate terminal sessions.

In the first session, start the frontend in development mode.

```shell
make acceptance-frontend-dev-start
```

In the second session, start the backend acceptance server.

```shell
make acceptance-backend-start
```

In the third session, start the Cypress interactive test runner.

```shell
make acceptance-test
```

## License

The project is licensed under the MIT license.

## Credits and acknowledgements 🙏

Maintained by the [PloneGov-Br Community](https://plone.org.br/gov) 🇧🇷❤️.

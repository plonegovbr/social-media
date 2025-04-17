# @plonegovbr/volto-social-media

**Social media components for Plone and Volto**

<div align="center">

[![npm](https://img.shields.io/npm/v/@plonegovbr/volto-social-media)](https://www.npmjs.com/package/@plonegovbr/volto-social-media)
[![Storybook](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://plonegovbr.github.io/social-media/)
[![CI](https://github.com/plonegovbr/social-media/actions/workflows/main.yml/badge.svg)](https://github.com/plonegovbr/social-media/actions/workflows/main.yml)

</div>


## Overview 📚

`@plonegovbr/volto-social-media` provides frontend components, hooks, and blocks to manage and display social media links on Plone sites using Volto (React).

It is designed to work together with the backend package [`plonegovbr.socialmedia`](https://pypi.org/project/plonegovbr.socialmedia/).

> **Note:** This package replaces the deprecated [`@plonegovbr/volto-network-block`](https://github.com/plonegovbr/volto-network-block) package.
> New projects should migrate to `@plonegovbr/volto-social-media` for improved functionality and Volto 18+ compatibility.


## Features ✨

### Blocks

- **Follow Us**: A block displaying the site's social networks (inherited from the navigation root).

### Components

- **FooterLinks**: `@plonegovbr/volto-social-media/components/FooterLinks/FooterLinks`
  Displays social media links typically in the footer.

- **SocialNetworks**: `@plonegovbr/volto-social-media/components/SocialNetworks/SocialNetworks`
  Displays social media links anywhere else on your site.

### Hooks

- **useSocialMedia**: `@plonegovbr/volto-social-media/hooks/useSocialMedia`
  Retrieves social media settings (`plonegovbr.socialmedia`) from the backend.

- **useNetworks**: `@plonegovbr/volto-social-media/hooks/useNetworks`
  Retrieves the list of available social networks for the current navigation root.


## Installation 🛠️

Add `@plonegovbr/volto-social-media` to your project dependencies.

### For Volto 18 and later

In your `package.json`:

```json
"dependencies": {
  "@plonegovbr/volto-social-media": "*"
}
```

In your `volto.config.js`:

```javascript
const addons = ['@plonegovbr/volto-social-media'];
```

If the package provides a theme and you wish to use it, add:

```javascript
const theme = '@plonegovbr/volto-social-media';
```

Then install:

```bash
pnpm install
# or
npm install
```


## Test Installation 🔎

After starting your project:

- Visit [http://localhost:3000/](http://localhost:3000/)
- Log in as an admin
- Add the **Follow Us** block or use the available components to verify integration


## Customizing the Network List and Icons 🎨

You can register custom networks or override existing ones:

```typescript
import type { ConfigType } from '@plone/registry';

// Icon
import myIcon from '../icons/mooca.svg';

export default function install(config: ConfigType) {
  config.registerUtility({
    name: 'myNetwork',
    type: 'socialNetwork',
    method: () => ({
      id: 'myNetwork',
      title: 'My Network',
      icon: myIcon,
    }),
  });

  return config;
}
```


## Development 🛠️

This add-on is developed using `pnpm workspaces` and Volto 18+.

### Pre-requisites

- [Node.js](https://6.docs.plone.org/install/create-project.html#node-js)
- [Make](https://6.docs.plone.org/install/create-project.html#make)
- [Docker](https://6.docs.plone.org/install/create-project.html#docker)


### Make Convenience Commands

Run `make help` to see available commands:

```text
help                             Show this help
install                          Install dependencies
start                            Start Volto with hot reloading
build                            Build production bundle
i18n                             Sync i18n
ci-i18n                          Check i18n sync
format                           Format codebase
lint                             Analyze codebase
release                          Release to npmjs.org
release-dry-run                  Dry run the release
test                             Run unit tests
ci-test                          Run unit tests for CI
backend-docker-start             Start Docker-based backend
storybook-start                  Start Storybook server (port 6006)
storybook-build                  Build Storybook
acceptance-frontend-dev-start    Start acceptance frontend (dev)
acceptance-frontend-prod-start   Start acceptance frontend (prod)
acceptance-backend-start         Start acceptance backend
ci-acceptance-backend-start      Start acceptance backend for CI
acceptance-test                  Run Cypress tests (interactive)
ci-acceptance-test               Run Cypress tests (CI)
```


### Development Workflow

1. Install requirements:

```bash
make install
```

2. Start backend (Docker):

```bash
make backend-docker-start
```

3. In another terminal, start frontend:

```bash
make start
```

4. Format and lint code:

```bash
make format
make lint
```

5. Extract i18n messages:

```bash
make i18n
```

6. Run unit tests:

```bash
make test
```


## License 📜

This project is licensed under the **MIT license**.


## Credits & Acknowledgements 🙏

Maintained by the [PloneGov-Br Community](https://plone.org.br/gov) 🇧🇷❤️.

---
myst:
  html_meta:
    "description": "Add a social network to the ones volto-social-media ships, change a network's title or icon, and keep fallback links in the frontend configuration."
    "property=og:description": "Add a social network to the ones volto-social-media ships, change a network's title or icon, and keep fallback links in the frontend configuration."
    "property=og:title": "How to add or change a network"
    "keywords": "Plone, Volto, volto-social-media, network, utility, icon, configuration"
---

(howto-configure-networks)=

# How to add or change a network

This guide shows you how to change the networks editors can link to, in your project's frontend configuration.

Every change here goes in the configuration of your own add-on.
Declare `@plonegovbr/volto-social-media` in that add-on's `addons`, so its configuration runs before yours.

## Add a network

1.  Add the network's icon to your add-on, as an SVG file.

2.  Register a `socialNetwork` utility for it.

    ```ts
    import type { ConfigType } from '@plone/registry';
    import codebergIcon from './icons/codeberg.svg';

    export default function applyConfig(config: ConfigType) {
      config.registerUtility({
        name: 'codeberg',
        type: 'socialNetwork',
        method: () => ({
          id: 'codeberg',
          title: 'Codeberg',
          icon: codebergIcon,
        }),
      });
      return config;
    }
    ```

    The utility's `name` and the `id` its method returns must be the same.
    A link stores the `id`, and the icon is looked up by `name`.

Restart the frontend.
The new network is a choice of the **Network** field in the link dialog, in the order of the titles.

## Change a network's title or icon

Register a utility with the name of an existing network.
The registration replaces the add-on's.

```ts
import type { ConfigType } from '@plone/registry';
import xIcon from './icons/x.svg';

export default function applyConfig(config: ConfigType) {
  config.registerUtility({
    name: 'x',
    type: 'socialNetwork',
    method: () => ({ id: 'x', title: 'X', icon: xIcon }),
  });
  return config;
}
```

Every existing link to the network shows the new title in the dialog, and the new icon in the table and on the page.

## Keep fallback links in the configuration

Set `config.settings.socialNetworks` to the links to show when the page inherits none.

```ts
import type { ConfigType } from '@plone/registry';

export default function applyConfig(config: ConfigType) {
  config.settings.socialNetworks = [
    {
      id: 'mastodon',
      title: 'Mastodon',
      href: [{ '@id': 'https://plone.social/@plone' }],
    },
  ];
  return config;
}
```

The footer, the `followUs` slot, and the Follow Us block show these links until the site has links of its own.
The head tags do not use them: the usernames in `twitter:site` and `og:article:publisher` come from the backend alone.

```{seealso}
-   {ref}`reference-frontend-networks` lists the networks the add-on ships.
-   {doc}`/concepts/links-and-networks` explains why networks live in the frontend.
```

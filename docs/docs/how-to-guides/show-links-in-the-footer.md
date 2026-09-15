---
myst:
  html_meta:
    "description": "Show a site's social links in its footer, or anywhere else a Volto page renders components."
    "property=og:description": "Show a site's social links in its footer, or anywhere else a Volto page renders components."
    "property=og:title": "How to show the links in the footer"
    "keywords": "Plone, Volto, volto-social-media, footer, slot, component"
---

(howto-show-links-in-the-footer)=

# How to show the links in the footer

This guide shows you how to render a site's social links outside a Follow Us block: in the footer, or in another part of the page.

## With Volto Light Theme

There is nothing to do.
Volto Light Theme renders the `followUs` slot in its footer whenever the page has links, and the add-on registers the icons in that slot.

## With another theme

Render `FooterLinks` in the component that renders your footer.

```tsx
import FooterLinks from '@plonegovbr/volto-social-media/components/FooterLinks/FooterLinks';

const Footer = () => (
  <footer>
    <FooterLinks title="Follow us" />
  </footer>
);

export default Footer;
```

`FooterLinks` shows the links the page inherits, under an optional headline.
Pass `animate={false}` to keep the icons still.

## Somewhere else on the page

Register the add-on's `FollowUs` component in a slot of your choice, in your add-on's configuration.
This puts the icons below the content of every page.

```ts
import type { ConfigType } from '@plone/registry';
import FollowUs from '@plonegovbr/volto-social-media/components/slots/FollowUs';

export default function applyConfig(config: ConfigType) {
  config.registerSlotComponent({
    name: 'SocialLinksBelowContent',
    slot: 'belowContent',
    component: FollowUs,
  });
  return config;
}
```

## Only some networks, or in another order

Build the list with `useNetworks`, and render it with `SocialNetworks`.

```tsx
import { useNetworks } from '@plonegovbr/volto-social-media/hooks/useNetworks';
import SocialNetworks from '@plonegovbr/volto-social-media/components/SocialNetworks/SocialNetworks';

const NETWORKS = [{ id: 'mastodon' }, { id: 'github' }];

const DeveloperLinks = () => {
  const networks = useNetworks(NETWORKS);
  return <SocialNetworks networks={networks} animate={false} />;
};

export default DeveloperLinks;
```

Declare the list of networks outside the component, so its identity stays the same between renders.
A network with no link on the site is left out.

```{seealso}
{ref}`reference-frontend-slots` and the components and hooks in {doc}`/reference/frontend`.
```

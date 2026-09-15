---
myst:
  html_meta:
    "description": "Give the items of a content type a list of social links of their own, and show them on their pages."
    "property=og:description": "Give the items of a content type a list of social links of their own, and show them on their pages."
    "property=og:title": "How to add links to a content type"
    "keywords": "Plone, Volto, plonegovbr.socialmedia, behavior, content type, social links, slot"
---

(howto-add-links-to-a-content-type)=

# How to add links to a content type

This guide shows you how to give each item of a content type a list of social links, such as the profiles of a speaker.

These links belong to the item alone.
They do not change the links of the site, or of the pages inside the item.

## Enable the behavior

Enable it from the control panel, or from your add-on's profile.

### From the control panel

1.  Select {menuselection}`Site Setup --> Content Types`, then the content type.
2.  In **Behaviors**, switch on **Social Media: Links**.
3.  Select {guilabel}`Save`.

### From your add-on's profile

Add the behavior to the content type's definition, in `profiles/default/types/<Type>.xml`, and apply the profile.

```xml
<?xml version="1.0" encoding="utf-8"?>
<object xmlns:i18n="http://xml.zope.org/namespaces/i18n"
        meta_type="Dexterity FTI"
        name="Speaker"
        i18n:domain="plone"
>
  <property name="behaviors"
            purge="false"
  >
    <element value="plonegovbr.socialmedia.links" />
  </property>
</object>
```

Replace `Speaker` with the name of your content type.

The edit form of the type now has a **Social Media** section, with the same **Profiles** table as the site root.

## Show the links

### On a content type without blocks

There is nothing to do.
Volto's default view renders each field with its view widget, and the add-on registers one that renders the links as icons.

### On a content type with blocks

A page with blocks renders its blocks, not its fields.
Render the links in a slot, for that content type alone, from a `.tsx` module of your add-on.

```tsx
import type { ConfigType } from '@plone/registry';
import type { Content } from '@plone/types';
import { ContentTypeCondition } from '@plone/volto/helpers/Slots';
import SocialNetworks from '@plonegovbr/volto-social-media/components/SocialNetworks/SocialNetworks';
import type { SocialLink } from '@plonegovbr/volto-social-media/types';

type WithLinks = Content & { social_links?: SocialLink[] };

const SpeakerLinks = ({ content }: { content: WithLinks }) => (
  <SocialNetworks networks={content.social_links ?? []} />
);

export default function applyConfig(config: ConfigType) {
  config.registerSlotComponent({
    name: 'SpeakerLinks',
    slot: 'belowContent',
    component: SpeakerLinks,
    predicates: [ContentTypeCondition(['Speaker'])],
  });
  return config;
}
```

The icons render below the content of every `Speaker`.

```{seealso}
{ref}`reference-behaviors-links` describes the behavior, and {ref}`reference-frontend-widgets` the view widget.
```

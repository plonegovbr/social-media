---
myst:
  html_meta:
    "description": "Let a section of a Plone site show social links and sharing settings of its own, by enabling the settings behavior on its content type."
    "property=og:description": "Let a section of a Plone site show social links and sharing settings of its own, by enabling the settings behavior on its content type."
    "property=og:title": "How to give a section its own links"
    "keywords": "Plone, plonegovbr.socialmedia, section, subsite, behavior, content type"
---

(howto-give-a-section-its-own-links)=

# How to give a section its own links

This guide shows you how to let a section of a site, and everything inside it, show links and sharing settings of its own.

A page reads the settings of the closest object that provides the settings behavior.
To give a section its own, enable the behavior on the section's content type.

```{important}
Every item of that content type becomes a source of settings for the content inside it.
A new item starts with no links, and its pages show no site links until you set the item's own.
If only some folders are sections, give sections a content type of their own.
```

## Enable the behavior

Enable it from the control panel, or from your add-on's profile.

### From the control panel

1.  Select {menuselection}`Site Setup --> Content Types`, then the section's content type.
2.  In **Behaviors**, switch on **Social Media: Settings**.
3.  Select {guilabel}`Save`.

### From your add-on's profile

Add the behavior to the content type's definition, in `profiles/default/types/<Type>.xml`, and apply the profile.

```xml
<?xml version="1.0" encoding="utf-8"?>
<object xmlns:i18n="http://xml.zope.org/namespaces/i18n"
        meta_type="Dexterity FTI"
        name="Section"
        i18n:domain="plone"
>
  <property name="behaviors"
            purge="false"
  >
    <element value="plonegovbr.socialmedia.settings" />
  </property>
</object>
```

Replace `Section` with the name of your content type.

## Set the section's links

Edit the section, and set its links and sharing settings in its **Social Media** section, as {doc}`set-the-site-links` shows for the site root.

## Verify

Ask the backend for the settings of a page inside the section.

```http
GET /Plone/department/news?expand=inherit&expand.inherit.behaviors=plonegovbr.socialmedia.settings HTTP/1.1
Accept: application/json
```

The `from` of `plonegovbr.socialmedia.settings` names the section, not the site.

```{seealso}
{doc}`/concepts/settings-on-content` explains why the closest object wins entirely.
```

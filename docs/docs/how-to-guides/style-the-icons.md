---
myst:
  html_meta:
    "description": "Change the colors and the hover animation of the social network icons with CSS custom properties."
    "property=og:description": "Change the colors and the hover animation of the social network icons with CSS custom properties."
    "property=og:title": "How to style the icons"
    "keywords": "Plone, Volto, volto-social-media, CSS, custom properties, theme, icons"
---

(howto-style-the-icons)=

# How to style the icons

This guide shows you how to change the colors and the hover animation of the icons.

The add-on's styles read CSS custom properties.
Set them in your add-on's `src/theme/_main.scss`, which Volto loads after the add-on's own styles.

```{note}
Volto collects `src/theme/_main.scss` from every add-on except the one set as the project's theme.
If your add-on is the theme, set the properties in the theme's own styles.
```

## Change the colors everywhere

```scss
:root {
  --social-network-icon-color-main: #1e5631;
  --social-network-icon-color-hover: #0b3d91;
}
```

## Change the colors in one place

Set the properties on an element that contains the icons.
Volto Light Theme puts its footer icons in an element with the class `follow-us`.

```scss
.follow-us {
  --social-network-icon-color-main: #fff;
  --social-network-icon-color-hover: #fff;
}
```

## Change the hover animation

```scss
:root {
  --social-network-animation-transform: scale(1.15);
  --social-network-animation-transition: transform 0.2s ease-out;
}
```

The animation applies only to animated icons.
To keep icons still, switch off **Animate Icon** on a Follow Us block, or pass `animate={false}` to a component.

## Change the size

The components render icons at 47 pixels.
To change the size, render the icons yourself with `SocialNetworkIcon`, whose `size` prop takes a CSS length.

```{seealso}
{ref}`reference-frontend-styles` lists every custom property and what it applies to.
```

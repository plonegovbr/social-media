---
myst:
  html_meta:
    "description": "The configuration, block, widgets, slot, components, hooks, types, and styles the volto-social-media add-on provides."
    "property=og:description": "The configuration, block, widgets, slot, components, hooks, types, and styles the volto-social-media add-on provides."
    "property=og:title": "Volto add-on"
    "keywords": "Plone, Volto, volto-social-media, block, widget, slot, components, hooks"
---

(reference-frontend)=

# Volto add-on

Everything `@plonegovbr/volto-social-media` adds to a Volto project.

## The package

| | |
|---|---|
| Name | `@plonegovbr/volto-social-media` |
| Developed against Volto | 19.4.1 |
| Peer dependencies | `react` ^18.2.0, `react-dom` ^18.2.0, `react-intl` ^3.12.1, `react-redux` ^8.1.2 |
| Dependencies | `@plone/components`, `classnames` |

Every module named on this page is imported from the package, as in `@plonegovbr/volto-social-media/components/SocialNetworks/SocialNetworks`.

```{note}
Every component in this package has a story.
[Browse them in Storybook](https://plonegovbr.github.io/social-media/storybook/) to see a component rendered with its props, without running a site.
```

## Configuration

The add-on's default export applies these steps, in this order.

| Step | Module | Registers |
|---|---|---|
| Blocks | `config/blocks` | The Follow Us block |
| Networks | `config/networks` | One `socialNetwork` utility per network |
| Settings | `config/settings` | The `inherit` API expander |
| Widgets | `config/widgets` | The `socialMedia` schema, and the edit and view widgets |
| Slots | `config/slots` | The `FollowUs` slot component |

(reference-frontend-expander)=

## Expansion on content requests

The add-on adds one entry to `config.settings.apiExpanders`.

| Entry | What it does |
|---|---|
| `{ match: '', GET_CONTENT: ['inherit'], querystring: inheritQuerystring }` | Asks for the `plonegovbr.socialmedia.settings` behavior with every content request. |

`inheritQuerystring`, exported by `config/settings`, appends the behavior's name to the `expand.inherit.behaviors` value built by the expanders registered before it.
The behaviors another add-on asked for, such as Volto Light Theme, are kept.

The entry matches every path, and is sent for anonymous visitors too.
{doc}`rest-api` describes the response.

(reference-frontend-networks)=

## Networks

Each network is a utility of the type `socialNetwork`, named for the `id` a link stores.
Its method returns a `SocialNetworkInfo` object: `id`, `title`, and `icon`, an imported SVG.

| `id` | `title` |
|---|---|
| `bluesky` | BlueSky |
| `discord` | Discord |
| `docker` | Docker |
| `facebook` | Facebook |
| `flickr` | Flickr |
| `github` | GitHub |
| `gitlab` | Gitlab |
| `instagram` | Instagram |
| `linkedin` | LinkedIn |
| `mastodon` | Mastodon |
| `medium` | Medium |
| `rss` | RSS |
| `slack` | Slack |
| `soundcloud` | Soundcloud |
| `spotify` | Spotify |
| `stackoverflow` | StackOverflow |
| `telegram` | Telegram |
| `threads` | Threads |
| `tiktok` | TikTok |
| `twitch` | Twitch |
| `website` | Website |
| `whatsapp` | WhatsApp |
| `x` | X (Twitter) |
| `xing` | Xing |
| `youtube` | YouTube |

A link whose `id` names no registered utility keeps its list item and its anchor, but renders no icon.

(reference-frontend-widgets)=

## Widgets

| Registry | Name | Component |
|---|---|---|
| `config.widgets.widget` | `social_media_object_list` | `SocialLinksWidget` |
| `config.widgets.views.widget` | `social_media_object_list` | `SocialLinksViewWidget` |
| `config.widgets.views.id` | `social_links` | `SocialLinksViewWidget` |

The backend asks for `social_media_object_list` on both `social_links` fields, as {ref}`reference-behaviors-widget` shows.
The Follow Us block asks for it on its `allowedNetworks` field.

A content view picks a view widget by the field's name, or by a `widget` set in a frontend schema.
It does not read the widget the backend names in `frontendOptions`.
So the view widget is also registered for the field name `social_links`.

### The edit widget

`SocialLinksWidget` is `OrderedObjectListWidget` with three props set.

| Prop | Value | What it does |
|---|---|---|
| `columns` | `['id', 'title']` | Shows a link by its network and its title. |
| `cells` | `SOCIAL_LINK_CELLS` | Shows the network by its icon, named with the network's title. A network with no registered utility shows its `id`. |
| `prepareRows` | `withNetworkTitles` | Gives a link saved with an empty title the network's title. Changes nothing when the item schema has no `title` field. |

Both widgets are exported by `components/Widgets/OrderedObjectListWidget/OrderedObjectListWidget`, the second as the default export.

The widget renders a list of objects as a table, one row per entry.

| Action | What it does |
|---|---|
| Drag a row by its handle | Moves the entry. Handles appear once Volto's drag-and-drop libraries have loaded. |
| {guilabel}`Edit` | Opens the entry in a dialog built from the item schema. |
| {guilabel}`Delete` | Asks for confirmation, then removes the entry. |
| The button beside the field's label | Opens an empty dialog for a new entry. Its label is {guilabel}`Add` followed by the title of the item schema. |

Every action changes the field's value only.
Nothing is stored until the form is saved.
An empty list shows *Nothing has been added yet.*

| Prop | Set by | What it does |
|---|---|---|
| `schemaName` | `widgetProps` | Names a registered `schema` utility that builds the item schema. Wins over `schema`. |
| `schema` | A form schema built in the frontend | The item schema, or a function returning it. Ignored when it has no `fieldsets`. |
| `columns` | `widgetProps`, or a form schema | The fields of the item schema shown as columns, in order. `SocialLinksWidget` defaults to `['id', 'title']`; `OrderedObjectListWidget` shows every field without it. |
| `cells` | A frontend component | A function per field name, called with the entry's value and the whole entry, returning what the cell shows. Other columns show the value as text. |
| `prepareRows` | A frontend component | Called with the entries and the item schema after any change, returning the entries to store. |
| `isDisabled` | Volto's form | Removes the handles and disables every action. |

A schema function is called with the props of the widget spread, and also with `props` and `intl` as keys.

The dialog picks the widget of a field as `object_list` does, never by the field's name.
A field named `id` renders the widget its `widget` or `choices` asks for, rather than Volto's short name widget.

The value is a list of objects, in order.
Any change gives an `@id` to each entry without one, as Volto's `object_list` widget does.

### The `socialMedia` schema

A utility of the type `schema`, named `socialMedia`, whose method is `socialMediaSchema`.
It describes one social link.

| Field | Label | Widget | Details |
|---|---|---|---|
| `id` | Network | A select | One choice per registered `socialNetwork` utility, labeled with its title and ordered by title, from `networkChoices`. No empty choice. |
| `title` | Title | A text input | Described as *Leave empty to use the network's name.* |
| `href` | Target | `object_browser`, in `link` mode | Accepts an external address as well as content of the site. |

`id` and `href` are required.
The title of the schema is *Link*, so the add button of the widget reads {guilabel}`Add Link`.

### The view widget

`SocialLinksViewWidget`, exported by `components/Widgets/SocialLinksViewWidget/SocialLinksViewWidget`.

| Prop | What it does |
|---|---|
| `value` | The links. |
| `className` | Added to the wrapper's classes. |

It renders nothing for a missing or empty value.
Otherwise it renders a `div` with the classes `social-links widget`, holding `SocialNetworks` without animation.

Volto's `DefaultView` renders each field of a content object without blocks with its view widget.

(reference-frontend-block)=

## The Follow Us block

| Key | Value |
|---|---|
| `id` | `followUsBlock` |
| `title` | Follow Us Block |
| `group` | `common` |
| `icon` | Volto's `share.svg` |
| `restricted` | `false` |
| `mostUsed` | `false` |
| `sidebarTab` | `1` |
| `blockSchema` | `followUsSchema`, exported by `components/Blocks/FollowUs/schema` |

### Data

A block stores a `FollowUsBlockData` object.

| Key | Type | Sidebar fieldset | Sidebar default | Description |
|---|---|---|---|---|
| `title` | string | Default | `''` | The headline above the icons. |
| `animate` | boolean | Default | `false` | Whether the icons move on hover. |
| `allowedNetworks` | `AllowedNetwork[]` | Filter Networks | `[]` | The networks shown, in this order. |
| `styles['align:noprefix']` | string, or an object of CSS custom properties | Styling | `'left'` | The block's alignment, set with the `blockAlignment` widget. The widget stores the custom properties of the alignment picked, such as `{"--block-alignment": "var(--align-center)"}`. |

The sidebar edits `allowedNetworks` with the `social_media_object_list` widget, showing the one column `id`.
Its choices are the networks of the links the page inherits, not every registered network.

### Rendering

-   The block renders a container with the classes `block follow_us`, and the class name Volto passes it.
-   The headline renders in a container with the classes `follow_us title`, when `title` is set.
-   The icons are the links `useNetworks` returns for `allowedNetworks`.
-   A block without an `animate` key animates its icons.

(reference-frontend-slots)=

## Slots

| Slot | Name | Component |
|---|---|---|
| `followUs` | `FollowUs` | `components/slots/FollowUs` |

Volto Light Theme renders the `followUs` slot inside its post-footer, when the links the page inherits are not empty.

## Components

| Module | Props | Renders |
|---|---|---|
| `components/SocialNetworks/SocialNetworks` | `networks`, `animate` | A `ul` with the class `social-networks`, with one `li` for each link that has a target, in order. A link without a title is named with its network's title, or its `id` when the network has no utility. |
| `components/SocialNetwork/SocialNetwork` | `id`, `title`, `href`, `animate` | Volto's `UniversalLink` to `href`, opening in a new tab, with `rel="me"` and the classes `social-network item <id>`, plus `animate` when animated. |
| `components/SocialNetworkIcon/SocialNetworkIcon` | `id`, `size`, `color`, `className`, `title`, `onClick`, `animate` | Volto's `Icon` with the network's SVG, `47px` unless `size` says otherwise. The title names the SVG; without one, the icon is hidden from screen readers. Nothing for a network with no utility. |
| `components/FooterLinks/FooterLinks` | `title`, `animate` | A container with the class `footer_follow_us`, an optional headline, and the links `useNetworks()` returns. Animated unless `animate` is `false`. |
| `components/slots/FollowUs` | `animate` | The links `useNetworks()` returns. Animated unless `animate` is `false`. |
| `components/Blocks/FollowUs/View` | `data`, `className`, `style` | The block, as {ref}`reference-frontend-block` describes. |
| `components/Blocks/FollowUs/Edit` | `data`, `block`, `onChangeBlock`, `selected` | The block's view, and its settings in the sidebar while it is selected. |
| `components/ComponentMetadataTags/ContentMetadataTags` | `content` | The page's head tags, as {ref}`reference-frontend-metadata` lists. |

The add-on registers `FooterLinks` nowhere.

## Hooks

`useSocialMedia()`, from `hooks/useSocialMedia`
:   The `plonegovbr.socialmedia.settings` fields the current content inherits, as a `SocialMediaSettings` object.
    When none were served, it returns `DEFAULT_SOCIAL_MEDIA_SETTINGS`: `share_social_data` is `true`, and every other field is empty.

`useNetworks(allowedNetworks = [])`, from `hooks/useNetworks`
:   The links to show.
    They are the inherited `social_links`, read through `useLiveData`.
    When those are empty, they are `config.settings.socialNetworks`, or an empty list.
    A non-empty `allowedNetworks` keeps only the links of those networks, in its order, and drops a network with no link.
    Of several links to the same network, it keeps the last.

`useLiveData(content, behavior, field)`, from `hooks/useLiveData`
:   One field of an inherited behavior.
    While a content form holds a field of that name, it returns the form's value, so a change shows before it is saved.
    Otherwise it returns the value the `inherit` expansion served.
    It matches the form's field by name alone.

## Helpers and constants

The networks are a client-side vocabulary, read from the registered `socialNetwork` utilities each time a function of `vocabularies/networks` is called.

`getNetworks()`, from `vocabularies/networks`
:   Every registered network, as `SocialNetworkInfo` objects ordered by title.

`getNetwork(id)`, from `vocabularies/networks`
:   The network a token names, or `undefined` when no utility is registered for it.

`networkChoices()`, from `vocabularies/networks`
:   The networks as `[id, title]` pairs, ordered by title, for the `choices` of a select field.

`networkTitle(id)`, from `vocabularies/networks`
:   The network's title, or `id` itself when no utility is registered for it.

`inheritedData(content, behavior)`, from `helpers/inherit`
:   A behavior's data as `@components.inherit` holds it, or `undefined` when the expansion was not requested or no object provides the behavior.

`SETTINGS_BEHAVIOR`, from `constants`
:   `'plonegovbr.socialmedia.settings'`.

## Settings

| Key | Type | Default | What it does |
|---|---|---|---|
| `config.settings.socialNetworks` | `SocialLink[]` | Not set | The links `useNetworks` returns when the inherited `social_links` are empty. |

(reference-frontend-metadata)=

## Shadowed component

The add-on shadows one Volto component.

| Shadowed | Why |
|---|---|
| `volto/components/theme/ContentMetadataTags/ContentMetadataTags` | To read the social media settings from the behavior rather than from Plone's control panel. |

The shadow re-exports `components/ComponentMetadataTags/ContentMetadataTags`, which renders these tags.

| Tag | Content | Rendered when |
|---|---|---|
| `title` | `seo_title`; otherwise `title`, followed by the separator and the navigation root's title, or else the site's title | Always |
| `link rel="canonical"` | `seo_canonical_url`, or the public address of the content | Always |
| `meta name="description"` | `seo_description`, or `description` | Always |
| `meta property="fb:app_id"` | `facebook_app_id` | `share_social_data` is on and `facebook_app_id` is set |
| `meta property="og:article:publisher"` | `facebook_username` | `share_social_data` is on and `facebook_username` is set |
| `meta name="twitter:site"` | `@` followed by `x_username` | `share_social_data` is on and `x_username` is set |
| `meta property="og:title"` | `opengraph_title`, `seo_title`, or `title` | Always |
| `meta property="og:url"` | The canonical address | Always |
| `meta name="robots" content="noindex"` | | `seo_noindex` is on |
| `meta property="og:image"`, `og:image:width`, `og:image:height` | The `large` scale of `opengraph_image`, or else of the field `config.settings.contentMetadataTagsImageField` names | Either image has a `large` scale |
| `meta property="og:description"` | `opengraph_description`, `seo_description`, or `description` | One of them is set |
| `meta name="twitter:card"` | `summary_large_image` | Always |

The navigation root's title is added only when `config.settings.siteTitleFormat.includeSiteTitle` is on and that title differs from `title`.
The separator is `config.settings.siteTitleFormat.titleAndSiteTitleSeparator`, and `-` when that is not set.
Soft hyphens are removed from the title.

The component fetches `@navroot` for the current page, unless a `navroot` API expander already covers the path.

## Types

Exported by `types`.

| Type | Describes |
|---|---|
| `SocialNetworkInfo` | What a `socialNetwork` utility returns: `id`, `title`, and `icon`. |
| `LinkTarget` | One target of a link: `@id`, and an optional `title`. |
| `SocialLink` | One entry of `social_links`, as {ref}`reference-behaviors-value` describes. |
| `SocialMediaSettings` | The fields of `plonegovbr.socialmedia.settings`, as the `inherit` expansion serves them. |
| `AllowedNetwork` | One entry of a Follow Us block's `allowedNetworks`: `id`, and an optional `@id`. |
| `FollowUsBlockData` | What a Follow Us block stores. |

The module also augments two `@plone/types` interfaces.

| Interface | Key added |
|---|---|
| `BlocksConfigData` | `followUsBlock` |
| `SettingsConfig` | `socialNetworks` |

(reference-frontend-styles)=

## Styles

The styles are in `src/theme/_main.scss`.
Volto collects each add-on's `theme/_main.scss` into the module `addonsThemeCustomizationsMain`, which Volto Light Theme imports.

| Custom property | Default | Applies to |
|---|---|---|
| `--social-network-icon-color-main` | `#000` | The `color` of `.social-network.icon` |
| `--social-network-icon-color-hover` | `#000` | The `color` of `.social-network.icon` on hover |
| `--social-network-background-main` | `transparent` | The `background-color` of `.social-network.item` |
| `--social-network-background-hover` | `transparent` | The `background-color` of `.social-network.item` on hover |
| `--social-network-animation-transform` | `translateY(-2px)` | The `transform` of an animated icon on hover |
| `--social-network-animation-transition` | `all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)` | The transition of an animated icon on hover |
| `--block-alignment` | Not defined | The `justify-content` of `ul.social-networks` |

Volto's `Icon` fills an SVG with `currentColor` when no `color` prop is given, so the icon's `color` is its fill.

`FooterLinks` sets `--block-alignment` to `left` on its container.

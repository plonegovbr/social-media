---
block: followUsBlock
---

Shows the site's social network links as a row of icons, with an optional headline above them.

The block stores only what to show: the headline, whether the icons animate, and which networks to show and in which order. It stores no web addresses. Each icon links to the address of the site's social link for that network, so to change where an icon points, change the site's social links.

### Fields

- `title`: the headline shown above the icons, as plain text. Left out or empty, no headline is shown.
- `animate`: `true` or `false`, whether the icons move on hover. When the key is absent, the icons animate. Blocks created in the editor store `false` by default, so a block with no stored value animates only if it predates that default.
- `allowedNetworks`: a list of objects with an `id` each, where `id` is the name of a social network, such as `github`. The icons are shown in this order. Left out or empty, every social link of the site is shown. A name with no social link on the site shows no icon.
- `styles`: the block's presentation. Its `align:noprefix` key is the alignment. The editor stores the alignment as CSS custom properties, such as `{ "--block-alignment": "var(--align-center)" }`, and the default is `left`.

### Examples

A block with the default look, showing every social link of the site:

```json
{ "@type": "followUsBlock" }
```

A block with a headline, static icons, and only two networks in a given order:

```json
{
  "@type": "followUsBlock",
  "title": "Follow us",
  "animate": false,
  "allowedNetworks": [{ "id": "github" }, { "id": "mastodon" }],
  "styles": { "align:noprefix": { "--block-alignment": "var(--align-center)" } }
}
```

/**
 * Social networks, and the links to them.
 * @module types/networks
 */

/**
 * A network this add-on can link to, as its `socialNetwork` utility describes
 * it.
 */
export interface SocialNetworkInfo {
  /** The token a link stores in its `id`, and the utility's name. */
  id: string;
  /** The network's name, as an editor is offered it. */
  title: string;
  /** The network's icon, as Volto's `Icon` takes it: an imported SVG. */
  icon: string;
}

/** Where a link points: what Volto's object browser stores for a target. */
export interface LinkTarget {
  '@id': string;
  title?: string;
}

/**
 * One social link, as the `social_links` field stores it and the
 * `social_media_object_list` widget edits it.
 */
export interface SocialLink {
  /** Given to every entry by the widget; the rows drag by it. */
  '@id'?: string;
  /** The network: the name of a `socialNetwork` utility. */
  id: string;
  title?: string;
  /** The target, as a list of one. A link without one is not shown. */
  href?: LinkTarget[];
}

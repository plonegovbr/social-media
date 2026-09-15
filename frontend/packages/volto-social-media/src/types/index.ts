/**
 * The package's types, in three parts.
 *
 * `networks.ts`
 *     The networks this add-on links to, and a link as the `social_links`
 *     field stores it.
 *
 * `settings.ts`
 *     The site's social media settings as the backend serves them, and the
 *     `@plone/types` augmentation for `config.settings.socialNetworks`.
 *
 * `blocks.ts`
 *     What the Follow Us block stores, and the `@plone/types` augmentation
 *     that registers it.
 *
 * This file re-exports all three, so `from '../types'` reaches everything.
 * @module types
 */

export * from './blocks';
export * from './networks';
export * from './settings';

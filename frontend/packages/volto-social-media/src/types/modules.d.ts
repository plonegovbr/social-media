/**
 * Modules without type declarations that the type check reaches.
 *
 * `@plone/volto/*` resolves to Volto's source, so the type check follows
 * Volto's own imports, and this add-on checks them strictly where Volto does
 * not. `UniversalLink` imports `react-router-hash-link`, which ships no types.
 */

declare module 'react-router-hash-link';

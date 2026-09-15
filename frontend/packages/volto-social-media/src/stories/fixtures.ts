/**
 * Shared fixtures for the stories and the tests.
 *
 * The data is the shape this package's `socialMedia` schema utility builds and
 * the `social_links` field stores, so a story that renders is evidence the
 * component can render what it will really be given.
 * @module stories/fixtures
 */
import type { ItemSchema } from '../helpers/orderedList';

/**
 * One social link, as the `socialMedia` schema utility describes it.
 *
 * Written out rather than built by the utility, which reads its network
 * choices from the registry: a story or a test would otherwise depend on
 * every network having been registered first. The networks are three of the
 * ones this package registers.
 */
export const SOCIAL_LINK_SCHEMA: ItemSchema = {
  title: 'Link',
  fieldsets: [
    { id: 'default', title: 'Default', fields: ['id', 'title', 'href'] },
  ],
  properties: {
    id: {
      title: 'Network',
      choices: [
        ['github', 'GitHub'],
        ['mastodon', 'Mastodon'],
        ['website', 'Website'],
      ],
      noValueOption: false,
    },
    title: { title: 'Title' },
    href: {
      title: 'Target',
      widget: 'object_browser',
      mode: 'link',
      selectedItemAttrs: ['Title', 'Description', '@type'],
      allowExternals: true,
    },
  },
  required: ['id', 'title', 'href'],
};

/**
 * A `social_links` value. `href` is what the object browser stores for an
 * external link: a list of one object, its URL and that URL without the scheme.
 */
export const SOCIAL_LINKS = [
  {
    '@id': '0b9f6a3e-2c1d-4e8f-9a7b-5c6d7e8f9a0b',
    id: 'github',
    title: 'GitHub',
    href: [
      {
        '@id': 'https://github.com/plonegovbr',
        title: 'github.com/plonegovbr',
      },
    ],
  },
  {
    '@id': '6f1e2d3c-4b5a-4968-8776-655443322110',
    id: 'mastodon',
    title: 'Mastodon',
    href: [
      {
        '@id': 'https://plone.social/@plone',
        title: 'plone.social/@plone',
      },
    ],
  },
];

/**
 * Volto's lazy libraries, loaded for a store that cannot load them itself.
 *
 * A component asks for them with `useLazyLibs`, which dispatches each one into
 * the `lazyLibraries` slice once it arrives. The stores in the stories and the
 * tests are static and ignore that dispatch, so a story or a test that wants
 * the loaded state loads the libraries up front and puts them in the slice
 * itself.
 *
 * @param names Names registered in `config.settings.loadables`.
 * @returns The `lazyLibraries` slice, with every one of them loaded.
 */
export async function loadLazyLibraries(
  names: string[],
): Promise<Record<string, any>> {
  const { loadables } = await import('@plone/volto/config/Loadables');
  return Object.fromEntries(
    await Promise.all(
      names.map(async (name) => [name, await (loadables as any)[name].load()]),
    ),
  );
}

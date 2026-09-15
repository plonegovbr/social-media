/**
 * Shared fixtures for the stories and the tests.
 *
 * The data is the shape this package's `socialMedia` schema utility builds and
 * the `social_links` field stores, so a story that renders is evidence the
 * component can render what it will really be given.
 * @module stories/fixtures
 */
import type { Content } from '@plone/types';
import { SETTINGS_BEHAVIOR } from '../constants';
import type { ItemSchema } from '../helpers/orderedList';
import type { SocialMediaSettings } from '../types';

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
    title: {
      title: 'Title',
      description: "Leave empty to use the network's name.",
    },
    href: {
      title: 'Target',
      widget: 'object_browser',
      mode: 'link',
      selectedItemAttrs: ['Title', 'Description', '@type'],
      allowExternals: true,
    },
  },
  required: ['id', 'href'],
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

/** A site's social media settings, linking to `SOCIAL_LINKS`. */
export const SOCIAL_MEDIA_SETTINGS: SocialMediaSettings = {
  share_social_data: true,
  facebook_app_id: '',
  facebook_username: '',
  x_username: '',
  social_links: SOCIAL_LINKS,
};

/**
 * The store state of a page on a site with social media settings.
 *
 * The content carries the settings as the `inherit` expansion serves them,
 * and the form holds what an open content edit form would.
 *
 * @param settings Settings to replace.
 * @param form What the content edit form holds.
 * @returns The state.
 */
export function siteState(
  settings: Partial<SocialMediaSettings> = {},
  form: Record<string, unknown> = {},
) {
  return {
    content: {
      data: {
        '@id': 'http://localhost:8080/Plone/news',
        '@components': {
          inherit: {
            [SETTINGS_BEHAVIOR]: {
              from: { '@id': 'http://localhost:8080/Plone', title: 'Plone' },
              data: { ...SOCIAL_MEDIA_SETTINGS, ...settings },
            },
          },
        },
      } as unknown as Content,
    },
    form: { global: form },
    router: { location: { pathname: '/news' } },
    userSession: { token: null },
  };
}

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

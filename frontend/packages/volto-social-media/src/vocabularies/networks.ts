/**
 * The networks a link can point to, as a client-side vocabulary.
 *
 * Every network is a `socialNetwork` utility: this package registers its own
 * in `config/networks`, and a project adds or removes some the same way. Volto
 * keeps no registry of client-side vocabularies -- a `SelectWidget` either
 * fetches a backend vocabulary or is handed `choices` -- so the vocabulary is
 * read from the utilities each time it is asked for, and a network a project
 * registered is offered along with the rest.
 * @module vocabularies/networks
 */
import config from '@plone/volto/registry';
import type { SocialNetworkInfo } from '../types';

/**
 * Every registered network.
 *
 * @returns The networks, ordered by title.
 */
export function getNetworks(): SocialNetworkInfo[] {
  const utilities = config.getUtilities({ type: 'socialNetwork' });
  return Object.values(utilities)
    .map((utility) => utility.method() as SocialNetworkInfo)
    .sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * One network.
 *
 * @param id The token a link stores, which is the utility's name.
 * @returns The network, or `undefined` when no utility is registered for it:
 *   a link to a network a project has removed.
 */
export function getNetwork(id: string): SocialNetworkInfo | undefined {
  return config.getUtility({ type: 'socialNetwork', name: id })?.method?.();
}

/**
 * The networks, as the `choices` of a select field.
 *
 * @returns One `[token, title]` pair per network, ordered by title.
 */
export function networkChoices(): [string, string][] {
  return getNetworks().map(({ id, title }) => [id, title]);
}

/**
 * The name a network is shown by.
 *
 * @param id The token a link stores.
 * @returns The network's title, or the token itself for a network no utility
 *   is registered for.
 */
export function networkTitle(id: string): string {
  return getNetwork(id)?.title ?? id;
}

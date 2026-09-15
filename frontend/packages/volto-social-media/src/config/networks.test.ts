import { describe, expect, it } from 'vitest';

import install from './networks';

/** Every network the add-on ships, by the id a link stores. */
const NETWORKS = [
  'bluesky',
  'discord',
  'docker',
  'facebook',
  'flickr',
  'github',
  'gitlab',
  'instagram',
  'linkedin',
  'mastodon',
  'medium',
  'rss',
  'slack',
  'soundcloud',
  'spotify',
  'stackoverflow',
  'telegram',
  'threads',
  'tiktok',
  'twitch',
  'website',
  'whatsapp',
  'x',
  'xing',
  'youtube',
];

/**
 * Install the networks, keeping what was registered.
 *
 * @returns The utilities registered, by name.
 */
function registered() {
  const utilities: Record<string, { type: string; method: () => any }> = {};
  const config: any = {
    registerUtility: ({ name, type, method }: any) => {
      utilities[name] = { type, method };
    },
  };
  install(config);
  return utilities;
}

describe('install', () => {
  it('registers every network as a socialNetwork utility', () => {
    const utilities = registered();

    expect(Object.keys(utilities).sort()).toEqual(NETWORKS);
    for (const utility of Object.values(utilities)) {
      expect(utility.type).toBe('socialNetwork');
    }
  });

  it('names each utility for the id its links store', () => {
    for (const [name, utility] of Object.entries(registered())) {
      expect(utility.method().id).toBe(name);
    }
  });

  it('gives every network a title and an icon', () => {
    for (const utility of Object.values(registered())) {
      const { title, icon } = utility.method();
      expect(title).toBeTruthy();
      expect(icon).toBeTruthy();
    }
  });
});

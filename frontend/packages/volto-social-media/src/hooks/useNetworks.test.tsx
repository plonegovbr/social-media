import { afterEach, describe, expect, it } from 'vitest';

import config from '@plone/volto/registry';

import { renderHook, storeWrapper } from '../testing';
import { useNetworks } from './useNetworks';
import { SOCIAL_LINKS, siteState } from '../stories/fixtures';
import type { AllowedNetwork, SocialLink } from '../types';

/** The links a project keeps in its configuration. */
const CONFIGURED: SocialLink[] = [
  {
    id: 'youtube',
    title: 'YouTube',
    href: [{ '@id': 'https://www.youtube.com/@plone' }],
  },
];

afterEach(() => {
  delete config.settings.socialNetworks;
});

/**
 * The links the hook answers with over a store.
 *
 * @param state The store's state.
 * @param allowed The networks to keep.
 * @returns What the hook answered.
 */
function networks(
  state: ReturnType<typeof siteState>,
  allowed?: AllowedNetwork[],
) {
  const { result } = renderHook(() => useNetworks(allowed), {
    wrapper: storeWrapper(state),
  });
  return result.current;
}

describe('useNetworks', () => {
  it("is the site's links", () => {
    expect(networks(siteState())).toEqual(SOCIAL_LINKS);
  });

  it('is the links being edited while the form holds them', () => {
    const edited = [SOCIAL_LINKS[1]];

    expect(networks(siteState({}, { social_links: edited }))).toEqual(edited);
  });

  it('is the configured links when the site has none', () => {
    config.settings.socialNetworks = CONFIGURED;

    expect(networks(siteState({ social_links: [] }))).toEqual(CONFIGURED);
  });

  it('is nothing when neither the site nor the configuration has links', () => {
    expect(networks(siteState({ social_links: [] }))).toEqual([]);
  });

  it('keeps only the allowed networks, in their order', () => {
    expect(
      networks(siteState(), [{ id: 'mastodon' }, { id: 'github' }]),
    ).toEqual([SOCIAL_LINKS[1], SOCIAL_LINKS[0]]);
  });

  it('skips an allowed network the site does not link to', () => {
    expect(
      networks(siteState(), [{ id: 'youtube' }, { id: 'github' }]),
    ).toEqual([SOCIAL_LINKS[0]]);
  });

  it('keeps every link when no network is singled out', () => {
    expect(networks(siteState(), [])).toEqual(SOCIAL_LINKS);
  });
});

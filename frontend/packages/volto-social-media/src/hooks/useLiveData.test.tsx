import { describe, expect, it } from 'vitest';

import { renderHook, storeWrapper } from '../testing';
import { useLiveData } from './useLiveData';
import { SETTINGS_BEHAVIOR } from '../constants';
import { SOCIAL_LINKS, siteState } from '../stories/fixtures';

/**
 * Read one field of the settings over a store.
 *
 * @param state The store's state.
 * @param field The field to read.
 * @returns What the hook answered.
 */
function liveData(state: ReturnType<typeof siteState>, field: string) {
  const { result } = renderHook(
    () => useLiveData(state.content.data, SETTINGS_BEHAVIOR, field),
    { wrapper: storeWrapper(state) },
  );
  return result.current;
}

describe('useLiveData', () => {
  it('is the served value while the form holds none', () => {
    expect(liveData(siteState({ x_username: 'plone' }), 'x_username')).toBe(
      'plone',
    );
  });

  it('is the value being edited while the form holds one', () => {
    // An editor changing the links sees the change before saving it.
    const edited = [SOCIAL_LINKS[1]];

    expect(
      liveData(siteState({}, { social_links: edited }), 'social_links'),
    ).toBe(edited);
  });

  it('is undefined when neither has one', () => {
    expect(liveData(siteState(), 'nothing')).toBeUndefined();
  });
});

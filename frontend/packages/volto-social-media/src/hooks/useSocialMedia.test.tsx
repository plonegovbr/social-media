import { describe, expect, it } from 'vitest';

import { renderHook, storeWrapper } from '../testing';
import {
  DEFAULT_SOCIAL_MEDIA_SETTINGS,
  useSocialMedia,
} from './useSocialMedia';
import { SOCIAL_MEDIA_SETTINGS, siteState } from '../stories/fixtures';

describe('useSocialMedia', () => {
  it('is the settings the content inherits', () => {
    const { result } = renderHook(() => useSocialMedia(), {
      wrapper: storeWrapper(siteState({ x_username: 'plone' })),
    });

    expect(result.current).toEqual({
      ...SOCIAL_MEDIA_SETTINGS,
      x_username: 'plone',
    });
  });

  it('is the defaults when the content inherits none', () => {
    const { result } = renderHook(() => useSocialMedia(), {
      wrapper: storeWrapper({ content: { data: { '@components': {} } } }),
    });

    expect(result.current).toBe(DEFAULT_SOCIAL_MEDIA_SETTINGS);
  });

  it('is the defaults before any content has loaded', () => {
    const { result } = renderHook(() => useSocialMedia(), {
      wrapper: storeWrapper({ content: {} }),
    });

    expect(result.current).toBe(DEFAULT_SOCIAL_MEDIA_SETTINGS);
  });
});

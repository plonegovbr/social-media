/**
 * Storybook decorators and loaders shared by this package's stories.
 *
 * Volto's storybook `Wrapper` supplies what a component expects around it on
 * a real page: a redux store, the pluggables, an `IntlProvider` and a router.
 * Its store is a mock -- a dispatch changes nothing -- so a story is a picture
 * of one state, and whatever that state needs beyond Volto's own initial one
 * is put there by the story's loaders.
 * @module stories/decorators
 */
import React from 'react';
import type { Decorator } from '@storybook/react';
import Wrapper from '@plone/volto/storybook';

import { loadLazyLibraries } from './fixtures';

/**
 * Render a story inside Volto's `Wrapper`.
 *
 * The store is Volto's initial state, with `loaded.customStore` -- what the
 * story's loaders returned -- merged over it.
 */
export const withWrapper: Decorator = (Story, { loaded }) => (
  <Wrapper customStore={loaded?.customStore}>
    <div style={{ padding: '2rem', maxWidth: '960px' }}>
      <Story />
    </div>
  </Wrapper>
);

/**
 * A loader putting state in the story's store.
 *
 * Volto's lazy libraries go there too: `useLazyLibs` would dispatch them into
 * the store once loaded, and the mock store ignores that dispatch, so the
 * story loads them first.
 *
 * @param state The state to merge over Volto's initial one.
 * @param lazyLibraries Names registered in `config.settings.loadables`.
 * @returns The loader.
 */
export const withState =
  (state: Record<string, unknown>, lazyLibraries: string[] = []) =>
  async () => ({
    customStore: {
      ...state,
      ...(lazyLibraries.length
        ? { lazyLibraries: await loadLazyLibraries(lazyLibraries) }
        : {}),
    },
  });

/**
 * A loader putting Volto's lazy libraries in the story's store.
 *
 * @param names Names registered in `config.settings.loadables`.
 * @returns The loader.
 */
export const withLazyLibraries = (names: string[]) => withState({}, names);

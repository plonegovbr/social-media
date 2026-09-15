import { beforeAll, describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import React from 'react';

import config from '@plone/volto/registry';

import { render, screen } from '../../../testing';
import SocialLinksViewWidget from './SocialLinksViewWidget';
import type { SocialLinksViewWidgetProps } from './SocialLinksViewWidget';
import installNetworks from '../../../config/networks';
import { SOCIAL_LINKS } from '../../../stories/fixtures';

beforeAll(() => {
  installNetworks(config as any);
});

/**
 * Render the widget over an anonymous visitor's store.
 *
 * @param props The widget's props.
 * @returns What Testing Library's `render` returns.
 */
function renderWidget(props: SocialLinksViewWidgetProps) {
  const state = { userSession: { token: null } };
  const store = {
    getState: () => state,
    dispatch: (action: unknown) => action,
    subscribe: () => () => {},
  };
  return render(
    <Provider store={store as any}>
      <SocialLinksViewWidget {...props} />
    </Provider>,
  );
}

describe('SocialLinksViewWidget', () => {
  it('links to every profile, in order, named for it', () => {
    renderWidget({ value: SOCIAL_LINKS });

    expect(
      screen
        .getAllByRole('link')
        .map((link) => [link.getAttribute('href'), link.getAttribute('title')]),
    ).toEqual([
      ['https://github.com/plonegovbr', 'GitHub'],
      ['https://plone.social/@plone', 'Mastodon'],
    ]);
  });

  it("marks each link as the site's own profile", () => {
    renderWidget({ value: SOCIAL_LINKS });

    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('rel')).toBe('me');
    }
  });

  it('leaves out a link without a target', () => {
    renderWidget({
      value: [...SOCIAL_LINKS, { '@id': 'no-target', id: 'website' }],
    });

    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('keeps the class it is given', () => {
    const { container } = renderWidget({
      value: SOCIAL_LINKS,
      className: 'field',
    });

    expect(container.querySelector('.social-links.widget.field')).toBeTruthy();
  });

  it.each([[[]], [null], [undefined]])('shows nothing for %j', (value) => {
    const { container } = renderWidget({ value });

    expect(container.innerHTML).toBe('');
  });
});

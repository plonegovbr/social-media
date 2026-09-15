import { beforeAll, describe, expect, it } from 'vitest';
import React from 'react';

import config from '@plone/volto/registry';

import { renderWithStore, screen } from '../../testing';
import SocialNetworks from './SocialNetworks';
import type { SocialNetworksProps } from './SocialNetworks';
import installNetworks from '../../config/networks';
import { SOCIAL_LINKS } from '../../stories/fixtures';

beforeAll(() => {
  installNetworks(config as any);
});

/**
 * Render the list for an anonymous visitor.
 *
 * @param props Props to replace.
 * @returns What Testing Library's `render` returns.
 */
function renderList(props: Partial<SocialNetworksProps> = {}) {
  return renderWithStore(
    <SocialNetworks networks={SOCIAL_LINKS} {...props} />,
    { userSession: { token: null } },
  );
}

/** Each link's target and name, in order. */
function links(): (string | null)[][] {
  return screen
    .getAllByRole('link')
    .map((link) => [link.getAttribute('href'), link.getAttribute('title')]);
}

describe('SocialNetworks', () => {
  it('lists every link, in order', () => {
    const { container } = renderList();

    expect(container.querySelectorAll('ul.social-networks > li')).toHaveLength(
      2,
    );
    expect(links()).toEqual([
      ['https://github.com/plonegovbr', 'GitHub'],
      ['https://plone.social/@plone', 'Mastodon'],
    ]);
  });

  it('leaves out a link without a target', () => {
    renderList({
      networks: [...SOCIAL_LINKS, { id: 'website', title: 'Website' }],
    });

    expect(links()).toHaveLength(2);
  });

  it('names a link without a title for its network', () => {
    renderList({
      networks: [{ id: 'github', href: [{ '@id': 'https://github.com/' }] }],
    });

    expect(links()).toEqual([['https://github.com/', 'GitHub']]);
  });

  it('names a link without a title to an unregistered network by its id', () => {
    renderList({
      networks: [{ id: 'myspace', href: [{ '@id': 'https://myspace.com/' }] }],
    });

    expect(links()).toEqual([['https://myspace.com/', 'myspace']]);
  });

  it('animates every link when asked', () => {
    renderList({ animate: true });

    for (const link of screen.getAllByRole('link')) {
      expect(link.classList.contains('animate')).toBe(true);
    }
  });

  it('renders an empty list without links', () => {
    const { container } = renderList({ networks: [] });

    expect(
      container.querySelector('ul.social-networks')?.children,
    ).toHaveLength(0);
  });
});

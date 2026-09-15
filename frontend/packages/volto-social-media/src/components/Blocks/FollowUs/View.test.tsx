import { beforeAll, describe, expect, it } from 'vitest';
import React from 'react';

import config from '@plone/volto/registry';

import { renderWithStore, screen } from '../../../testing';
import View from './View';
import type { FollowUsViewProps } from './View';
import installNetworks from '../../../config/networks';
import { siteState } from '../../../stories/fixtures';
import type { FollowUsBlockData } from '../../../types';

beforeAll(() => {
  installNetworks(config as any);
});

/**
 * Render the block over a site with two links.
 *
 * @param data What the block stores, over its type.
 * @param props Other props to pass.
 * @returns What Testing Library's `render` returns.
 */
function renderBlock(
  data: Partial<FollowUsBlockData> = {},
  props: Partial<FollowUsViewProps> = {},
) {
  return renderWithStore(
    <View data={{ '@type': 'followUsBlock', ...data }} {...props} />,
    siteState(),
  );
}

/** The links' names, in order. */
function names(): (string | null)[] {
  return screen.getAllByRole('link').map((link) => link.getAttribute('title'));
}

describe('Follow Us block view', () => {
  it("shows the headline above the site's links", () => {
    renderBlock({ title: 'Follow us' });

    expect(screen.getByText('Follow us')).toBeTruthy();
    expect(names()).toEqual(['GitHub', 'Mastodon']);
  });

  it('shows no headline without a title', () => {
    const { container } = renderBlock();

    expect(container.querySelector('.follow_us.title')).toBeNull();
  });

  it('shows only the networks it is limited to, in its order', () => {
    renderBlock({ allowedNetworks: [{ id: 'mastodon' }, { id: 'github' }] });

    expect(names()).toEqual(['Mastodon', 'GitHub']);
  });

  it('animates the icons unless the block says not to', () => {
    renderBlock();

    for (const link of screen.getAllByRole('link')) {
      expect(link.classList.contains('animate')).toBe(true);
    }
  });

  it('keeps the icons still when the block says to', () => {
    renderBlock({ animate: false });

    for (const link of screen.getAllByRole('link')) {
      expect(link.classList.contains('animate')).toBe(false);
    }
  });

  it('keeps the class it is given', () => {
    const { container } = renderBlock({}, { className: 'has--align--left' });

    expect(
      container.querySelector('.block.follow_us.has--align--left'),
    ).toBeTruthy();
  });
});

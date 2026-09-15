import { beforeAll, describe, expect, it } from 'vitest';
import React from 'react';

import config from '@plone/volto/registry';

import { renderWithStore, screen } from '../../testing';
import FollowUs from './FollowUs';
import installNetworks from '../../config/networks';
import { siteState } from '../../stories/fixtures';

beforeAll(() => {
  installNetworks(config as any);
});

describe('FollowUs slot', () => {
  it("shows the site's links, animated", () => {
    renderWithStore(<FollowUs />, siteState());

    const links = screen.getAllByRole('link');
    expect(links.map((link) => link.getAttribute('title'))).toEqual([
      'GitHub',
      'Mastodon',
    ]);
    for (const link of links) {
      expect(link.classList.contains('animate')).toBe(true);
    }
  });

  it('keeps the icons still when told to', () => {
    renderWithStore(<FollowUs animate={false} />, siteState());

    for (const link of screen.getAllByRole('link')) {
      expect(link.classList.contains('animate')).toBe(false);
    }
  });
});

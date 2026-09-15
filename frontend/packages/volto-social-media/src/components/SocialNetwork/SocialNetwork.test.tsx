import { beforeAll, describe, expect, it } from 'vitest';
import React from 'react';

import config from '@plone/volto/registry';

import { renderWithStore, screen } from '../../testing';
import SocialNetwork from './SocialNetwork';
import type { SocialNetworkProps } from './SocialNetwork';
import installNetworks from '../../config/networks';

beforeAll(() => {
  installNetworks(config as any);
});

/**
 * Render a link to GitHub for an anonymous visitor.
 *
 * @param props Props to replace.
 * @returns The link.
 */
function renderLink(props: Partial<SocialNetworkProps> = {}) {
  renderWithStore(
    <SocialNetwork
      id="github"
      title="GitHub"
      href="https://github.com/plonegovbr"
      {...props}
    />,
    { userSession: { token: null } },
  );
  return screen.getByRole('link');
}

describe('SocialNetwork', () => {
  it('links to the profile, named for the network', () => {
    const link = renderLink();

    expect(link.getAttribute('href')).toBe('https://github.com/plonegovbr');
    expect(link.getAttribute('title')).toBe('GitHub');
  });

  it('opens the profile in a new tab', () => {
    expect(renderLink().getAttribute('target')).toBe('_blank');
  });

  it("marks the link as the site's own profile", () => {
    expect(renderLink().getAttribute('rel')).toBe('me');
  });

  it('carries the network in its classes', () => {
    const link = renderLink();

    expect([...link.classList]).toEqual(
      expect.arrayContaining(['social-network', 'item', 'github']),
    );
    expect(link.classList.contains('animate')).toBe(false);
  });

  it('animates when asked', () => {
    expect(renderLink({ animate: true }).classList.contains('animate')).toBe(
      true,
    );
  });

  it("draws the network's icon", () => {
    expect(renderLink().querySelector('svg')).toBeTruthy();
  });
});

import { beforeAll, describe, expect, it } from 'vitest';
import React from 'react';

import config from '@plone/volto/registry';

import { renderWithStore, screen } from '../../testing';
import FooterLinks from './FooterLinks';
import type { FooterLinksProps } from './FooterLinks';
import installNetworks from '../../config/networks';
import { siteState } from '../../stories/fixtures';

beforeAll(() => {
  installNetworks(config as any);
});

/**
 * Render the footer links over a site with two links.
 *
 * @param props The component's props.
 * @returns What Testing Library's `render` returns.
 */
function renderFooter(props: FooterLinksProps = {}) {
  return renderWithStore(<FooterLinks {...props} />, siteState());
}

describe('FooterLinks', () => {
  it("shows the headline above the site's links", () => {
    renderFooter({ title: 'Follow us' });

    expect(screen.getByText('Follow us')).toBeTruthy();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('shows no headline without a title', () => {
    const { container } = renderFooter();

    expect(container.querySelector('.footer_follow_us.title')).toBeNull();
  });

  it('animates the icons unless told not to', () => {
    renderFooter();
    for (const link of screen.getAllByRole('link')) {
      expect(link.classList.contains('animate')).toBe(true);
    }
  });

  it('keeps the icons still when told to', () => {
    renderFooter({ animate: false });
    for (const link of screen.getAllByRole('link')) {
      expect(link.classList.contains('animate')).toBe(false);
    }
  });

  it('aligns the icons left', () => {
    const { container } = renderFooter();

    expect(
      (
        container.querySelector('.footer_follow_us') as HTMLElement
      ).style.getPropertyValue('--block-alignment'),
    ).toBe('left');
  });
});

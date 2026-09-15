import { beforeAll, describe, expect, it, vi } from 'vitest';
import React from 'react';

import config from '@plone/volto/registry';

import { fireEvent, render } from '../../testing';
import SocialNetworkIcon from './SocialNetworkIcon';
import type { SocialNetworkIconProps } from './SocialNetworkIcon';
import installNetworks from '../../config/networks';

beforeAll(() => {
  installNetworks(config as any);
});

/**
 * Render GitHub's icon.
 *
 * @param props Props to replace.
 * @returns The icon, or `null` when nothing was drawn.
 */
function renderIcon(props: Partial<SocialNetworkIconProps> = {}) {
  const { container } = render(<SocialNetworkIcon id="github" {...props} />);
  return container.querySelector('svg');
}

describe('SocialNetworkIcon', () => {
  it("draws the network's icon, carrying the network in its classes", () => {
    const icon = renderIcon();

    expect([...icon!.classList]).toEqual(
      expect.arrayContaining(['icon', 'social-network', 'github']),
    );
    expect(icon!.innerHTML).not.toBe('');
  });

  it('names the icon with its title', () => {
    const icon = renderIcon({ title: 'GitHub' });

    expect(icon!.querySelector('title')?.textContent).toBe('GitHub');
    expect(icon!.getAttribute('aria-hidden')).toBe('false');
  });

  it('hides an icon without a title from screen readers', () => {
    const icon = renderIcon();

    expect(icon!.querySelector('title')).toBeNull();
    expect(icon!.getAttribute('aria-hidden')).toBe('true');
  });

  it('is 47px tall unless told otherwise', () => {
    expect(renderIcon()!.style.height).toBe('47px');
  });

  it('is as tall as it is told', () => {
    expect(renderIcon({ size: '24px' })!.style.height).toBe('24px');
  });

  it('is marked when animated', () => {
    expect(renderIcon({ animate: true })!.classList.contains('animate')).toBe(
      true,
    );
  });

  it('passes clicks on', () => {
    const onClick = vi.fn();

    fireEvent.click(renderIcon({ onClick })!);

    expect(onClick).toHaveBeenCalled();
  });

  it('draws nothing for a network with no registered utility', () => {
    expect(renderIcon({ id: 'myspace' })).toBeNull();
  });
});

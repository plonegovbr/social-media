import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import React from 'react';

import config from '@plone/volto/registry';

import { renderWithStore, screen, within } from '../../../testing';
import Edit from './Edit';
import installNetworks from '../../../config/networks';
import { siteState } from '../../../stories/fixtures';

let sidebar: HTMLDivElement;

beforeAll(() => {
  installNetworks(config as any);
});

beforeEach(() => {
  // Where Volto's sidebar puts a selected block's settings.
  sidebar = document.createElement('div');
  sidebar.id = 'sidebar-properties';
  document.body.appendChild(sidebar);
});

afterEach(() => {
  sidebar.remove();
});

/**
 * Render the block's editor over a site with two links.
 *
 * @param selected Whether the block is the one selected.
 */
function renderEdit(selected: boolean) {
  renderWithStore(
    <Edit
      data={{ '@type': 'followUsBlock', title: 'Follow us' }}
      block="d9f6f1c2"
      onChangeBlock={vi.fn()}
      selected={selected}
    />,
    siteState(),
  );
}

describe('Follow Us block editor', () => {
  it('shows the block as it will be seen', () => {
    renderEdit(false);

    expect(screen.getByText('Follow us')).toBeTruthy();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it("puts the block's settings in the sidebar while it is selected", async () => {
    renderEdit(true);

    expect(await within(sidebar).findByText('Follow Us')).toBeTruthy();
  });

  it('leaves the sidebar alone while it is not selected', () => {
    renderEdit(false);

    expect(sidebar.innerHTML).toBe('');
  });
});

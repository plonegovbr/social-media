import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import config from '@plone/volto/registry';

import Edit from './Edit';
import type { FollowUsEditProps } from './Edit';
import installNetworks from '../../../config/networks';
import { DND_LIBRARIES } from '../../Widgets/OrderedListTable/OrderedListTable';
import { siteState } from '../../../stories/fixtures';
import { withState, withWrapper } from '../../../stories/decorators';
import type { FollowUsBlockData } from '../../../types';

installNetworks(config);

/**
 * The block's editor, beside the sidebar its settings are put in.
 *
 * `SidebarPortal` renders into Volto's `#sidebar-properties`, which only the
 * edit page has, so the story supplies one. The story keeps the data the
 * sidebar changes, where the edit page would keep it until saved.
 */
function Render(args: FollowUsEditProps) {
  const [data, setData] = useState<FollowUsBlockData>(args.data);
  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <Edit
          {...args}
          data={data}
          onChangeBlock={(_block, next) => setData(next)}
        />
      </div>
      <aside id="sidebar-properties" style={{ width: '375px' }} />
    </div>
  );
}

const meta = {
  title: 'Blocks/FollowUs/Edit',
  component: Edit,
  decorators: [withWrapper],
  loaders: [withState(siteState(), DND_LIBRARIES)],
  tags: ['autodocs'],
  args: {
    data: { '@type': 'followUsBlock', title: 'Follow us' },
    block: 'd9f6f1c2-7c3b-4c5e-9f7a-3b2c1d0e9f8a',
    onChangeBlock: () => {},
    selected: true,
  },
  render: Render,
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A selected block, its settings in the sidebar. */
export const Selected: Story = {};

/** A block that is not selected leaves the sidebar alone. */
export const NotSelected: Story = {
  args: { selected: false },
};

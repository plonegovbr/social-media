import type { Meta, StoryObj } from '@storybook/react';
import config from '@plone/volto/registry';

import View from './View';
import installNetworks from '../../../config/networks';
import { siteState } from '../../../stories/fixtures';
import { withState, withWrapper } from '../../../stories/decorators';

installNetworks(config);

const meta = {
  title: 'Blocks/FollowUs/View',
  component: View,
  decorators: [withWrapper],
  loaders: [withState(siteState())],
  tags: ['autodocs'],
  args: {
    data: { '@type': 'followUsBlock', title: 'Follow us' },
  },
} satisfies Meta<typeof View>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every link the site has, under the block's headline. */
export const Default: Story = {};

/** A block limited to some of the site's links, in its own order. */
export const SomeNetworks: Story = {
  args: {
    data: {
      '@type': 'followUsBlock',
      title: 'Follow us on Mastodon',
      allowedNetworks: [{ id: 'mastodon' }],
    },
  },
};

/** A block whose icons stay still under the pointer. */
export const Still: Story = {
  args: {
    data: { '@type': 'followUsBlock', title: 'Follow us', animate: false },
  },
};

/** A block without a headline. */
export const WithoutTitle: Story = {
  args: {
    data: { '@type': 'followUsBlock' },
  },
};

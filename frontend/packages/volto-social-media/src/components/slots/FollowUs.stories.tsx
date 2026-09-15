import type { Meta, StoryObj } from '@storybook/react';
import config from '@plone/volto/registry';

import FollowUs from './FollowUs';
import installNetworks from '../../config/networks';
import { siteState } from '../../stories/fixtures';
import { withState, withWrapper } from '../../stories/decorators';

installNetworks(config);

const meta = {
  title: 'Components/Slots/FollowUs',
  component: FollowUs,
  decorators: [withWrapper],
  loaders: [withState(siteState())],
  tags: ['autodocs'],
} satisfies Meta<typeof FollowUs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The site's links, as the `followUs` slot shows them. */
export const Default: Story = {};

/** Icons that stay still under the pointer. */
export const Still: Story = {
  args: { animate: false },
};

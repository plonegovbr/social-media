import type { Meta, StoryObj } from '@storybook/react';
import config from '@plone/volto/registry';

import FooterLinks from './FooterLinks';
import installNetworks from '../../config/networks';
import { siteState } from '../../stories/fixtures';
import { withState, withWrapper } from '../../stories/decorators';

installNetworks(config);

const meta = {
  title: 'Components/FooterLinks',
  component: FooterLinks,
  decorators: [withWrapper],
  loaders: [withState(siteState())],
  tags: ['autodocs'],
  args: {
    title: 'Follow us',
  },
} satisfies Meta<typeof FooterLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The site's links under a headline, as a footer shows them. */
export const Default: Story = {};

/** Only the icons. */
export const WithoutTitle: Story = {
  args: { title: undefined },
};

/** Icons that stay still under the pointer. */
export const Still: Story = {
  args: { animate: false },
};

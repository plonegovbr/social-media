import type { Meta, StoryObj } from '@storybook/react';
import config from '@plone/volto/registry';

import SocialNetworkIcon from './SocialNetworkIcon';
import installNetworks from '../../config/networks';
import { withWrapper } from '../../stories/decorators';

installNetworks(config);

const meta = {
  title: 'Components/SocialNetworks/SocialNetworkIcon',
  component: SocialNetworkIcon,
  decorators: [withWrapper],
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'select',
      options: config
        .getUtilities({ type: 'socialNetwork' })
        .map((utility) => utility.method().id),
    },
    size: { control: 'text' },
    color: { control: 'color' },
    title: { control: 'text' },
    animate: { control: 'boolean' },
  },
  args: {
    id: 'github',
    title: 'GitHub',
  },
} satisfies Meta<typeof SocialNetworkIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 47px tall, in the colour of the text around it. */
export const Default: Story = {};

/** A smaller icon. */
export const Small: Story = {
  args: { size: '24px' },
};

/** An icon in a colour of its own. */
export const Coloured: Story = {
  args: { id: 'mastodon', title: 'Mastodon', color: '#6364ff' },
};

/** Without a title the icon is decoration, hidden from screen readers. */
export const Untitled: Story = {
  args: { title: undefined },
};

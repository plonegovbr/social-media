import type { Meta, StoryObj } from '@storybook/react';
import config from '@plone/volto/registry';

import SocialNetwork from './SocialNetwork';
import installNetworks from '../../config/networks';
import { withWrapper } from '../../stories/decorators';

installNetworks(config);

const meta = {
  title: 'Components/SocialNetworks/SocialNetwork',
  component: SocialNetwork,
  decorators: [withWrapper],
  tags: ['autodocs'],
  argTypes: {
    id: {
      name: 'Social Network ID',
      control: 'select',
      options: config
        .getUtilities({ type: 'socialNetwork' })
        .map((utility) => utility.method().id),
    },
    title: { name: 'Social Network Title', control: 'text' },
    href: { name: 'Target', control: 'text' },
    animate: { control: 'boolean' },
  },
} satisfies Meta<typeof SocialNetwork>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Facebook: Story = {
  args: {
    id: 'facebook',
    title: 'Facebook',
    href: 'https://www.facebook.com/Plone-Brasil-101606785972720',
  },
};

export const GitHub: Story = {
  args: {
    id: 'github',
    title: 'GitHub',
    href: 'https://github.com/plonegovbr',
  },
};

export const Instagram: Story = {
  args: {
    id: 'instagram',
    title: 'Instagram',
    href: 'https://www.instagram.com/plonebr/',
  },
};

export const X: Story = {
  args: {
    id: 'x',
    title: 'X',
    href: 'https://x.com/ploneorgbr',
  },
};

export const YouTube: Story = {
  args: {
    id: 'youtube',
    title: 'YouTube',
    href: 'https://www.youtube.com/playlist?list=PLGN9BI-OAQkTbVIJRPYpAs1K4hBdkLl10',
  },
};

/** The icon moves when the pointer is over it. */
export const Animated: Story = {
  args: { ...GitHub.args, animate: true },
};

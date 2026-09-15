import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import config from '@plone/volto/registry';

import SocialNetworks from './SocialNetworks';
import installNetworks from '../../config/networks';
import { withWrapper } from '../../stories/decorators';
import type { SocialLink, SocialNetworkInfo } from '../../types';

installNetworks(config);

/** A link to every registered network. */
const EVERY_NETWORK: SocialLink[] = config
  .getUtilities({ type: 'socialNetwork' })
  .map((utility) => {
    const { id, title } = utility.method() as SocialNetworkInfo;
    return {
      '@id': id,
      id,
      title,
      href: [{ '@id': `https://example.com/${id}` }],
    };
  });

const meta = {
  title: 'Components/SocialNetworks/SocialNetworks',
  component: SocialNetworks,
  decorators: [withWrapper],
  tags: ['autodocs'],
  args: {
    networks: EVERY_NETWORK,
    animate: false,
  },
} satisfies Meta<typeof SocialNetworks>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every network this add-on registers. */
export const AllNetworks: Story = {};

/** The icons move when the pointer is over them. */
export const Animated: Story = {
  args: { animate: true },
};

/** The icon colour comes from `--social-network-icon-color-main`. */
export const IconColor: Story = {
  render: (args) => (
    <div
      style={
        { '--social-network-icon-color-main': '#007eb1' } as React.CSSProperties
      }
    >
      <SocialNetworks {...args} />
    </div>
  ),
};

/** A link without a target is left out: only GitHub is shown here. */
export const WithoutTarget: Story = {
  args: {
    networks: [
      {
        id: 'github',
        title: 'GitHub',
        href: [{ '@id': 'https://github.com/plonegovbr' }],
      },
      { id: 'facebook', title: 'Facebook' },
    ],
  },
};

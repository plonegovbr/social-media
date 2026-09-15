import type { Meta, StoryObj } from '@storybook/react';
import config from '@plone/volto/registry';

import SocialLinksViewWidget from './SocialLinksViewWidget';
import installNetworks from '../../../config/networks';
import { SOCIAL_LINKS } from '../../../stories/fixtures';
import { withWrapper } from '../../../stories/decorators';

installNetworks(config);

const meta = {
  title: 'Components/Widgets/SocialLinksViewWidget',
  component: SocialLinksViewWidget,
  decorators: [withWrapper],
  tags: ['autodocs'],
  args: {
    value: SOCIAL_LINKS,
  },
} satisfies Meta<typeof SocialLinksViewWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A `social_links` field on a content view. */
export const Default: Story = {};

/** A field with no links renders nothing. */
export const Empty: Story = {
  args: { value: [] },
};

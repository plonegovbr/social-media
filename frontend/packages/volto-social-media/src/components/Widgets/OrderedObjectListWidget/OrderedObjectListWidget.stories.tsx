import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import OrderedObjectListWidget, {
  SocialLinksWidget,
} from './OrderedObjectListWidget';
import type { OrderedObjectListWidgetProps } from './OrderedObjectListWidget';
import { DND_LIBRARIES } from '../OrderedListTable/OrderedListTable';
import { SOCIAL_LINK_SCHEMA, SOCIAL_LINKS } from '../../../stories/fixtures';
import { withLazyLibraries, withWrapper } from '../../../stories/decorators';

const meta = {
  title: 'Components/Widgets/OrderedObjectListWidget',
  component: OrderedObjectListWidget,
  decorators: [withWrapper],
  tags: ['autodocs'],
  args: {
    id: 'social_links',
    title: 'Social links',
    value: SOCIAL_LINKS,
    schema: SOCIAL_LINK_SCHEMA,
    onChange: () => {},
  },
} satisfies Meta<typeof OrderedObjectListWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Render a widget that keeps the value it reports.
 *
 * @param Widget The widget.
 * @returns A story's render function.
 */
const keeping = (Widget: React.FC<OrderedObjectListWidgetProps>) =>
  function Render(args: OrderedObjectListWidgetProps) {
    const [value, setValue] = useState(args.value);
    return (
      <Widget
        {...args}
        value={value}
        onChange={(_id, next) => setValue(next)}
      />
    );
  };

/** Every field of the entry as a column, which is the default. */
export const Default: Story = {
  loaders: [withLazyLibraries(DND_LIBRARIES)],
  render: keeping(OrderedObjectListWidget),
};

/** The columns a backend picked with `widgetProps`. */
export const PickedColumns: Story = {
  ...Default,
  args: { columns: ['title', 'href'] },
};

/**
 * Registered as `social_media_object_list`: a link summarized by its network
 * and its title.
 */
export const SocialLinks: Story = {
  ...Default,
  render: keeping(SocialLinksWidget),
};

/** The Follow Us block's networks, where a network is all an entry has. */
export const Networks: Story = {
  ...Default,
  args: {
    title: 'Networks',
    columns: ['id'],
    schema: {
      title: 'Network',
      fieldsets: [{ id: 'default', title: 'Default', fields: ['id'] }],
      properties: { id: SOCIAL_LINK_SCHEMA.properties.id },
      required: ['id'],
    },
    value: SOCIAL_LINKS.map(({ '@id': id, id: network }) => ({
      '@id': id,
      id: network,
    })),
  },
  render: keeping(SocialLinksWidget),
};

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import OrderedListTable, { DND_LIBRARIES } from './OrderedListTable';
import { SOCIAL_LINK_SCHEMA, SOCIAL_LINKS } from '../../../stories/fixtures';
import { withLazyLibraries, withWrapper } from '../../../stories/decorators';

const meta = {
  title: 'Components/Widgets/OrderedListTable',
  component: OrderedListTable,
  decorators: [withWrapper],
  tags: ['autodocs'],
  args: {
    id: 'social_links',
    title: 'Social links',
    description: 'Where else this site can be found.',
    rows: SOCIAL_LINKS,
    schema: SOCIAL_LINK_SCHEMA,
    columns: ['id', 'title', 'href'],
    onChangeRows: () => {},
  },
} satisfies Meta<typeof OrderedListTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The table as an editor uses it: drag a row by its handle, edit or delete
 * one, or add one with the button beside the label. The story keeps what it
 * is given, where a form would keep it until saved.
 */
export const Default: Story = {
  loaders: [withLazyLibraries(DND_LIBRARIES)],
  render: function Render(args) {
    const [rows, setRows] = useState(args.rows);
    return <OrderedListTable {...args} rows={rows} onChangeRows={setRows} />;
  },
};

/** Fewer columns than the entry has fields: the dialog still has them all. */
export const SomeColumns: Story = {
  ...Default,
  args: { columns: ['id', 'title'] },
};

/** A list with nothing on it yet. */
export const Empty: Story = {
  ...Default,
  args: { rows: [] },
};

/** While the form cannot be edited. */
export const Disabled: Story = {
  args: { isDisabled: true },
  loaders: [withLazyLibraries(DND_LIBRARIES)],
};

/** Before the drag library has loaded: on the server, and for a moment after. */
export const BeforeTheDragLibrary: Story = {};

import type { Meta, StoryObj } from '@storybook/react';

import ConfirmModal from './ConfirmModal';
import { withWrapper } from '../../stories/decorators';

const meta = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  decorators: [withWrapper],
  tags: ['autodocs'],
  args: {
    open: true,
    header: 'GitHub',
    content:
      'Remove this entry from the list? It is gone once the form is saved.',
    onCancel: () => {},
    onConfirm: () => {},
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Deleting an entry from a list of social links. */
export const Delete: Story = {};

/** Not being asked. */
export const Closed: Story = { args: { open: false } };

/**
 * Asking before something destructive, in the page rather than over it.
 *
 * `window.confirm` blocks the whole browser, cannot be styled, reads as a
 * different application than the form around it, and a test has to stub a
 * global to reach the code behind it. Volto's own answer is a modal;
 * `ContentsDeleteModal` is the reference.
 *
 * The question is always the same shape: a heading, what is about to be lost,
 * and two buttons where the destructive one is the one that looks
 * destructive.
 * @module components/ConfirmModal
 */
import React from 'react';
import { Button, Confirm } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  cancel: { id: 'Cancel', defaultMessage: 'Cancel' },
  confirm: { id: 'Delete', defaultMessage: 'Delete' },
});

export interface ConfirmModalProps {
  /** Whether the question is being asked. */
  open: boolean;
  /** The heading, which names the thing rather than the action. */
  header: string;
  /** What is about to happen, and what cannot be undone about it. */
  content: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  header,
  content,
  onCancel,
  onConfirm,
}) => {
  const intl = useIntl();

  return (
    <Confirm
      open={open}
      header={header}
      content={content}
      cancelButton={
        <Button data-action="cancel">
          {intl.formatMessage(messages.cancel)}
        </Button>
      }
      confirmButton={
        <Button negative data-action="confirm">
          {intl.formatMessage(messages.confirm)}
        </Button>
      }
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default ConfirmModal;

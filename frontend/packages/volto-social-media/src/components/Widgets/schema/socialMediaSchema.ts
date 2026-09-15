import type { BlockEditProps } from '@plone/types';
import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import { networkChoices } from '../../../vocabularies/networks';

const messages = defineMessages({
  network: {
    id: 'Network',
    defaultMessage: 'Network',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  titleDescription: {
    id: "Leave empty to use the network's name.",
    defaultMessage: "Leave empty to use the network's name.",
  },
  item: {
    id: 'Link',
    defaultMessage: 'Link',
  },
  addLink: {
    id: 'Add social media profile',
    defaultMessage: 'Add link',
  },
  Target: {
    id: 'Target',
    defaultMessage: 'Target',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
});

/**
 * One social link, as the `social_media_object_list` widget edits it.
 *
 * The network is picked from the `socialNetwork` utilities. The title may be
 * left empty: the widget stores the network's name in its place.
 */
export function socialMediaSchema({
  props,
  intl,
}: {
  props: BlockEditProps;
  intl: IntlShape;
}) {
  return {
    title: intl.formatMessage(messages.item),
    addMessage: intl.formatMessage(messages.addLink),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['id', 'title', 'href'],
      },
    ],

    properties: {
      id: {
        title: intl.formatMessage(messages.network),
        widget: 'select',
        choices: networkChoices(),
        noValueOption: false,
      },
      title: {
        title: intl.formatMessage(messages.title),
        description: intl.formatMessage(messages.titleDescription),
      },
      href: {
        title: intl.formatMessage(messages.Target),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', '@type'],
        allowExternals: true,
      },
    },
    required: ['id', 'href'],
  };
}

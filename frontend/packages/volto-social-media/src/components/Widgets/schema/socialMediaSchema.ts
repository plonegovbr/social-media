import type { BlockEditProps } from '@plone/types';
import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import config from '@plone/volto/registry';
import type { ConfigType } from '@plone/registry';

const messages = defineMessages({
  network: {
    id: 'Network',
    defaultMessage: 'Network',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
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

function getAvailableNetworks(config: ConfigType) {
  const allNetworks = config.getUtilities({ type: 'socialNetwork' });
  return Object.entries(allNetworks).map(([name, networkUtility]) => {
    const networkInfo = networkUtility.method();
    return [networkInfo.id, networkInfo.title];
  });
}

export function socialMediaSchema({
  props,
  intl,
}: {
  props: BlockEditProps;
  intl: IntlShape;
}) {
  const availableNetworks = getAvailableNetworks(config);
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
        choices: availableNetworks,
        noValueOption: false,
      },
      title: {
        title: intl.formatMessage(messages.title),
      },
      href: {
        title: intl.formatMessage(messages.Target),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', '@type'],
        allowExternals: true,
      },
    },
    required: ['id', 'title', 'href'],
  };
}

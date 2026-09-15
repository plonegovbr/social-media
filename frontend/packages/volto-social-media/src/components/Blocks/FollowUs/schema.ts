import type { IntlShape } from 'react-intl';
import type { JSONSchema } from '@plone/types';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { messages } from '../../../messages';
import type { SocialLink } from '../../../types';
import { networkTitle } from '../../../vocabularies/networks';

/** The networks an editor can pick, as `[token, label]` choices. */
type NetworkChoices = () => [string, string][];

const NetworkSchema = ({
  intl,
  allowedNetworks,
}: {
  intl: IntlShape;
  allowedNetworks: NetworkChoices;
}): JSONSchema => ({
  title: intl.formatMessage(messages.Network),
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['id'],
    },
  ],
  properties: {
    id: {
      title: intl.formatMessage(messages.NetworkTitle),
      widget: 'select',
      choices: allowedNetworks(),
      noValueOption: false,
    },
  },
  required: ['id'],
});

export type FollowUsSchemaProps = {
  intl: IntlShape;
  /** The site's links, which are the networks an editor can pick from. */
  networks?: SocialLink[];
};

export const followUsSchema = (props: FollowUsSchemaProps): JSONSchema => {
  const { intl, networks } = props;
  const allowedNetworks: NetworkChoices = () => {
    const allNetworks = networks || [];
    return allNetworks.map((item) => [
      item.id,
      item.title || networkTitle(item.id),
    ]);
  };
  const schema: JSONSchema = {
    title: intl.formatMessage(messages.FollowUsBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'animate'],
      },
      {
        id: 'networks',
        title: 'Filter Networks',
        fields: ['allowedNetworks'],
      },
    ],

    properties: {
      title: {
        title: intl.formatMessage(messages.FollowUsTitle),
        default: '',
      },
      animate: {
        title: intl.formatMessage(messages.FollowUsAnimateIcon),
        type: 'boolean',
        default: false,
      },
      allowedNetworks: {
        title: intl.formatMessage(messages.FollowUsNetworks),
        widget: 'social_media_object_list',
        // A network is all an entry here has; the widget's default columns
        // also ask for a title.
        columns: ['id'],
        schema: NetworkSchema({ intl, allowedNetworks }),
        default: [],
      },
    },
    required: [],
  };

  addStyling({ schema, intl });

  schema.properties.styles.schema.properties['align:noprefix'] = {
    widget: 'blockAlignment',
    title: intl.formatMessage(messages.align),
    default: 'left',
  };
  schema.properties.styles.schema.fieldsets[0].fields = ['align:noprefix'];

  return schema;
};

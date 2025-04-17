import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { messages } from '../../../messages';

const NetworkSchema = ({ intl, allowedNetworks }) => ({
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
      choices: allowedNetworks(),
      noValueOption: false,
    },
  },
  required: ['id'],
});

export const followUsSchema = (props) => {
  const { intl, networks } = props;
  const allowedNetworks = () => {
    const allNetworks = networks || [];
    return allNetworks.map((item) => [item.id, item.title]);
  };
  const schema = {
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
        title: props.intl.formatMessage(messages.FollowUsTitle),
        default: '',
      },
      animate: {
        title: props.intl.formatMessage(messages.FollowUsAnimateIcon),
        type: 'boolean',
        default: false,
      },
      allowedNetworks: {
        title: intl.formatMessage(messages.FollowUsNetworks),
        widget: 'object_list',
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

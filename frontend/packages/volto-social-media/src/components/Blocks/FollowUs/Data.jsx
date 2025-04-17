import React from 'react';
import { followUsSchema } from './schema';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { useIntl, defineMessages } from 'react-intl';
import shareSVG from '@plone/volto/icons/share.svg';

const messages = defineMessages({
  FollowUsBlock: {
    id: 'Follow Us',
    defaultMessage: 'Follow Us',
  },
});

const FollowUsData = (props) => {
  const { data, block, onChangeBlock, schemaEnhancer, networks } = props;
  const intl = useIntl();
  const schema = schemaEnhancer
    ? schemaEnhancer(followUsSchema({ ...props, intl, networks }), props)
    : followUsSchema({ ...props, intl, networks });
  return (
    <BlockDataForm
      schema={schema}
      icon={<Icon size="24px" name={shareSVG} />}
      title={intl.formatMessage(messages.FollowUsBlock)}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      fieldIndex={data.index}
      block={block}
    />
  );
};

export default FollowUsData;

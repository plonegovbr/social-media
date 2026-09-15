import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import shareSVG from '@plone/volto/icons/share.svg';
import { followUsSchema } from './schema';
import type { FollowUsBlockData, SocialLink } from '../../../types';

const messages = defineMessages({
  FollowUsBlock: {
    id: 'Follow Us',
    defaultMessage: 'Follow Us',
  },
});

type Schema = ReturnType<typeof followUsSchema>;

export interface FollowUsDataProps {
  data: FollowUsBlockData & { index?: number };
  block: string;
  onChangeBlock: (block: string, data: FollowUsBlockData) => void;
  schemaEnhancer?: (schema: Schema, props: FollowUsDataProps) => Schema;
  /** The site's links, which are the networks an editor can pick from. */
  networks: SocialLink[];
  [key: string]: unknown;
}

const FollowUsData: React.FC<FollowUsDataProps> = (props) => {
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
      onChangeField={(id: string, value: unknown) => {
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

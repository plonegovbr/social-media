import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import config from '@plone/volto/registry';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import shareSVG from '@plone/volto/icons/share.svg';
import { followUsSchema, type FollowUsSchemaProps } from './schema';
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
  const {
    data,
    block,
    onChangeBlock,
    schemaEnhancer,
    navRoot,
    contentType,
    blocksErrors,
  } = props;
  const intl = useIntl();
  // The schema comes from the block configuration, as it does for the
  // `@blocks-schema` endpoint, so a customized `blockSchema` reaches both.
  // The sidebar also passes the site's links, which the endpoint cannot.
  const blockSchema = config.blocks.blocksConfig.followUsBlock
    .blockSchema as unknown as (props: FollowUsSchemaProps) => Schema;
  const schema = schemaEnhancer
    ? schemaEnhancer(blockSchema({ ...props, intl }), props)
    : blockSchema({ ...props, intl });
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
      onChangeBlock={onChangeBlock}
      formData={data}
      fieldIndex={data.index}
      block={block}
      navRoot={navRoot}
      contentType={contentType}
      errors={blocksErrors}
    />
  );
};

export default FollowUsData;

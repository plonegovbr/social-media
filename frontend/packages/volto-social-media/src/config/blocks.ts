import type { ConfigType } from '@plone/registry';
import type { BlockConfigBase } from '@plone/types';
/// Follow US
import FollowUsBlockEdit from '../components/Blocks/FollowUs/Edit';
import FollowUsBlockView from '../components/Blocks/FollowUs/View';
import { followUsSchema } from '../components/Blocks/FollowUs/schema';
import shareSVG from '@plone/volto/icons/share.svg';

declare module '@plone/types' {
  export interface BlocksConfigData {
    followUsBlock: BlockConfigBase;
  }
}

export default function install(config: ConfigType) {
  // Blocks
  config.blocks.blocksConfig.followUsBlock = {
    id: 'followUsBlock',
    title: 'Follow Us Block',
    group: 'common',
    category: 'common',
    icon: shareSVG,
    blockSchema: followUsSchema,
    view: FollowUsBlockView,
    edit: FollowUsBlockEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: false,
  };

  return config;
}

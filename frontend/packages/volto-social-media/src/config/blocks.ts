import type { ConfigType } from '@plone/registry';
import type { BlockConfigBase } from '@plone/types';
/// Follow US
import FollowUsBlockEdit from '../components/Blocks/FollowUs/Edit';
import FollowUsBlockView from '../components/Blocks/FollowUs/View';
import { followUsSchema } from '../components/Blocks/FollowUs/schema';
import shareSVG from '@plone/volto/icons/share.svg';

// `followUsBlock` is added to `BlocksConfigData` in `types/blocks`.

export default function install(config: ConfigType) {
  // Blocks
  config.blocks.blocksConfig.followUsBlock = {
    id: 'followUsBlock',
    title: 'Follow Us Block',
    group: 'common',
    category: 'common',
    icon: shareSVG,
    // `@plone/types` describes what Volto hands every block; the schema and
    // the components type what the Follow Us block itself reads.
    blockSchema: followUsSchema as unknown as BlockConfigBase['blockSchema'],
    view: FollowUsBlockView as unknown as BlockConfigBase['view'],
    edit: FollowUsBlockEdit as unknown as BlockConfigBase['edit'],
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: false,
  };

  return config;
}

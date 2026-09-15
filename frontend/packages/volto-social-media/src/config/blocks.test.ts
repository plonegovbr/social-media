import { describe, expect, it } from 'vitest';

import install from './blocks';
import Edit from '../components/Blocks/FollowUs/Edit';
import View from '../components/Blocks/FollowUs/View';
import { followUsSchema } from '../components/Blocks/FollowUs/schema';

/**
 * Install the blocks into a configuration holding only some blocks.
 *
 * @param blocksConfig The blocks registered before.
 * @returns The blocks afterwards.
 */
function configured(blocksConfig: Record<string, unknown> = {}) {
  const config: any = { blocks: { blocksConfig } };
  install(config);
  return config.blocks.blocksConfig;
}

describe('install', () => {
  it('registers the Follow Us block', () => {
    const block = configured().followUsBlock;

    expect(block).toMatchObject({
      id: 'followUsBlock',
      title: 'Follow Us Block',
      group: 'common',
      restricted: false,
      mostUsed: false,
      sidebarTab: 1,
    });
    expect(block.view).toBe(View);
    expect(block.edit).toBe(Edit);
    expect(block.blockSchema).toBe(followUsSchema);
  });

  it('keeps the blocks already registered', () => {
    const slate = { id: 'slate' };

    expect(configured({ slate }).slate).toBe(slate);
  });
});

import { describe, expect, it } from 'vitest';

import { testIntl } from '../../../testing';
import { followUsSchema } from './schema';
import { SOCIAL_LINKS } from '../../../stories/fixtures';

describe('followUsSchema', () => {
  const schema = followUsSchema({ intl: testIntl, networks: SOCIAL_LINKS });

  it('puts the headline and the animation first, the networks after', () => {
    expect(
      schema.fieldsets.slice(0, 2).map(({ id, fields }) => [id, fields]),
    ).toEqual([
      ['default', ['title', 'animate']],
      ['networks', ['allowedNetworks']],
    ]);
  });

  it("offers the site's links as the networks to pick", () => {
    expect(
      schema.properties.allowedNetworks.schema.properties.id.choices,
    ).toEqual([
      ['github', 'GitHub'],
      ['mastodon', 'Mastodon'],
    ]);
  });

  it('names a link without a title for its network', () => {
    const untitled = followUsSchema({
      intl: testIntl,
      networks: [{ id: 'github' }],
    });

    expect(
      untitled.properties.allowedNetworks.schema.properties.id.choices,
    ).toEqual([['github', 'github']]);
  });

  it('offers nothing to pick without links', () => {
    const empty = followUsSchema({ intl: testIntl });

    expect(
      empty.properties.allowedNetworks.schema.properties.id.choices,
    ).toEqual([]);
  });

  it('edits the networks with the social links widget, one column', () => {
    expect(schema.properties.allowedNetworks).toMatchObject({
      widget: 'social_media_object_list',
      columns: ['id'],
      default: [],
    });
  });

  it('does not animate by default', () => {
    expect(schema.properties.animate).toMatchObject({
      type: 'boolean',
      default: false,
    });
  });

  it('aligns the block, left by default', () => {
    const styles = schema.properties.styles.schema;

    expect(styles.fieldsets[0].fields).toEqual(['align:noprefix']);
    expect(styles.properties['align:noprefix']).toMatchObject({
      widget: 'blockAlignment',
      default: 'left',
    });
  });
});

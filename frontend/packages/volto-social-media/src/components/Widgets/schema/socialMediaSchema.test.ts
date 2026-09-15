import { beforeAll, describe, expect, it } from 'vitest';

import config from '@plone/volto/registry';

import { testIntl } from '../../../testing';
import { socialMediaSchema } from './socialMediaSchema';
import installNetworks from '../../../config/networks';

let schema: ReturnType<typeof socialMediaSchema>;

beforeAll(() => {
  installNetworks(config as any);
  schema = socialMediaSchema({ props: {} as any, intl: testIntl });
});

describe('socialMediaSchema', () => {
  it('describes a link by its network, title and target, all required', () => {
    expect(schema.title).toBe('Link');
    expect(schema.fieldsets[0].fields).toEqual(['id', 'title', 'href']);
    expect(schema.required).toEqual(['id', 'title', 'href']);
  });

  it('offers every registered network, by name', () => {
    const choices = schema.properties.id.choices;

    expect(choices).toHaveLength(25);
    expect(choices).toContainEqual(['github', 'GitHub']);
    expect(choices).toContainEqual(['x', 'X (Twitter)']);
    expect(schema.properties.id.noValueOption).toBe(false);
  });

  it('picks the target in the object browser, external links allowed', () => {
    expect(schema.properties.href).toMatchObject({
      widget: 'object_browser',
      mode: 'link',
      allowExternals: true,
    });
  });
});

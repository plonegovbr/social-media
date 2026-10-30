import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import config from '@plone/volto/registry';

import { testIntl } from '../../../testing';
import install from '../../../config/blocks';

const here = path.dirname(fileURLToPath(import.meta.url));
const markdown = fs.readFileSync(path.join(here, 'docs.block.md'), 'utf8');
const frontmatter = markdown.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
const body = markdown.slice(markdown.indexOf('---', 3) + 3);

// The block as the endpoint sees it: its registry entry, with the schema
// resolved the way the endpoint resolves it, from `intl` and the data alone.
install(config as any);
const block = (config as any).blocks.blocksConfig.followUsBlock;
const data = { '@type': block.id };
const schema = block.blockSchema({ data, intl: testIntl, props: { data } });
const fields = Object.keys(schema.properties);
const examples = [...body.matchAll(/```json\n([\s\S]*?)\n```/g)].map(
  ([, json]) => JSON.parse(json),
);

describe('Follow Us block documentation', () => {
  it('names the block by the id the registry keys it by', () => {
    expect(frontmatter).toBe(`block: ${block.id}`);
  });

  it('starts with a summary, not a heading', () => {
    expect(body.trimStart().startsWith('#')).toBe(false);
  });

  it('uses only ### headings below the summary', () => {
    expect(body.match(/^#{1,2} /m)).toBeNull();
  });

  it('explains every field of the schema', () => {
    for (const field of fields) {
      expect(body).toContain(`- \`${field}\`: `);
    }
  });

  it('only has examples that are data for this block', () => {
    const known = ['@type', ...fields];
    for (const example of examples) {
      expect(example['@type']).toBe(block.id);
      expect(known).toEqual(expect.arrayContaining(Object.keys(example)));
    }
  });

  it('shows every field in at least one example', () => {
    const used = new Set(examples.flatMap((example) => Object.keys(example)));
    for (const field of fields) {
      expect(used.has(field)).toBe(true);
    }
  });

  it('resolves its schema with the endpoint arguments alone', () => {
    expect(
      schema.properties.allowedNetworks.schema.properties.id.choices,
    ).toEqual([]);
  });
});

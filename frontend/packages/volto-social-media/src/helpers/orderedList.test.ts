import { describe, expect, it } from 'vitest';

import {
  cellText,
  dialogSchema,
  movedIds,
  movedRows,
  newRowId,
  rowKeys,
  withRowIds,
} from './orderedList';
import type { ItemSchema } from './orderedList';

describe('movedIds', () => {
  const ids = ['a', 'b', 'c'];

  it('moves a key down into the place it was dropped in', () => {
    expect(movedIds(ids, 'a', 'c')).toEqual(['b', 'c', 'a']);
  });

  it('moves a key up into the place it was dropped in', () => {
    expect(movedIds(ids, 'c', 'a')).toEqual(['c', 'a', 'b']);
  });

  it('swaps neighbours', () => {
    expect(movedIds(ids, 'b', 'a')).toEqual(['b', 'a', 'c']);
  });

  it('changes nothing for a key dropped where it started', () => {
    expect(movedIds(ids, 'b', 'b')).toBeNull();
  });

  it('changes nothing for a key dropped outside the list', () => {
    expect(movedIds(ids, 'b', null)).toBeNull();
  });

  it('changes nothing for a key the list does not have', () => {
    expect(movedIds(ids, 'nobody', 'a')).toBeNull();
    expect(movedIds(ids, 'a', 'nobody')).toBeNull();
  });

  it('leaves the list it was given alone', () => {
    const given = [...ids];

    movedIds(given, 'a', 'c');

    expect(given).toEqual(ids);
  });
});

describe('rowKeys', () => {
  it('keys an entry by its @id', () => {
    expect(rowKeys([{ '@id': 'a' }, { '@id': 'b' }])).toEqual(['a', 'b']);
  });

  it('keys an entry without one by its position', () => {
    expect(rowKeys([{ title: 'x' }, { title: 'y' }])).toEqual(['#0', '#1']);
  });

  it('keys a repeated @id by position, so no two rows share a key', () => {
    expect(rowKeys([{ '@id': 'a' }, { '@id': 'a' }])).toEqual(['a', '#1']);
  });
});

describe('movedRows', () => {
  const rows = [{ '@id': 'a' }, { '@id': 'b' }, { '@id': 'c' }];

  it("puts the dragged entry in the target's place", () => {
    expect(movedRows(rows, 'c', 'a')).toEqual([
      { '@id': 'c' },
      { '@id': 'a' },
      { '@id': 'b' },
    ]);
  });

  it('moves entries keyed by position', () => {
    expect(movedRows([{ title: 'x' }, { title: 'y' }], '#1', '#0')).toEqual([
      { title: 'y' },
      { title: 'x' },
    ]);
  });

  it('is null for a drop that changes nothing', () => {
    expect(movedRows(rows, 'b', 'b')).toBeNull();
    expect(movedRows(rows, 'b', null)).toBeNull();
  });
});

describe('newRowId', () => {
  it('is a version 4 UUID', () => {
    expect(newRowId()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });

  it('is different every time', () => {
    expect(newRowId()).not.toBe(newRowId());
  });
});

describe('withRowIds', () => {
  it('gives an entry without an @id one', () => {
    const [row] = withRowIds([{ title: 'Blog' }]);

    expect(row.title).toBe('Blog');
    expect(typeof row['@id']).toBe('string');
  });

  it('leaves an entry that has one as it was', () => {
    const row = { '@id': 'a', title: 'Blog' };

    expect(withRowIds([row])[0]).toBe(row);
  });
});

describe('dialogSchema', () => {
  // Strings stand in for widget components: only which one is kept matters.
  const widgets = {
    id: { id: 'short-name' },
    choices: 'select',
    default: 'text',
  };
  const schema: ItemSchema = {
    title: 'Link',
    fieldsets: [{ id: 'default', title: 'Default', fields: ['id', 'title'] }],
    properties: {
      id: { title: 'Network', choices: [['github', 'GitHub']] },
      title: { title: 'Title', widgets: { own: true } },
    },
    required: ['id'],
  };

  it('gives a field the widgets without the mapping by field name', () => {
    const { properties } = dialogSchema(schema, widgets);

    expect(properties.id.widgets).toEqual({
      id: {},
      choices: 'select',
      default: 'text',
    });
    expect(properties.id).toMatchObject(schema.properties.id);
  });

  it('keeps the widgets a field names itself', () => {
    expect(dialogSchema(schema, widgets).properties.title.widgets).toEqual({
      own: true,
    });
  });

  it('keeps the rest of the schema, and changes nothing it was given', () => {
    const result = dialogSchema(schema, widgets);

    expect(result.title).toBe('Link');
    expect(result.fieldsets).toBe(schema.fieldsets);
    expect(result.required).toBe(schema.required);
    expect(schema.properties.id).not.toHaveProperty('widgets');
    expect(widgets.id).toEqual({ id: 'short-name' });
  });
});

describe('cellText', () => {
  const network = {
    title: 'Network',
    choices: [
      ['github', 'GitHub'],
      ['mastodon', 'Mastodon'],
    ],
  };

  it('is empty for a value that is not there', () => {
    expect(cellText(undefined, undefined)).toBe('');
    expect(cellText(undefined, null)).toBe('');
    expect(cellText(undefined, '')).toBe('');
  });

  it('shows a choice by its label', () => {
    expect(cellText(network, 'github')).toBe('GitHub');
  });

  it('shows a token no choice has as the token', () => {
    expect(cellText(network, 'myspace')).toBe('myspace');
  });

  it('shows a picked link by its title, or its @id without one', () => {
    // What the object browser stores for a link: a list of one object.
    expect(
      cellText(undefined, [{ '@id': 'https://x.org', title: 'x.org' }]),
    ).toBe('x.org');
    expect(cellText(undefined, [{ '@id': 'https://x.org' }])).toBe(
      'https://x.org',
    );
  });

  it('joins a list', () => {
    expect(cellText(network, ['github', 'mastodon'])).toBe('GitHub, Mastodon');
  });

  it('shows anything else as text', () => {
    expect(cellText(undefined, 3)).toBe('3');
  });
});

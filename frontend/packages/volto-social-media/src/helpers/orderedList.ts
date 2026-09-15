/**
 * The entries of the ordered object list widget, as plain functions.
 *
 * The table drags rows by key, and a key has to survive a drag. An entry
 * carries an `@id` for that -- the contract Volto's own `object_list` widget
 * writes -- and an entry without one is keyed by its position. None of this
 * knows about the drag library or about React.
 * @module helpers/orderedList
 */

/** One entry, as the table edits it: a record of the item schema's fields. */
export type Row = Record<string, unknown>;

/**
 * What an entry is, in the shape Volto's forms read.
 *
 * `title` names one entry -- "Link" -- and is what the dialog and the add
 * button say.
 */
export type ItemSchema = {
  title?: string;
  fieldsets: { id: string; title: string; fields: string[] }[];
  properties: Record<string, Record<string, any>>;
  required: string[];
};

/**
 * The keys after one has been dropped in another's place.
 *
 * @param ids Every key, in the order the list shows them.
 * @param moved The key that was dragged.
 * @param target The key whose place it was dropped in, or `null` when it was
 *   dropped outside the list.
 * @returns The new order, or `null` when the drop changes nothing: dropped
 *   where it started, dropped outside the list, or naming a key the list does
 *   not have.
 */
export function movedIds(
  ids: string[],
  moved: string,
  target: string | null,
): string[] | null {
  const from = ids.indexOf(moved);
  const to = target === null ? -1 : ids.indexOf(target);
  if (from < 0 || to < 0 || from === to) {
    return null;
  }
  const next = [...ids];
  next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

/**
 * The key each row drags by.
 *
 * @param rows The entries, in order.
 * @returns One key per entry: its `@id` when it has one no earlier entry
 *   already used, and its position otherwise. A position key starts with `#`,
 *   which no `@id` this package writes does.
 */
export function rowKeys(rows: Row[]): string[] {
  const seen = new Set<string>();
  return rows.map((row, index) => {
    const id = row['@id'];
    if (typeof id === 'string' && id && !seen.has(id)) {
      seen.add(id);
      return id;
    }
    return `#${index}`;
  });
}

/**
 * The entries after one has been dropped in another's place.
 *
 * @param rows The entries, in order.
 * @param moved The key that was dragged.
 * @param target The key whose place it was dropped in, or `null` when it was
 *   dropped outside the list.
 * @returns The new order, or `null` when the drop changes nothing.
 */
export function movedRows(
  rows: Row[],
  moved: string,
  target: string | null,
): Row[] | null {
  const keys = rowKeys(rows);
  const order = movedIds(keys, moved, target);
  return order ? order.map((key) => rows[keys.indexOf(key)]) : null;
}

/**
 * A random id for a new entry, as a version 4 UUID.
 *
 * Built from `crypto.getRandomValues` rather than `crypto.randomUUID`, which a
 * browser only offers on a secure origin: a site served over plain HTTP would
 * otherwise fail to add an entry at all.
 *
 * @returns The id.
 */
export function newRowId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join('-');
}

/**
 * The entries, each carrying an `@id`.
 *
 * @param rows The entries, in order.
 * @returns The same entries, with an `@id` given to each one that had none.
 *   An entry that already has one is returned as it was.
 */
export function withRowIds(rows: Row[]): Row[] {
  return rows.map((row) =>
    typeof row['@id'] === 'string' && row['@id']
      ? row
      : { '@id': newRowId(), ...row },
  );
}

/**
 * The item schema, as the entry dialog renders it.
 *
 * Volto's `Field` picks a widget by the field's name before anything else, and
 * `config.widgets.id` maps some names to widgets of their own: a field named
 * `id` gets the short name widget, whatever its `widget` or `choices` say.
 * `ModalForm` names each field for its key, so a social link's network -- its
 * `id` -- would be typed rather than picked. `object_list` never meets this,
 * as its fields are named for their position, so each field is given the
 * widgets without the mapping by name, and a schema written for `object_list`
 * renders the same in the dialog.
 *
 * @param schema The item schema.
 * @param widgets The widgets, as `config.widgets` holds them.
 * @returns The schema, each field carrying those widgets unless it names its
 *   own.
 */
export function dialogSchema(schema: ItemSchema, widgets: object): ItemSchema {
  const unnamed = { ...widgets, id: {} };
  return {
    ...schema,
    properties: Object.fromEntries(
      Object.entries(schema.properties).map(([name, property]) => [
        name,
        { widgets: unnamed, ...property },
      ]),
    ),
  };
}

/**
 * What a table cell shows for one field of an entry.
 *
 * @param property The field, as the item schema describes it.
 * @param value The entry's value for it.
 * @returns The label of a choice rather than its token; for a list, its
 *   entries joined by commas; for an object -- a link picked in the object
 *   browser is one -- its title, falling back to its `@id`; and the value as
 *   text otherwise. Empty for a value that is not there.
 */
export function cellText(
  property: Record<string, any> | undefined,
  value: unknown,
): string {
  if (value === undefined || value === null || value === '') {
    return '';
  }
  if (Array.isArray(value)) {
    return value
      .map((entry) => cellText(property, entry))
      .filter(Boolean)
      .join(', ');
  }
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return String(record.title || record['@id'] || '');
  }
  const choice = Array.isArray(property?.choices)
    ? (property.choices as [unknown, unknown][]).find(
        ([token]) => token === value,
      )
    : undefined;
  return String(choice ? choice[1] : value);
}

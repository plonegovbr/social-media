/**
 * An ordered list of objects, edited as a table.
 *
 * Volto's `object_list` widget edits the same value -- a JSON list of objects
 * an item schema describes -- as a stack of accordions, which shows one entry
 * at a time. This one shows every entry as a row of the columns it is told to
 * show, and opens the whole entry in a dialog.
 *
 * **The item schema** is found the way `object_list` finds it, so a field
 * written for that widget works here unchanged: a `schemaName` naming a
 * registered `schema` utility, or a `schema` prop, either of them a schema or
 * a function returning one. A schema without fieldsets is ignored rather than
 * rendered, so a list whose schema cannot be found still shows its rows
 * instead of taking the whole form down with it.
 *
 * **The columns** are the `columns` prop, a list of the item schema's field
 * names. Without one, every field is a column. A backend picks them through
 * `widgetProps`:
 * `frontendOptions={"widget": "social_media_object_list",
 * "widgetProps": {"schemaName": "socialMedia", "columns": ["id", "title"]}}`.
 *
 * **Every entry is given an `@id`**, which `object_list` writes too: the rows
 * drag by it, and a value edited here stays one `object_list` can edit.
 * @module components/Widgets/OrderedObjectListWidget
 */
import React from 'react';
import { useIntl } from 'react-intl';
import type { IntlShape } from 'react-intl';

import config from '@plone/volto/registry';

import OrderedListTable from '../OrderedListTable/OrderedListTable';
import type { CellRenderer } from '../OrderedListTable/OrderedListTable';
import SocialNetworkIcon from '../../SocialNetworkIcon/SocialNetworkIcon';
import { withRowIds } from '../../../helpers/orderedList';
import type { ItemSchema, Row } from '../../../helpers/orderedList';
import { getNetwork, networkTitle } from '../../../vocabularies/networks';

type SchemaSource =
  | ItemSchema
  | ((args: Record<string, unknown>) => ItemSchema);

export type OrderedObjectListWidgetProps = {
  id: string;
  title: string;
  value?: Row[] | null;
  /** The item schema, or a function building it. */
  schema?: SchemaSource;
  /** The name of a registered `schema` utility building the item schema. */
  schemaName?: string;
  /** The item schema's fields shown as columns, in order. */
  columns?: string[];
  /** How a column's cells render, by field name. Other columns show text. */
  cells?: Record<string, CellRenderer>;
  /** Completes the entries before they are reported, given the item schema. */
  prepareRows?: (rows: Row[], schema: ItemSchema) => Row[];
  onChange: (id: string, value: Row[]) => void;
  [key: string]: unknown;
};

/** What a list with no usable item schema is edited with: nothing. */
const NO_FIELDS: ItemSchema = {
  fieldsets: [{ id: 'default', title: 'Default', fields: [] }],
  properties: {},
  required: [],
};

/**
 * The item schema for a widget's props.
 *
 * A function is called with the widget's props spread, as `object_list` calls
 * it, and also with `props` and `intl` as keys, which is how this package's
 * `socialMedia` schema utility reads them.
 *
 * @param props The widget's props.
 * @param intl The current locale's formatter.
 * @returns The registered utility's schema, else the `schema` prop's, else a
 *   schema with no fields.
 */
export function resolveItemSchema(
  props: OrderedObjectListWidgetProps,
  intl: IntlShape,
): ItemSchema {
  const registered = props.schemaName
    ? config.getUtility({ type: 'schema', name: props.schemaName })?.method
    : undefined;
  const source = (registered ?? props.schema) as SchemaSource | undefined;
  const schema =
    typeof source === 'function' ? source({ ...props, props, intl }) : source;
  return schema && Array.isArray(schema.fieldsets) ? schema : NO_FIELDS;
}

/**
 * The columns a table shows.
 *
 * @param schema The item schema.
 * @param columns The field names asked for, if any.
 * @returns Those names, or every field in the schema when none were asked for.
 */
export function columnsOf(schema: ItemSchema, columns?: string[]): string[] {
  return columns?.length
    ? columns
    : schema.fieldsets.flatMap((fieldset) => fieldset.fields);
}

const OrderedObjectListWidget: React.FC<OrderedObjectListWidgetProps> = (
  props,
) => {
  const { id, value, columns, prepareRows, onChange, ...rest } = props;
  const intl = useIntl();
  const schema = resolveItemSchema(props, intl);

  return (
    <OrderedListTable
      {...rest}
      id={id}
      rows={value ?? []}
      schema={schema}
      columns={columnsOf(schema, columns)}
      onChangeRows={(rows) =>
        onChange(id, withRowIds(prepareRows ? prepareRows(rows, schema) : rows))
      }
    />
  );
};

/** What a social link is summarized by: its network, and its title. */
export const SOCIAL_LINK_COLUMNS = ['id', 'title'];

/**
 * A link's network, as its row shows it: the network's icon, named with the
 * network's title.
 *
 * @param value The network's token.
 * @returns The icon, or the token as text for a network no utility is
 *   registered for, which has no icon to draw.
 */
export const NetworkCell: CellRenderer = (value) => {
  const network = typeof value === 'string' ? getNetwork(value) : undefined;
  if (!network) {
    return typeof value === 'string' ? value : '';
  }
  return (
    <SocialNetworkIcon id={network.id} title={network.title} size="24px" />
  );
};

/** The columns a social link renders with more than text. */
export const SOCIAL_LINK_CELLS: Record<string, CellRenderer> = {
  id: NetworkCell,
};

/**
 * The entries, each titled.
 *
 * @param rows The entries, in order.
 * @param schema The item schema.
 * @returns The same entries, with an entry whose title is empty given its
 *   network's title. Returned as they were when the schema has no `title`
 *   field, as the Follow Us block's networks have not.
 */
export function withNetworkTitles(rows: Row[], schema: ItemSchema): Row[] {
  if (!schema.properties.title) {
    return rows;
  }
  return rows.map((row) => {
    const title = typeof row.title === 'string' ? row.title.trim() : '';
    return title || typeof row.id !== 'string' || !row.id
      ? row
      : { ...row, title: networkTitle(row.id) };
  });
}

/**
 * The social links widget, registered as `social_media_object_list`.
 *
 * `plonegovbr.socialmedia` asks for that widget, with the `socialMedia` schema
 * name, on the `social_links` field of its behaviors. A link is recognised by
 * its network and its title, so those are the columns, the network shown by
 * its icon; the target is one click away, in the dialog. A `columns` the
 * backend sends still wins. A link saved without a title is given its
 * network's.
 */
export const SocialLinksWidget: React.FC<OrderedObjectListWidgetProps> = (
  props,
) => (
  <OrderedObjectListWidget
    columns={SOCIAL_LINK_COLUMNS}
    cells={SOCIAL_LINK_CELLS}
    prepareRows={withNetworkTitles}
    {...props}
  />
);

export default OrderedObjectListWidget;

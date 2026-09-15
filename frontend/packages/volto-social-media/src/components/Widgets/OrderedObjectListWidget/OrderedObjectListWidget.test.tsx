import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '../../../testing';
import { Provider } from 'react-redux';
import React from 'react';

import config from '@plone/volto/registry';

import OrderedObjectListWidget, {
  columnsOf,
  SocialLinksWidget,
  withNetworkTitles,
} from './OrderedObjectListWidget';
import installNetworks from '../../../config/networks';
import { socialMediaSchema } from '../schema/socialMediaSchema';
import { SOCIAL_LINK_SCHEMA, SOCIAL_LINKS } from '../../../stories/fixtures';

let widgets: any;

/** A text input, standing in for every widget the dialog renders. */
const TextWidget = ({ id, title, value, onChange }: any) => (
  <label>
    {title}
    <input
      value={value ?? ''}
      onChange={(event) => onChange(id, event.target.value)}
    />
  </label>
);

beforeAll(() => {
  widgets = config.widgets;
  config.set('widgets', { ...widgets, default: TextWidget });
  installNetworks(config as any);
});

afterAll(() => {
  config.set('widgets', widgets);
});

/**
 * Render a widget over a store with no drag library loaded.
 *
 * @param props Props to replace.
 * @param Widget The widget to render.
 * @returns What the widget reported.
 */
function renderWidget(
  props: Record<string, unknown> = {},
  Widget: React.FC<any> = OrderedObjectListWidget,
) {
  const onChange = vi.fn();
  const state = { lazyLibraries: {} };
  const store = {
    getState: () => state,
    dispatch: (action: unknown) => action,
    subscribe: () => () => {},
  };
  render(
    <Provider store={store as any}>
      <Widget
        id="social_links"
        title="Profiles"
        value={SOCIAL_LINKS}
        schema={SOCIAL_LINK_SCHEMA}
        onChange={onChange}
        {...props}
      />
    </Provider>,
  );
  return onChange;
}

/** The column headers' text, handle and actions columns included. */
function headers(): (string | null)[] {
  return screen
    .getAllByRole('columnheader')
    .map((header) => header.textContent);
}

/** The text of each cell in the first row. */
function firstRow(): (string | null)[] {
  return [...firstRowCells()].map((cell) => cell.textContent);
}

/** The cells of the first row. */
function firstRowCells(): HTMLCollectionOf<HTMLTableCellElement> {
  return (document.querySelector('tr[data-row]') as HTMLTableRowElement).cells;
}

/**
 * The link schema, its network typed rather than picked.
 *
 * The test configuration's select is a placeholder with nothing to pick from,
 * so the network is a plain field, and nothing is required.
 */
const TYPED_NETWORK_SCHEMA = {
  ...SOCIAL_LINK_SCHEMA,
  properties: {
    ...SOCIAL_LINK_SCHEMA.properties,
    id: { title: 'Network' },
  },
  required: [],
};

describe('withNetworkTitles', () => {
  it("gives an entry without a title its network's title", () => {
    expect(
      withNetworkTitles(
        [{ id: 'github' }, { id: 'x', title: '  ' }],
        SOCIAL_LINK_SCHEMA,
      ),
    ).toEqual([
      { id: 'github', title: 'GitHub' },
      { id: 'x', title: 'X (Twitter)' },
    ]);
  });

  it('keeps a title that was given', () => {
    const rows = [{ id: 'github', title: 'Code' }];

    expect(withNetworkTitles(rows, SOCIAL_LINK_SCHEMA)).toEqual(rows);
  });

  it('titles an entry to a network with no registered utility with its id', () => {
    expect(withNetworkTitles([{ id: 'myspace' }], SOCIAL_LINK_SCHEMA)).toEqual([
      { id: 'myspace', title: 'myspace' },
    ]);
  });

  it('leaves an entry without a network as it is', () => {
    expect(withNetworkTitles([{ title: '' }], SOCIAL_LINK_SCHEMA)).toEqual([
      { title: '' },
    ]);
  });

  it('titles nothing when the item schema has no title field', () => {
    // The Follow Us block's networks: a network is all an entry has.
    const schema = {
      ...SOCIAL_LINK_SCHEMA,
      properties: { id: SOCIAL_LINK_SCHEMA.properties.id },
    };

    expect(withNetworkTitles([{ id: 'github' }], schema)).toEqual([
      { id: 'github' },
    ]);
  });
});

describe('columnsOf', () => {
  it('is every field when no columns are asked for', () => {
    expect(columnsOf(SOCIAL_LINK_SCHEMA)).toEqual(['id', 'title', 'href']);
    expect(columnsOf(SOCIAL_LINK_SCHEMA, [])).toEqual(['id', 'title', 'href']);
  });

  it('is the columns asked for, in their order', () => {
    expect(columnsOf(SOCIAL_LINK_SCHEMA, ['title', 'id'])).toEqual([
      'title',
      'id',
    ]);
  });
});

describe('OrderedObjectListWidget', () => {
  it('shows every field as a column by default', () => {
    renderWidget();

    expect(headers()).toEqual(['', 'Network', 'Title', 'Target', 'Actions']);
  });

  it('shows the columns a backend asks for', () => {
    renderWidget({ columns: ['title'] });

    expect(headers()).toEqual(['', 'Title', 'Actions']);
  });

  it('builds the item schema from a registered utility, given props and intl', () => {
    // How the `socialMedia` utility is written: it reads `props` and `intl`
    // off its one argument.
    const method = vi.fn(({ intl }: any) => ({
      ...SOCIAL_LINK_SCHEMA,
      properties: {
        ...SOCIAL_LINK_SCHEMA.properties,
        title: {
          title: intl.formatMessage({ id: 'Name', defaultMessage: 'Name' }),
        },
      },
    }));
    config.registerUtility({ name: 'testLinks', type: 'schema', method });

    renderWidget({ schema: undefined, schemaName: 'testLinks' });

    expect(headers()).toEqual(['', 'Network', 'Name', 'Target', 'Actions']);
    expect(method.mock.calls[0][0].props.id).toBe('social_links');
  });

  it('shows its rows rather than failing when no schema has fields', () => {
    renderWidget({ schema: { type: 'array', items: { type: 'object' } } });

    expect(headers()).toEqual(['', 'Actions']);
    expect(document.querySelectorAll('tr[data-row]')).toHaveLength(2);
  });

  it('gives a new entry an @id and keeps the others', async () => {
    // Only the title required: the network and target widgets are the test
    // configuration's placeholders, which have nothing to type into.
    const onChange = renderWidget({
      schema: { ...SOCIAL_LINK_SCHEMA, required: ['title'] },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Add Link' }));
    const form = document.querySelector('.ui.modal form') as HTMLElement;
    fireEvent.change(await within(form).findByLabelText('Title'), {
      target: { value: 'Blog' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    const [id, value] = onChange.mock.calls[0];
    expect(id).toBe('social_links');
    expect(value.slice(0, 2)).toEqual(SOCIAL_LINKS);
    expect(value[2].title).toBe('Blog');
    expect(value[2]['@id']).toMatch(/^[0-9a-f-]{36}$/);
  });
});

describe('SocialLinksWidget', () => {
  it('summarizes a link by its network and title', () => {
    renderWidget({}, SocialLinksWidget);

    expect(headers()).toEqual(['', 'Network', 'Title', 'Actions']);
  });

  it('shows the columns a backend asks for instead', () => {
    renderWidget({ columns: ['href'] }, SocialLinksWidget);

    expect(headers()).toEqual(['', 'Target', 'Actions']);
  });

  it('shows a network by its icon, named with its title', () => {
    renderWidget({}, SocialLinksWidget);

    const icon = firstRowCells()[1].querySelector('svg');
    expect([...icon!.classList]).toEqual(
      expect.arrayContaining(['social-network', 'github']),
    );
    expect(icon!.querySelector('title')?.textContent).toBe('GitHub');
  });

  it('shows a network with no registered utility by its id', () => {
    renderWidget(
      { value: [{ '@id': 'm', id: 'myspace', title: 'Old' }] },
      SocialLinksWidget,
    );

    expect(firstRowCells()[1].querySelector('svg')).toBeNull();
    expect(firstRow()).toEqual(['', 'myspace', 'Old', '']);
  });

  it("stores a link saved without a title under its network's title", async () => {
    const onChange = renderWidget(
      { schema: TYPED_NETWORK_SCHEMA },
      SocialLinksWidget,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add Link' }));
    const form = document.querySelector('.ui.modal form') as HTMLElement;
    fireEvent.change(await within(form).findByLabelText('Network'), {
      target: { value: 'website' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    const [, value] = onChange.mock.calls[0];
    expect(value.slice(0, 2)).toEqual(SOCIAL_LINKS);
    expect(value[2]).toMatchObject({ id: 'website', title: 'Website' });
  });

  it('keeps the title an editor gave', async () => {
    const onChange = renderWidget(
      { schema: TYPED_NETWORK_SCHEMA },
      SocialLinksWidget,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add Link' }));
    const form = document.querySelector('.ui.modal form') as HTMLElement;
    fireEvent.change(await within(form).findByLabelText('Network'), {
      target: { value: 'website' },
    });
    fireEvent.change(within(form).getByLabelText('Title'), {
      target: { value: 'Blog' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onChange.mock.calls[0][1][2]).toMatchObject({
      id: 'website',
      title: 'Blog',
    });
  });

  it('builds a link from the socialMedia schema, offering the registered networks', () => {
    // What `plonegovbr.socialmedia` sends for `social_links`: no schema, only
    // the name of the utility this package registers.
    config.registerUtility({
      name: 'socialMedia',
      type: 'schema',
      method: socialMediaSchema,
    });

    renderWidget(
      { schema: undefined, schemaName: 'socialMedia' },
      SocialLinksWidget,
    );

    expect(headers()).toEqual(['', 'Network', 'Title', 'Actions']);
    expect(firstRow()).toEqual(['', 'GitHub', 'GitHub', '']);
  });
});

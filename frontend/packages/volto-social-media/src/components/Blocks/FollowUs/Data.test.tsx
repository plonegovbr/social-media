import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';

import config from '@plone/volto/registry';

import { render } from '../../../testing';
import Data from './Data';
import install from '../../../config/blocks';
import { SOCIAL_LINKS } from '../../../stories/fixtures';

// What the sidebar hands to `BlockDataForm`, captured per render.
const form = vi.hoisted(() => ({ props: {} as Record<string, any> }));

vi.mock('@plone/volto/components/manage/Form/BlockDataForm', () => ({
  default: (props: Record<string, any>) => {
    form.props = props;
    return null;
  },
}));

beforeAll(() => {
  install(config as any);
});

const onChangeBlock = vi.fn();
const errors = { title: ['Required'] };

beforeEach(() => {
  onChangeBlock.mockClear();
  render(
    <Data
      data={{ '@type': 'followUsBlock', title: 'Follow us' }}
      block="d9f6f1c2"
      onChangeBlock={onChangeBlock}
      networks={SOCIAL_LINKS}
      navRoot="/plone"
      contentType="Document"
      blocksErrors={errors}
    />,
  );
});

describe('Follow Us block sidebar form', () => {
  it('passes the block and its data to the form', () => {
    expect(form.props.block).toBe('d9f6f1c2');
    expect(form.props.formData).toEqual({
      '@type': 'followUsBlock',
      title: 'Follow us',
    });
  });

  it('passes the block change handler, so defaults are stored in one update', () => {
    expect(form.props.onChangeBlock).toBe(onChangeBlock);
  });

  it('passes the field change handler', () => {
    expect(typeof form.props.onChangeField).toBe('function');
  });

  it('passes the page context, so schema enhancers can see it', () => {
    expect(form.props.navRoot).toBe('/plone');
    expect(form.props.contentType).toBe('Document');
  });

  it('passes the validation errors of the block', () => {
    expect(form.props.errors).toBe(errors);
  });

  it('passes the schema the block configuration gives, with the site links', () => {
    expect(form.props.schema.title).toBeTruthy();
    expect(
      form.props.schema.properties.allowedNetworks.schema.properties.id.choices,
    ).toEqual([
      ['github', 'GitHub'],
      ['mastodon', 'Mastodon'],
    ]);
  });
});

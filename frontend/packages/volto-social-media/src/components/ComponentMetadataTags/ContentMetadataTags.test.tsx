import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import React from 'react';

import config from '@plone/volto/registry';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';

import { renderWithStore } from '../../testing';
import ContentMetadataTags from './ContentMetadataTags';
import type { MetadataContent } from './ContentMetadataTags';
import { siteState } from '../../stories/fixtures';
import type { SocialMediaSettings } from '../../types';

let settings: Record<string, unknown>;

beforeEach(() => {
  settings = { ...config.settings };
  config.settings.contentMetadataTagsImageField = 'image';
});

afterEach(() => {
  config.settings.contentMetadataTagsImageField =
    settings.contentMetadataTagsImageField as string;
  config.settings.siteTitleFormat =
    settings.siteTitleFormat as typeof config.settings.siteTitleFormat;
});

type Head = {
  title: string;
  metaTags: Record<string, string>[];
  linkTags: Record<string, string>[];
};

/**
 * Render the tags for a news page, and read what they put in the head.
 *
 * @param content Content fields to replace.
 * @param socialMedia Social media settings to replace.
 * @param state Store state to add.
 * @returns What the head holds, and the store.
 */
function renderTags(
  content: Partial<MetadataContent> = {},
  socialMedia: Partial<SocialMediaSettings> = {},
  state: Record<string, unknown> = {},
) {
  const { store } = renderWithStore(
    <ContentMetadataTags
      content={{
        '@id': 'http://localhost:8080/Plone/news',
        title: 'News',
        description: 'What is new.',
        ...content,
      }}
    />,
    { ...siteState(socialMedia), ...state },
  );
  return { head: Helmet.peek() as Head, store };
}

/**
 * The content of a meta tag.
 *
 * @param head What the head holds.
 * @param key Whether the tag is found by `name` or by `property`.
 * @param value The tag's name or property.
 * @returns Its content, or `undefined` when there is no such tag.
 */
function meta(head: Head, key: 'name' | 'property', value: string) {
  return head.metaTags.find((tag) => tag[key] === value)?.content;
}

const image = (path: string) => ({
  scales: {
    large: {
      download: `http://localhost:8080/Plone/news/@@images/${path}`,
      width: 800,
      height: 600,
    },
  },
});

describe('ContentMetadataTags', () => {
  it('titles the page with the content title', () => {
    expect(renderTags().head.title).toBe('News');
  });

  it('prefers the SEO title', () => {
    expect(renderTags({ seo_title: 'Latest news' }).head.title).toBe(
      'Latest news',
    );
  });

  it('drops soft hyphens from the title', () => {
    const softHyphen = String.fromCharCode(0x00ad);

    expect(renderTags({ title: `Ne${softHyphen}ws` }).head.title).toBe('News');
  });

  it('adds the site title with the separator Volto is configured with', () => {
    config.settings.siteTitleFormat = {
      includeSiteTitle: true,
      titleAndSiteTitleSeparator: '|',
    };

    const { head } = renderTags(
      {},
      {},
      {
        navroot: { data: { navroot: { title: 'Plone Brasil' } } },
      },
    );

    expect(head.title).toBe('News | Plone Brasil');
  });

  it('describes the page for search engines and social media', () => {
    const { head } = renderTags();

    expect(meta(head, 'name', 'description')).toBe('What is new.');
    expect(meta(head, 'property', 'og:title')).toBe('News');
    expect(meta(head, 'property', 'og:description')).toBe('What is new.');
    expect(meta(head, 'property', 'og:url')).toBe('http://localhost:3000/news');
    expect(meta(head, 'name', 'twitter:card')).toBe('summary_large_image');
    expect(head.linkTags).toContainEqual(
      expect.objectContaining({
        rel: 'canonical',
        href: 'http://localhost:3000/news',
      }),
    );
  });

  it("names the site's profiles when the settings share them", () => {
    const { head } = renderTags(
      {},
      {
        facebook_app_id: '123456789',
        facebook_username: 'PloneBr',
        x_username: 'ploneorgbr',
      },
    );

    expect(meta(head, 'property', 'fb:app_id')).toBe('123456789');
    expect(meta(head, 'property', 'og:article:publisher')).toBe('PloneBr');
    expect(meta(head, 'name', 'twitter:site')).toBe('@ploneorgbr');
  });

  it('names none of them when the settings do not share them', () => {
    const { head } = renderTags(
      {},
      {
        share_social_data: false,
        facebook_app_id: '123456789',
        facebook_username: 'PloneBr',
        x_username: 'ploneorgbr',
      },
    );

    expect(meta(head, 'property', 'fb:app_id')).toBeUndefined();
    expect(meta(head, 'property', 'og:article:publisher')).toBeUndefined();
    expect(meta(head, 'name', 'twitter:site')).toBeUndefined();
  });

  it('shows the Open Graph image rather than the content image', () => {
    const { head } = renderTags({
      image: image('image/large'),
      opengraph_image: image('opengraph_image/large'),
    });

    expect(meta(head, 'property', 'og:image')).toBe(
      'http://localhost:3000/news/@@images/opengraph_image/large',
    );
    expect(meta(head, 'property', 'og:image:width')).toBe('800');
    expect(meta(head, 'property', 'og:image:height')).toBe('600');
  });

  it('shows the content image without an Open Graph one', () => {
    const { head } = renderTags({ image: image('image/large') });

    expect(meta(head, 'property', 'og:image')).toBe(
      'http://localhost:3000/news/@@images/image/large',
    );
  });

  it('shows no image when the content has none', () => {
    expect(meta(renderTags().head, 'property', 'og:image')).toBeUndefined();
  });

  it('keeps search engines away when the content asks', () => {
    expect(meta(renderTags({ seo_noindex: true }).head, 'name', 'robots')).toBe(
      'noindex',
    );
  });

  it("asks for the page's navigation root", () => {
    const { store } = renderTags();

    expect(store.dispatched).toContainEqual(
      expect.objectContaining({
        type: 'GET_NAVROOT',
        request: { op: 'get', path: '/news/@navroot' },
      }),
    );
  });
});

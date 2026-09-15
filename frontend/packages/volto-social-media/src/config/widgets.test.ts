import { describe, expect, it, vi } from 'vitest';

import install from './widgets';
import { SocialLinksWidget } from '../components/Widgets/OrderedObjectListWidget/OrderedObjectListWidget';
import SocialLinksViewWidget from '../components/Widgets/SocialLinksViewWidget/SocialLinksViewWidget';
import { socialMediaSchema } from '../components/Widgets/schema/socialMediaSchema';

/**
 * Install the widgets into a configuration holding only some widgets.
 *
 * @param widget The edit widgets registered by name before.
 * @param view The view widgets registered by name before.
 * @returns The configuration afterwards.
 */
function configured(
  widget: Record<string, unknown> = {},
  view: Record<string, unknown> = {},
) {
  const config: any = {
    widgets: { widget, views: { widget: view } },
    registerUtility: vi.fn(),
  };
  install(config);
  return config;
}

describe('install', () => {
  it('registers the social links widget under the name the backend asks for', () => {
    expect(configured().widgets.widget.social_media_object_list).toBe(
      SocialLinksWidget,
    );
  });

  it('registers a view widget under the same name', () => {
    expect(configured().widgets.views.widget.social_media_object_list).toBe(
      SocialLinksViewWidget,
    );
  });

  it('registers the schema a social link is built from', () => {
    expect(configured().registerUtility).toHaveBeenCalledWith({
      name: 'socialMedia',
      type: 'schema',
      method: socialMediaSchema,
    });
  });

  it('keeps the widgets already registered', () => {
    const token = () => null;
    const tags = () => null;

    const config = configured({ token }, { tags });

    expect(config.widgets.widget.token).toBe(token);
    expect(config.widgets.views.widget.tags).toBe(tags);
  });
});

import { describe, expect, it, vi } from 'vitest';

import install from './widgets';
import { SocialLinksWidget } from '../components/Widgets/OrderedObjectListWidget/OrderedObjectListWidget';
import { socialMediaSchema } from '../components/Widgets/schema/socialMediaSchema';

/**
 * Install the widgets into a configuration holding only some widgets.
 *
 * @param widget What was registered by name before.
 * @returns The configuration afterwards.
 */
function configured(widget: Record<string, unknown> = {}) {
  const config: any = { widgets: { widget }, registerUtility: vi.fn() };
  install(config);
  return config;
}

describe('install', () => {
  it('registers the social links widget under the name the backend asks for', () => {
    expect(configured().widgets.widget.social_media_object_list).toBe(
      SocialLinksWidget,
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

    expect(configured({ token }).widgets.widget.token).toBe(token);
  });
});

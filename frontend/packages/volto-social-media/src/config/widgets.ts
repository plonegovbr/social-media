import type { ConfigType } from '@plone/registry';
import { socialMediaSchema } from '../components/Widgets/schema/socialMediaSchema';
import { SocialLinksWidget } from '../components/Widgets/OrderedObjectListWidget/OrderedObjectListWidget';
import SocialLinksViewWidget from '../components/Widgets/SocialLinksViewWidget/SocialLinksViewWidget';

/**
 * The widgets this add-on supplies.
 *
 * `social_media_object_list` is the widget `plonegovbr.socialmedia` asks for
 * on its `social_links` field, together with the `socialMedia` schema name
 * registered here, and the one the Follow Us block asks for on its networks.
 * The same name has a view widget, for a content view that renders the field.
 */
export default function install(config: ConfigType) {
  config.registerUtility({
    name: 'socialMedia',
    type: 'schema',
    method: socialMediaSchema,
  });

  config.widgets.widget.social_media_object_list = SocialLinksWidget;
  config.widgets.views.widget.social_media_object_list = SocialLinksViewWidget;

  return config;
}

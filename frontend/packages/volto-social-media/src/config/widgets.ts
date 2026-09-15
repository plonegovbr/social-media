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
 * A view does not read the widget the backend names in `frontendOptions`, and
 * finds a view widget by the field's name instead, so the view widget is
 * registered for `social_links` too.
 */
export default function install(config: ConfigType) {
  config.registerUtility({
    name: 'socialMedia',
    type: 'schema',
    method: socialMediaSchema,
  });

  // Edit widget
  config.widgets.widget.social_media_object_list = SocialLinksWidget;

  // View widget
  config.widgets.views.id.social_links = SocialLinksViewWidget;
  config.widgets.views.widget.social_media_object_list = SocialLinksViewWidget;

  return config;
}

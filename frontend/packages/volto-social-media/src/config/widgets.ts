import type { ConfigType } from '@plone/registry';
import { socialMediaSchema } from '../components/Widgets/schema/socialMediaSchema';
import SocialMediaObjectList from '../components/Widgets/SocialMediaObjectList/SocialMediaObjectList';

export default function install(config: ConfigType) {
  config.registerUtility({
    name: 'socialMedia',
    type: 'schema',
    method: socialMediaSchema,
  });

  // Register the SocialMediaObjectList as a unique widget for social media links
  config.widgets.widget.social_media_object_list = SocialMediaObjectList;

  return config;
}

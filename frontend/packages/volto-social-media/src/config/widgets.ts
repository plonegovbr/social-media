import type { ConfigType } from '@plone/registry';
import { socialMediaSchema } from '../components/Widgets/schema/socialMediaSchema';

export default function install(config: ConfigType) {
  config.registerUtility({
    name: 'socialMedia',
    type: 'schema',
    method: socialMediaSchema,
  });

  return config;
}

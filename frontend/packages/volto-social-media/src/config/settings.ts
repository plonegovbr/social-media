import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  // Expanders
  config.settings.apiExpanders = [
    ...config.settings.apiExpanders,
    {
      match: '',
      GET_CONTENT: ['inherit'],
      querystring: {
        'expand.inherit.behaviors': 'plonegovbr.socialmedia.settings',
      },
    },
  ];
  return config;
}

import type { ConfigType } from '@plone/registry';

type apiExpanderInherit = {
  match: string;
  GET_CONTENT: string[];
  querystring:
    | { [key: string]: string }
    | ((
        config,
        querystring: { config: ConfigType; querystring: object },
      ) => { [key: string]: string });
};

export default function install(config: ConfigType) {
  config.settings.apiExpanders = [
    ...config.settings.apiExpanders,
    {
      match: '',
      GET_CONTENT: ['inherit'],
      querystring: (config, querystring) => {
        if (querystring['expand.inherit.behaviors']) {
          return {
            'expand.inherit.behaviors': querystring[
              'expand.inherit.behaviors'
            ].concat(',', 'plonegovbr.socialmedia.settings'),
          };
        } else {
          return {
            'expand.inherit.behaviors': 'plonegovbr.socialmedia.settings',
          };
        }
      },
    } as apiExpanderInherit,
  ];
  return config;
}

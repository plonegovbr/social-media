import type { ConfigType } from '@plone/registry';
import { SETTINGS_BEHAVIOR } from '../constants';

type ApiExpander = ConfigType['settings']['apiExpanders'][number];

/**
 * The query string asking for the settings behavior through `inherit`.
 *
 * Volto calls an expander's `querystring` with the configuration and the
 * query string the expanders before it built, so another add-on asking for its
 * own behaviors keeps them.
 *
 * @param _config Volto's configuration.
 * @param querystring The query string so far.
 * @returns The behaviors to expand, this add-on's included.
 */
export function inheritQuerystring(
  _config: unknown,
  querystring: Record<string, string>,
): Record<string, string> {
  const behaviors = querystring['expand.inherit.behaviors'];
  return {
    'expand.inherit.behaviors': behaviors
      ? behaviors.concat(',', SETTINGS_BEHAVIOR)
      : SETTINGS_BEHAVIOR,
  };
}

export default function install(config: ConfigType) {
  config.settings.apiExpanders = [
    ...config.settings.apiExpanders,
    {
      match: '',
      GET_CONTENT: ['inherit'],
      // `@plone/types` describes the second argument as `{ config,
      // querystring }`; Volto passes the query string itself.
      querystring: inheritQuerystring,
    } as unknown as ApiExpander,
  ];
  return config;
}

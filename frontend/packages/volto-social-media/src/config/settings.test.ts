import { describe, expect, it } from 'vitest';

import install, { inheritQuerystring } from './settings';

/**
 * Install the settings into a configuration holding some expanders.
 *
 * @param apiExpanders The expanders registered before.
 * @returns The expanders afterwards.
 */
function configured(apiExpanders: unknown[] = []) {
  const config: any = { settings: { apiExpanders } };
  install(config);
  return config.settings.apiExpanders;
}

describe('install', () => {
  it('asks every content request for the settings through inherit', () => {
    const [expander] = configured();

    expect(expander).toEqual({
      match: '',
      GET_CONTENT: ['inherit'],
      querystring: inheritQuerystring,
    });
  });

  it('keeps the expanders already registered', () => {
    const navroot = { match: '', GET_CONTENT: ['navroot'] };

    expect(configured([navroot])[0]).toBe(navroot);
  });
});

describe('inheritQuerystring', () => {
  it('asks for the settings behavior', () => {
    expect(inheritQuerystring(undefined, {})).toEqual({
      'expand.inherit.behaviors': 'plonegovbr.socialmedia.settings',
    });
  });

  it('keeps the behaviors an expander before it asked for', () => {
    expect(
      inheritQuerystring(undefined, {
        'expand.inherit.behaviors': 'voltolighttheme.header',
      }),
    ).toEqual({
      'expand.inherit.behaviors':
        'voltolighttheme.header,plonegovbr.socialmedia.settings',
    });
  });
});

import { beforeAll, describe, expect, it } from 'vitest';

import config from '@plone/volto/registry';

import installNetworks from '../config/networks';
import {
  getNetwork,
  getNetworks,
  networkChoices,
  networkTitle,
} from './networks';

beforeAll(() => {
  installNetworks(config as any);
  // A network a project registers, beside the ones this package ships.
  config.registerUtility({
    name: 'codeberg',
    type: 'socialNetwork',
    method: () => ({ id: 'codeberg', title: 'Codeberg', icon: 'codeberg.svg' }),
  });
});

describe('getNetworks', () => {
  it("is every registered network, a project's own included", () => {
    const ids = getNetworks().map(({ id }) => id);

    expect(ids).toHaveLength(26);
    expect(ids).toContain('codeberg');
  });

  it('orders the networks by title', () => {
    const titles = getNetworks().map(({ title }) => title);

    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
    expect(titles.slice(0, 3)).toEqual(['BlueSky', 'Codeberg', 'Discord']);
  });
});

describe('getNetwork', () => {
  it('is the network a token names', () => {
    expect(getNetwork('github')).toMatchObject({
      id: 'github',
      title: 'GitHub',
    });
  });

  it('is undefined for a network with no registered utility', () => {
    expect(getNetwork('myspace')).toBeUndefined();
  });
});

describe('networkChoices', () => {
  it('pairs each token with its title, in the order of the titles', () => {
    const choices = networkChoices();

    expect(choices).toHaveLength(26);
    expect(choices[0]).toEqual(['bluesky', 'BlueSky']);
    expect(choices).toContainEqual(['x', 'X (Twitter)']);
  });
});

describe('networkTitle', () => {
  it("is a network's title", () => {
    expect(networkTitle('x')).toBe('X (Twitter)');
  });

  it('is the token itself for a network with no registered utility', () => {
    expect(networkTitle('myspace')).toBe('myspace');
  });
});

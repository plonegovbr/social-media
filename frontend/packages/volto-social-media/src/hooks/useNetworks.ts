import { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import type { Content } from '@plone/types';
import config from '@plone/volto/registry';
import { SETTINGS_BEHAVIOR } from '../constants';
import { useLiveData } from './useLiveData';
import type { AllowedNetwork, SocialLink } from '../types';

const EVERY_NETWORK: AllowedNetwork[] = [];

type State = {
  content: {
    data: Content;
  };
};

/**
 * The social links to show.
 *
 * The site's `social_links` -- as the edit form holds them while they are
 * being edited, else as the closest site or subsite serves them -- or, when
 * there are none, `config.settings.socialNetworks`.
 *
 * @param allowedNetworks The networks to keep, in the order to show them.
 *   Empty keeps every link, in its own order.
 * @returns The links.
 */
export const useNetworks = (
  allowedNetworks: AllowedNetwork[] = EVERY_NETWORK,
): SocialLink[] => {
  const { settings } = config;
  const configNetworks = settings.socialNetworks || [];

  const content = useSelector(
    (state: State) => state.content.data,
    shallowEqual,
  );

  const social_links = useLiveData<SocialLink[]>(
    content,
    SETTINGS_BEHAVIOR,
    'social_links',
  );

  const backendNetworks = social_links || [];
  const networks =
    backendNetworks.length > 0 ? backendNetworks : configNetworks;

  return useMemo(() => {
    if (allowedNetworks.length === 0) {
      return networks;
    }
    const indexedNetworks = Object.fromEntries(
      networks.map((net) => [net.id, net]),
    );

    return allowedNetworks
      .map((net) => indexedNetworks[net.id])
      .filter(Boolean); // removes undefined
  }, [networks, allowedNetworks]);
};

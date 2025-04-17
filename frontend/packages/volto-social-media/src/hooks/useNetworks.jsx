import { useMemo } from 'react';
import { useSocialMedia } from './useSocialMedia';
import config from '@plone/volto/registry';

export const useNetworks = (allowedNetworks = []) => {
  const { settings } = config;
  const configNetworks = settings.socialNetworks || [];
  const socialMedia = useSocialMedia();
  const backendNetworks = socialMedia?.social_links || [];
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

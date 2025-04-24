import { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import config from '@plone/volto/registry';
import { useLiveData } from './useLiveData';

export const useNetworks = (allowedNetworks = []) => {
  const { settings } = config;
  const configNetworks = settings.socialNetworks || [];

  const content = useSelector((state) => state.content.data, shallowEqual);

  const social_links = useLiveData(
    content,
    'plonegovbr.socialmedia.settings',
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

import type { ConfigType } from '@plone/registry';
import FollowUs from '../components/slots/FollowUs';

export default function install(config: ConfigType) {
  config.registerSlotComponent({
    name: 'FollowUs',
    slot: 'followUs',
    component: FollowUs,
  });
  return config;
}

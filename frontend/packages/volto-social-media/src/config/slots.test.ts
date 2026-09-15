import { describe, expect, it, vi } from 'vitest';

import install from './slots';
import FollowUs from '../components/slots/FollowUs';

describe('install', () => {
  it('registers the Follow Us links in the followUs slot', () => {
    const config: any = { registerSlotComponent: vi.fn() };

    install(config);

    expect(config.registerSlotComponent).toHaveBeenCalledWith({
      name: 'FollowUs',
      slot: 'followUs',
      component: FollowUs,
    });
  });
});

import { describe, expect, it, vi } from 'vitest';

import applyConfig from './index';
import installBlocks from './config/blocks';
import installNetworks from './config/networks';
import installSettings from './config/settings';
import installSlots from './config/slots';
import installWidgets from './config/widgets';

vi.mock('./config/blocks', () => ({ default: vi.fn() }));
vi.mock('./config/networks', () => ({ default: vi.fn() }));
vi.mock('./config/settings', () => ({ default: vi.fn() }));
vi.mock('./config/slots', () => ({ default: vi.fn() }));
vi.mock('./config/widgets', () => ({ default: vi.fn() }));

describe('applyConfig', () => {
  it('installs every part of the configuration, and returns it', () => {
    const config: any = {};

    expect(applyConfig(config)).toBe(config);
    for (const install of [
      installBlocks,
      installNetworks,
      installSettings,
      installSlots,
      installWidgets,
    ]) {
      expect(install).toHaveBeenCalledWith(config);
    }
  });
});

import installBlocks from './config/blocks';
import installNetworks from './config/networks';
import installSettings from './config/settings';
import installWidgets from './config/widgets';
import installSlots from './config/slots';

const applyConfig = (config) => {
  installBlocks(config);
  installNetworks(config);
  installSettings(config);
  installWidgets(config);
  installSlots(config);
  return config;
};

export default applyConfig;

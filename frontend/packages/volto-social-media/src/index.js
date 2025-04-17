import installBlocks from './config/blocks';
import installNetworks from './config/networks';
import installSettings from './config/settings';
import installWidgets from './config/widgets';

const applyConfig = (config) => {
  installBlocks(config);
  installNetworks(config);
  installSettings(config);
  installWidgets(config);
  return config;
};

export default applyConfig;

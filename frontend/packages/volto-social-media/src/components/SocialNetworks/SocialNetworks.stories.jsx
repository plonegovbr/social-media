import { injectIntl } from 'react-intl';
import React from 'react';
import SocialNetworks from './SocialNetworks';
import Wrapper from '@plone/volto/storybook';
import config from '@plone/volto/registry';
import installNetworks from '../../config/networks';

installNetworks(config);

const StoryComponent = injectIntl(({ children, ...args }) => {
  const networks = config.getUtilities({ type: 'socialNetwork' });

  return (
    <Wrapper>
      <div>
        <SocialNetworks
          networks={networks.map((network) => {
            const info = network.method();
            return {
              ...info,
              href: [{ '@id': 'https://fake.com' }],
            };
          })}
          {...args}
        />
      </div>
    </Wrapper>
  );
});

export const AllNetworks = StoryComponent.bind({});
AllNetworks.args = {
  id: 'facebook',
  title: 'Facebook',
  href: 'https://www.facebook.com/Plone-Brasil-101606785972720',
};

export default {
  title: 'Components/SocialNetworks/SocialNetworks',
  component: SocialNetworks,
  argTypes: {
    id: {
      name: 'Social Network ID',
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
    title: {
      name: 'Social Network Title',
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
    href: {
      name: 'Target',
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
  },
};

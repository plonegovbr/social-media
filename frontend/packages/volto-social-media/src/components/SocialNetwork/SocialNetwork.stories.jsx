import { injectIntl } from 'react-intl';
import React from 'react';
import SocialNetwork from './SocialNetwork';
import Wrapper from '@plone/volto/storybook';

const StoryComponent = injectIntl(({ children, ...args }) => {
  return (
    <Wrapper>
      <div>
        <SocialNetwork {...args} />
      </div>
    </Wrapper>
  );
});

export const Facebook = StoryComponent.bind({});
Facebook.args = {
  id: 'facebook',
  title: 'Facebook',
  href: 'https://www.facebook.com/Plone-Brasil-101606785972720',
};

export const GitHub = StoryComponent.bind({});
GitHub.args = {
  id: 'github',
  title: 'GitHub',
  href: 'https://github.com/plonegovbr',
};

export const Instagram = StoryComponent.bind({});
Instagram.args = {
  id: 'instagram',
  icon: 'instagram',
  title: 'Instagram',
  href: 'https://www.instagram.com/plonebr/',
};

export const Twitter = StoryComponent.bind({});
Twitter.args = {
  id: 'x',
  icon: 'twitter',
  title: 'Twitter',
  href: 'https://twitter.com/ploneorgbr/',
};

export const YouTube = StoryComponent.bind({});
YouTube.args = {
  id: 'youtube',
  icon: 'youtube',
  title: 'YouTube',
  href: 'https://www.youtube.com/playlist?list=PLGN9BI-OAQkTbVIJRPYpAs1K4hBdkLl10',
};

export default {
  title: 'Components/SocialNetworks/SocialNetwork',
  component: SocialNetwork,
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

import type { ConfigType } from '@plone/registry';

// Icons
import blueskyIcon from '../icons/bluesky.svg';
import discordIcon from '../icons/discord.svg';
import dockerIcon from '../icons/docker.svg';
import facebookIcon from '../icons/facebook.svg';
import flickrIcon from '../icons/flickr.svg';
import githubIcon from '../icons/github.svg';
import gitlabIcon from '../icons/gitlab.svg';
import instagramIcon from '../icons/instagram.svg';
import linkedinIcon from '../icons/linkedin.svg';
import mastodonIcon from '../icons/mastodon.svg';
import mediumIcon from '../icons/medium.svg';
import slackIcon from '../icons/slack.svg';
import soundcloudIcon from '../icons/soundcloud.svg';
import spotifyIcon from '../icons/spotify.svg';
import stackoverflowIcon from '../icons/stack-overflow.svg';
import telegramIcon from '../icons/telegram.svg';
import threadsIcon from '../icons/threads.svg';
import tiktokIcon from '../icons/tiktok.svg';
import twitchIcon from '../icons/twitch.svg';
import twitterIcon from '../icons/twitter.svg';
import websiteIcon from '../icons/website.svg';
import whatsappIcon from '../icons/whatsapp.svg';
import xingIcon from '../icons/xing.svg';
import youtubeIcon from '../icons/youtube.svg';

type NetworkInfo = {
  id: string;
  title: string;
  icon: string;
};

export default function install(config: ConfigType) {
  const networks: Record<string, NetworkInfo> = {
    bluesky: { id: 'bluesky', title: 'BlueSky', icon: blueskyIcon },
    discord: { id: 'discord', title: 'Discord', icon: discordIcon },
    docker: { id: 'docker', title: 'Docker', icon: dockerIcon },
    facebook: { id: 'facebook', title: 'Facebook', icon: facebookIcon },
    flickr: { id: 'flickr', title: 'Flickr', icon: flickrIcon },
    github: { id: 'github', title: 'GitHub', icon: githubIcon },
    gitlab: { id: 'gitlab', title: 'Gitlab', icon: gitlabIcon },
    instagram: { id: 'instagram', title: 'Instagram', icon: instagramIcon },
    linkedin: { id: 'linkedin', title: 'LinkedIn', icon: linkedinIcon },
    mastodon: { id: 'mastodon', title: 'Mastodon', icon: mastodonIcon },
    medium: { id: 'medium', title: 'Medium', icon: mediumIcon },
    slack: { id: 'slack', title: 'Slack', icon: slackIcon },
    soundcloud: { id: 'soundcloud', title: 'Soundcloud', icon: soundcloudIcon },
    spotify: { id: 'spotify', title: 'Spotify', icon: spotifyIcon },
    stackoverflow: {
      id: 'stackoverflow',
      title: 'StackOverflow',
      icon: stackoverflowIcon,
    },
    telegram: { id: 'telegram', title: 'Telegram', icon: telegramIcon },
    threads: { id: 'threads', title: 'Threads', icon: threadsIcon },
    tiktok: { id: 'tiktok', title: 'TikTok', icon: tiktokIcon },
    twitch: { id: 'twitch', title: 'Twitch', icon: twitchIcon },
    website: { id: 'website', title: 'Website', icon: websiteIcon },
    whatsapp: { id: 'whatsapp', title: 'WhatsApp', icon: whatsappIcon },
    x: { id: 'x', title: 'X (Twitter)', icon: twitterIcon },
    xing: { id: 'xing', title: 'Xing', icon: xingIcon },
    youtube: { id: 'youtube', title: 'YouTube', icon: youtubeIcon },
  };

  for (const [name, networkInfo] of Object.entries(networks)) {
    config.registerUtility({
      name,
      type: 'socialNetwork',
      method: () => networkInfo,
    });
  }

  return config;
}

/**
 * The site's social media settings, and the frontend setting beside them.
 * @module types/settings
 */
import type { SocialLink } from './networks';

/**
 * What the `plonegovbr.socialmedia.settings` behavior serves through the
 * `inherit` expansion: the settings of the closest site or subsite.
 */
export interface SocialMediaSettings {
  /** Whether pages carry the social media meta tags. */
  share_social_data: boolean;
  facebook_app_id: string;
  /** Read-only: the username in the Facebook link of `social_links`. */
  facebook_username: string;
  /** Read-only: the username in the X link of `social_links`. */
  x_username: string;
  social_links: SocialLink[];
}

declare module '@plone/types' {
  export interface SettingsConfig {
    /**
     * The links shown when the site's settings have none, for a project that
     * keeps them in its configuration rather than in the site.
     */
    socialNetworks?: SocialLink[];
  }
}

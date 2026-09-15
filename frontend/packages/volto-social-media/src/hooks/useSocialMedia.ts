import { useSelector } from 'react-redux';
import type { Content } from '@plone/types';
import { SETTINGS_BEHAVIOR } from '../constants';
import { inheritedData } from '../helpers/inherit';
import type { SocialMediaSettings } from '../types';

export const DEFAULT_SOCIAL_MEDIA_SETTINGS: SocialMediaSettings = {
  share_social_data: true,
  facebook_app_id: '',
  facebook_username: '',
  x_username: '',
  social_links: [],
};

type State = {
  content: {
    data?: Content | null;
  };
};

/**
 * The social media settings of the closest site or subsite.
 *
 * @returns The settings the current content inherits, or the defaults when
 *   none were served.
 */
export const useSocialMedia = (): SocialMediaSettings => {
  const settings = useSelector(
    (state: State) =>
      inheritedData<SocialMediaSettings>(
        state.content?.data,
        SETTINGS_BEHAVIOR,
      ) || DEFAULT_SOCIAL_MEDIA_SETTINGS,
  );
  return settings;
};

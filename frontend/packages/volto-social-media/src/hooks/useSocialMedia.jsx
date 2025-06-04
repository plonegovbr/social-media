import { useSelector } from 'react-redux';

const DEFAULT_SOCIAL_MEDIA_SETTINGS = {
  share_social_data: true,
  facebook_app_id: '',
  facebook_username: '',
  x_username: '',
  social_links: [],
};

export const useSocialMedia = () => {
  const settings = useSelector(
    (state) =>
      state.content?.data?.['@components']?.inherit?.[
        'plonegovbr.socialmedia.settings'
      ]?.data || DEFAULT_SOCIAL_MEDIA_SETTINGS,
  );
  return settings;
};

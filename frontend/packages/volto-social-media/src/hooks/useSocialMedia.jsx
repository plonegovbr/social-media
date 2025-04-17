import { useSelector } from 'react-redux';

export const useSocialMedia = () => {
  const settings = useSelector(
    (state) =>
      state.content?.data?.['@components']?.inherit?.[
        'plonegovbr.socialmedia.settings'
      ]?.data || {
        share_social_data: true,
        facebook_app_id: '',
        facebook_username: '',
        x_username: '',
        social_links: [],
      },
  );
  return settings;
};

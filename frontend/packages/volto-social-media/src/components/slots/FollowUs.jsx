import { useNetworks } from '@plonegovbr/volto-social-media/hooks/useNetworks';
import SocialNetworks from '@plonegovbr/volto-social-media/components/SocialNetworks/SocialNetworks';

const FollowUs = (props) => {
  const animate = props.animate !== undefined ? props.animate : true;
  const networks = useNetworks();

  return <SocialNetworks networks={networks} animate={animate} />;
};

export default FollowUs;

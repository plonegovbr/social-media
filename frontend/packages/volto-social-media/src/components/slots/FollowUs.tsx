import React from 'react';
import { useNetworks } from '../../hooks/useNetworks';
import SocialNetworks from '../SocialNetworks/SocialNetworks';

export interface FollowUsProps {
  /** Whether the icons move on hover. Left out means they do. */
  animate?: boolean;
}

const FollowUs: React.FC<FollowUsProps> = (props) => {
  const animate = props.animate !== undefined ? props.animate : true;
  const networks = useNetworks();

  return <SocialNetworks networks={networks} animate={animate} />;
};

export default FollowUs;

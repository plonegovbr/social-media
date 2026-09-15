import React from 'react';
import cx from 'classnames';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import SocialNetworkIcon from '../SocialNetworkIcon/SocialNetworkIcon';

export interface SocialNetworkProps {
  /** The network: the name of a `socialNetwork` utility. */
  id: string;
  /** Names the link and its icon. */
  title: string;
  /** Where the link goes. */
  href: string;
  animate?: boolean;
}

/**
 * Marks the link as the site's own profile.
 *
 * `UniversalLink` passes attributes it does not declare on to the anchor, so
 * this is spread rather than written as a prop its type would refuse.
 */
const PROFILE_LINK = { rel: 'me' };

const SocialNetwork: React.FC<SocialNetworkProps> = ({
  id,
  title,
  href,
  animate,
}) => {
  return (
    <UniversalLink
      title={title}
      href={href}
      openLinkInNewTab
      className={cx('social-network', 'item', `${id}`, {
        animate: animate,
      })}
      {...PROFILE_LINK}
    >
      <SocialNetworkIcon id={id} title={title} animate={animate} />
    </UniversalLink>
  );
};

export default SocialNetwork;

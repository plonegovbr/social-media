import React from 'react';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import cx from 'classnames';
import SocialNetworkIcon from '../SocialNetworkIcon/SocialNetworkIcon';

const SocialNetwork = (props) => {
  const { id, title, href, animate } = props;
  return (
    <UniversalLink
      href={href}
      openLinkInNewTab
      className={cx('social-network', 'item', `${id}`, {
        animate: animate,
      })}
      rel={'me'}
    >
      <SocialNetworkIcon id={id} title={title} animate={animate} />
    </UniversalLink>
  );
};

export default SocialNetwork;

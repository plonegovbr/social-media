import React from 'react';
import cx from 'classnames';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import config from '@plone/volto/registry';
import type { SocialNetworkInfo } from '../../types';

export interface SocialNetworkIconProps {
  /** The network: the name of a `socialNetwork` utility. */
  id: string;
  size?: string;
  color?: string;
  className?: string;
  /** Names the icon to a screen reader. Without one it is hidden from it. */
  title?: string;
  onClick?: (event: React.MouseEvent) => void;
  animate?: boolean;
}

const SocialNetworkIcon: React.FC<SocialNetworkIconProps> = ({
  id,
  size,
  color,
  className,
  title,
  onClick,
  animate,
}) => {
  const network: SocialNetworkInfo | undefined = config
    .getUtility({ type: 'socialNetwork', name: id })
    ?.method?.();

  // A link to a network no utility is registered for -- one a project has
  // removed -- has no icon to draw.
  if (!network) {
    return null;
  }

  return (
    <Icon
      name={network.icon}
      size={size || '47px'}
      color={color}
      className={cx(className, 'social-network', id, {
        animate: animate,
      })}
      aria-label={title}
      aria-hidden={!title}
      onClick={onClick}
    />
  );
};

export default SocialNetworkIcon;

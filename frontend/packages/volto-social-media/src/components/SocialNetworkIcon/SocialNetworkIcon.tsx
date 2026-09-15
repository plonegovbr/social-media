import React from 'react';
import cx from 'classnames';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { getNetwork } from '../../vocabularies/networks';

export interface SocialNetworkIconProps {
  /** The network: the name of a `socialNetwork` utility. */
  id: string;
  size?: string;
  color?: string;
  className?: string;
  /**
   * Names the icon, as the SVG's own title. Without one the icon is hidden
   * from screen readers.
   */
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
  const network = getNetwork(id);

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
      title={title}
      ariaHidden={!title}
      onClick={onClick}
    />
  );
};

export default SocialNetworkIcon;

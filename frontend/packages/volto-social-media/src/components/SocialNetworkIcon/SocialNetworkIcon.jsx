import React from 'react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import config from '@plone/volto/registry';
import cx from 'classnames';

const SocialNetworkIcon = (props) => {
  const { id, size, color, className, title, onClick, animate } = props;
  const networkUtility = config.getUtility({
    type: 'socialNetwork',
    name: id,
  });
  const networkIcon = networkUtility.method().icon;
  return (
    <Icon
      name={networkIcon}
      size={size}
      color={color}
      className={cx(`${className}`, 'social-network', `${id}`, {
        animate: animate,
      })}
      title={title}
      onClick={onClick}
    />
  );
};

export default SocialNetworkIcon;

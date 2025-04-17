import React from 'react';
import cx from 'classnames';
import SocialNetwork from '../SocialNetwork/SocialNetwork';

const SocialNetworks = (props) => {
  const { networks, animate } = props;
  return (
    <ul className={cx('social-networks')}>
      {networks.map(function (network) {
        const href = network?.href?.[0]?.['@id'];
        return (
          href && (
            <li className="item" key={network.id}>
              <SocialNetwork
                id={network.id}
                href={href}
                title={network.title}
                animate={animate}
              />
            </li>
          )
        );
      })}
    </ul>
  );
};

export default SocialNetworks;

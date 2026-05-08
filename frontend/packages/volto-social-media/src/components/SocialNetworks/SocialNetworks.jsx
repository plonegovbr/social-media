import React from 'react';
import cx from 'classnames';
import SocialNetwork from '../SocialNetwork/SocialNetwork';

const SocialNetworks = (props) => {
  const { networks, animate } = props;

  return (
    <ul className={cx('social-networks')}>
      {networks.map(function (network, index) {
        const href = network?.href?.[0]?.['@id'];
        const uniqueKey = network['@id']
          ? `${network['@id']}-${network.id}`
          : `${network.id}-${index}`;
        return (
          href && (
            <li className="item" key={uniqueKey}>
              <SocialNetwork
                id={network.id}
                href={href}
                title={network.title || network.id}
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

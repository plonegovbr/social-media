import React from 'react';
import cx from 'classnames';
import { Container } from '@plone/components';
import { useNetworks } from '@plonegovbr/volto-social-media/hooks/useNetworks';
import SocialNetworks from '@plonegovbr/volto-social-media/components/SocialNetworks/SocialNetworks';

const View = ({ data, className, style }) => {
  const { title, allowedNetworks } = data;
  const animate = data.animate !== undefined ? data.animate : true;
  const networks = useNetworks(allowedNetworks);

  return (
    <Container className={cx('block follow_us', className)} style={style}>
      {title && <Container className="follow_us title">{title}</Container>}
      <SocialNetworks networks={networks} animate={animate} />
    </Container>
  );
};

export default View;

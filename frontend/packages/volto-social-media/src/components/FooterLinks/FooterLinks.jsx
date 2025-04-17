import React from 'react';
import cx from 'classnames';
import { Container } from '@plone/components';
import { useNetworks } from '@plonegovbr/volto-social-media/hooks/useNetworks';
import SocialNetworks from '@plonegovbr/volto-social-media/components/SocialNetworks/SocialNetworks';

const FooterLinks = (props) => {
  const animate = props.animate !== undefined ? props.animate : true;
  const title = props.title;
  const networks = useNetworks();
  return (
    <Container
      className={cx('footer_follow_us')}
      style={{ '--block-alignment': 'left' }}
    >
      {title && <div className="footer_follow_us title">{title}</div>}
      <SocialNetworks networks={networks} animate={animate} />
    </Container>
  );
};

export default FooterLinks;

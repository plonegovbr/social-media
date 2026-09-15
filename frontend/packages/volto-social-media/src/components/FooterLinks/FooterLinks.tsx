import React from 'react';
import cx from 'classnames';
import { Container } from '@plone/components';
import { useNetworks } from '../../hooks/useNetworks';
import SocialNetworks from '../SocialNetworks/SocialNetworks';

export interface FooterLinksProps {
  /** A headline above the icons. */
  title?: string;
  /** Whether the icons move on hover. Left out means they do. */
  animate?: boolean;
}

const FooterLinks: React.FC<FooterLinksProps> = (props) => {
  const animate = props.animate !== undefined ? props.animate : true;
  const title = props.title;
  const networks = useNetworks();
  return (
    <Container
      className={cx('footer_follow_us')}
      style={{ '--block-alignment': 'left' } as React.CSSProperties}
    >
      {title && <div className="footer_follow_us title">{title}</div>}
      <SocialNetworks networks={networks} animate={animate} />
    </Container>
  );
};

export default FooterLinks;

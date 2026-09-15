/**
 * Social links, as a page shows them rather than as a form edits them.
 *
 * Registered as the view widget for `social_media_object_list`, which is what
 * Volto's `DefaultView` renders a `social_links` field with: the links become
 * the same icons the Follow Us block and the footer show.
 * @module components/Widgets/SocialLinksViewWidget
 */
import React from 'react';
import cx from 'classnames';
import SocialNetworks from '../../SocialNetworks/SocialNetworks';
import type { SocialLink } from '../../../types';

export interface SocialLinksViewWidgetProps {
  /** The field's value. */
  value?: SocialLink[] | null;
  className?: string;
}

const SocialLinksViewWidget: React.FC<SocialLinksViewWidgetProps> = ({
  value,
  className,
}) =>
  value?.length ? (
    <div className={cx(className, 'social-links', 'widget')}>
      <SocialNetworks networks={value} />
    </div>
  ) : null;

export default SocialLinksViewWidget;

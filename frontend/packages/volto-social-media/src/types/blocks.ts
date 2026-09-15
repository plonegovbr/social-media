/**
 * What this add-on's blocks store.
 * @module types/blocks
 */
import type { BlockConfigBase } from '@plone/types';

/** One network a Follow Us block shows, as its sidebar stores it. */
export interface AllowedNetwork {
  '@id'?: string;
  /** The network: the name of a `socialNetwork` utility. */
  id: string;
}

/** What a Follow Us block stores. */
export interface FollowUsBlockData {
  '@type': 'followUsBlock';
  /** The headline above the icons. */
  title?: string;
  /** Whether the icons move on hover. Left out means they do. */
  animate?: boolean;
  /**
   * The networks shown, in this order, out of the site's links. Left out or
   * empty means every link.
   */
  allowedNetworks?: AllowedNetwork[];
  styles?: {
    /**
     * The block's alignment. The sidebar's default is the name `'left'`;
     * Volto's `blockAlignment` widget stores the CSS custom properties of the
     * alignment picked, such as `{ '--block-alignment': 'var(--align-center)' }`.
     */
    'align:noprefix'?: string | Record<`--${string}`, string>;
  };
}

declare module '@plone/types' {
  export interface BlocksConfigData {
    followUsBlock: BlockConfigBase;
  }
}

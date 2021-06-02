import React from 'react';
import clsx from 'clsx';

import Loader from '../Loader/Loader';

import styles from './banner.css';

export type StylingType = 'standard' | 'inline' | 'overlay';

export type Type = 'info' | 'success' | 'error' | 'warning' | 'loading';

export interface BannerProps {
  /**
   * Sets an additional description, displayed underneath the label. Not displayed for inline banners.
   */
  children?: React.ReactNode;
  /**
   * Sets the label displayed to the user.
   */
  label: string;
  /**
   * Called when the user click on the clear icon. Only available for overlay banners.
   */
  onClear?: (e: React.MouseEvent) => void;
  /**
   * Sets the overall style according to the banner usage.
   */
  styling?: StylingType;
  /**
   * Sets the overall style according to the banner type.
   */
  type: Type;
}

/**
 * Banners are used to give feedback to the user about an action or state.
 *
 * We distinguish between standard, inline and overlay Banners.
 *
 * Banners have an icon, a title and an optional description.
 */
const Banner: React.FC<BannerProps> = ({
  label,
  children,
  onClear,
  styling = 'standard',
  type,
}: BannerProps) => (
  <div
    className={clsx(styles.banner, styles[`type-${type}`], styles[`style-${styling}`])}
    role="banner"
  >
    <div className={styles.iconMessageContainer}>
      <span className={styles.bannerIcon}>{type === 'loading' ? <Loader size="small" /> : <span className={`pyreneIcon-${type}`} />}</span>
      <div className={styles.spacer} />
      <div className={styles.textBox}>
        <div className={styles.message}>{label}</div>
        {styling !== 'inline' && <div className={styles.description}>{children}</div>}
      </div>
    </div>
    {styling === 'overlay' && onClear && <span className={clsx('pyreneIcon-delete', styles.clearIcon)} onClick={onClear} role="button" aria-label="Clear Banner" />}
  </div>
);


Banner.displayName = 'Banner';

export default Banner;

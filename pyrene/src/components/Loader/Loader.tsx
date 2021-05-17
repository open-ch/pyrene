import React from 'react';
import clsx from 'clsx';

import styles from './loader.css';

export type Type = 'standalone' | 'inline';
export type Styling = 'dark' | 'light';
export type Size = 'small' | 'medium' | 'large' | 'xlarge';

export interface LoaderProps {
  /**
   * Sets the size.
   */
  size?: Size;

  /**
   * Sets the standalone color; can be set only for standalone type
   */
  styling?: Styling;

  /**
   * Sets the type
   */
  type?: Type;
}

/**
 * Loaders display an unspecified wait time.
 *
 * The Loader is not a progress indicator and should not be used if the load time is to be displayed.
 */
const Loader: React.FC<LoaderProps> = ({
  type = 'standalone',
  size = 'medium',
  styling = 'dark',
}: LoaderProps) => (
  <>
    {type === 'standalone'
      && (
        <div className={clsx(styles.canvas, styles[`size-${size}`])}>
          <div className={clsx(styles.standaloneLoader, styles[`styling-${styling}`], styles[`size-${size}`])} />
        </div>
      )}
    {type === 'inline'
      && (
        <span className={styles.inlineLoader} />
      )}
  </>
);

Loader.displayName = 'Loader';

export default Loader;

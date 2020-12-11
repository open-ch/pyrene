import React from 'react';
import classNames from 'classnames';

import './loader.css';

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
        <div styleName={classNames('canvas', { [`size-${size}`]: true })}>
          <div styleName={classNames('standaloneLoader', { [`styling-${styling}`]: true }, { [`size-${size}`]: true })} />
        </div>
      )}
    {type === 'inline'
      && (
        <span styleName={classNames('inlineLoader')} />
      )}
  </>
);

Loader.displayName = 'Loader';

export default Loader;

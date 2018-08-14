import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import Loader from '../Loader/Loader';

import './banner.css';

const iconNameForBannerType = (type) => {
  switch (type) {
    case 'success':
      return 'check';
    case 'error':
      return 'errorOutline';
    default:
      return type;
  }
};

/**
 * Use a Banner whenever you want the user to click it away.
 */
const Banner = props => (
  <div
    styleName={className('banner', { [`type-${props.type}`]: true }, { clearable: props.clearable })}
    role="banner"
  >
    <div styleName={'iconMessageContainer'}>
      <span styleName={'bannerIcon'}>{props.type === 'loading' ? <Loader size={'small'} /> : <span className={`icon-${iconNameForBannerType(props.type)}`} />}</span>
      <div styleName={'spacer'} />
      <span styleName={'message'}>{props.label}</span>
    </div>
    {props.type !== 'error' && props.type !== 'loading' && <span className={'icon-delete'} styleName={'clearIcon'} onClick={props.onClear} role="button" aria-label="Clear Banner"/>}
  </div>
);


Banner.displayName = 'Banner';

Banner.defaultProps = {
  clearable: true,
  onClear: () => null,
};

Banner.propTypes = {
  /**
   * Whether the user can clear the banner. Error and loading banners can not be cleared.
   */
  clearable: PropTypes.bool,
  /**
   * Sets the label displayed to the user.
   */
  label: PropTypes.string.isRequired,
  /**
   * Called when the user click on the clear icon.
   */
  onClear: PropTypes.func,
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning', 'loading']).isRequired,
};

export default Banner;
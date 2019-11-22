import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import Loader from '../Loader/Loader';

import './banner.css';

/**
 * Banners are used to give feedback to the user about an action or state.
 *
 * We distinguish between standard, inline and overlay Banners.
 *
 * Banners have an icon, a title and an optional description.
 */
const Banner = (props) => (
  <div
    styleName={className('banner', { [`type-${props.type}`]: true }, { [`style-${props.styling}`]: true })}
    role="banner"
  >
    <div styleName="iconMessageContainer">
      <span styleName="bannerIcon">{props.type === 'loading' ? <Loader size="small" /> : <span className={`pyreneIcon-${props.type}`} />}</span>
      <div styleName="spacer" />
      <div styleName="textBox">
        <div styleName="message">{props.label}</div>
        {props.styling !== 'inline' && <div styleName="description">{props.children}</div>}
      </div>
    </div>
    {props.styling === 'overlay' && props.onClear !== null && <span className="pyreneIcon-delete" styleName="clearIcon" onClick={props.onClear} role="button" aria-label="Clear Banner" />}
  </div>
);


Banner.displayName = 'Banner';

Banner.defaultProps = {
  onClear: null,
  children: '',
  styling: 'standard',
};

Banner.propTypes = {
  /**
   * Sets an additional description, displayed underneath the label. Not displayed for inline banners.
   */
  children: PropTypes.node,
  /**
   * Sets the label displayed to the user.
   */
  label: PropTypes.string.isRequired,
  /**
   * Called when the user click on the clear icon. Only available for overlay banners.
   */
  onClear: PropTypes.func,
  /**
   * Sets the overall style according to the banner usage.
   */
  styling: PropTypes.oneOf(['standard', 'inline', 'overlay']),
  /**
   * Sets the overall style according to the banner type.
   */
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning']).isRequired,
};

export default Banner;

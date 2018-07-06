import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import Loader from './Loader';

import './banner.css';

const Banner = props => (
  <div styleName={className('banner', {[`type-${props.type}`]: true}, {clearable: props.clearable})}>
    {props.type === 'loading' ? <Loader /> : <span className={'icon-errorOutline'} styleName={'bannerIcon'} />}
    <span styleName={'message'}>{props.message}</span>
    <span className={'icon-delete'} styleName={'clearIcon'} />
  </div>
);


Banner.displayName = 'Banner';

Banner.propTypes = {
  clearable: PropTypes.bool,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning', 'loading']).isRequired,
};

Banner.defaultProps = {
  clearable: true,
};

export default Banner;
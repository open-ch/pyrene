import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import Loader from '../Loader/Loader';

import './banner.css';

const Banner = props => (
  <div styleName={className('banner', { [`type-${props.type}`]: true}, {clearable: props.clearable})}>
    <span styleName={'bannerIcon'}>{props.type === 'loading' ? <Loader /> : <span className={'icon-errorOutline'} />}</span>
    <span styleName={'message'}>{props.message}</span>
    {props.type !== 'error' && props.type !== 'loading' && <span className={'icon-delete'} styleName={'clearIcon'} onClick={props.onClear} />}
  </div>
);


Banner.displayName = 'Banner';

Banner.defaultProps = {
  clearable: true,
  onClear: () => null,
};

Banner.propTypes = {
  clearable: PropTypes.bool,
  message: PropTypes.string.isRequired,
  onClear: PropTypes.func,
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning', 'loading']).isRequired,
};

export default Banner;
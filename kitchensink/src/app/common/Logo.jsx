import React from 'react';
import PropTypes from 'prop-types';
import '../../css/logo.css';


const Logo = props => (
  <div styleName={'kitchenSinkLogo'}>
    <div styleName={'versionNr'}>{props.versionNr}</div>
  </div>
);

Logo.displayName = 'Logo';

Logo.propTypes = {
  versionNr: PropTypes.string.isRequired
};

export default Logo;

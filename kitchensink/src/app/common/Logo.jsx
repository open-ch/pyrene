import React from 'react';
import PropTypes from 'prop-types';
import '../../css/logo.css';
import { Link } from 'react-router-dom';

const Logo = props => (
  <Link to={'/'}>
    <div styleName={'kitchenSinkLogo'}>
      <div styleName={'versionNr'}>{props.versionNr}</div>
    </div>
  </Link>
);

Logo.displayName = 'Logo';

Logo.propTypes = {
  versionNr: PropTypes.string.isRequired
};

export default Logo;

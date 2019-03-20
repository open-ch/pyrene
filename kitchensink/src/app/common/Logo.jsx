import React from 'react';
import PropTypes from 'prop-types';
import '../../css/logo.css';
import { Link } from 'react-router-dom';

const Logo = props => (
  <Link to="/">
    <div styleName="pyreneLogo">
      <div styleName="versionNr">{props.pyreneVersion.replace(/\^/, '')}</div>
    </div>
  </Link>
);

Logo.displayName = 'Logo';

Logo.propTypes = {
  pyreneVersion: PropTypes.string.isRequired,
};

export default Logo;

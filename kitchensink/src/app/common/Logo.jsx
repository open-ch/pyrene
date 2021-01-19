import React from 'react';
import PropTypes from 'prop-types';
import '../../css/logo.css';
import { Link } from 'react-router-dom';

import pyreneLogo from '../../images/pyrene.svg';

const Logo = (props) => (
  <Link to="/">
    <div styleName="pyreneLogo">
      <img styleName="logo" src={pyreneLogo} alt="Pyrene Logo" />
      <div styleName="versionNrContainer">
        <div styleName="versionNr">
          {`@osag/pyrene@${props.pyreneVersion.replace(/\^/, '')}`}
        </div>
      </div>
      <div styleName="versionNrContainer">
        <div styleName="versionNr">
          {`@osag/pyrene-graphs@${props.pyreneGraphsVersion.replace(/\^/, '')}`}
        </div>
      </div>
    </div>
  </Link>
);

Logo.displayName = 'Logo';

Logo.propTypes = {
  pyreneGraphsVersion: PropTypes.string.isRequired,
  pyreneVersion: PropTypes.string.isRequired,
};

export default Logo;

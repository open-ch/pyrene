import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../../css/logo.css';
import pyreneLogo from '../../images/pyrene.svg';

const Logo = (props) => (
  <Link to="/">
    <div className={styles.pyreneLogo}>
      <img className={styles.logo} src={pyreneLogo} alt="Pyrene Logo" />
      <div className={styles.versionNrContainer}>
        <div className={styles.versionNr}>
          {`@osag/pyrene@${props.pyreneVersion.replace(/\^/, '')}`}
        </div>
      </div>
      <div className={styles.versionNrContainer}>
        <div className={styles.versionNr}>
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

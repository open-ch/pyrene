import React from 'react';
import PropTypes from 'prop-types';
import styles from './downloadButton.css';

const DownloadButton = (props) => (
  <a href={props.path} download>
    <div className={styles.downloadButton}>
      <div className={styles.iconContainer}>
        <div className={styles.icon} />
      </div>
      <div className={styles.name}>{props.name}</div>
    </div>
  </a>
);

DownloadButton.displayName = 'DownloadButton';

DownloadButton.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

DownloadButton.defaultProps = {};

export default DownloadButton;

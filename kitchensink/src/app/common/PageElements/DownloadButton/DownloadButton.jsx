import React from 'react';
import PropTypes from 'prop-types';

import './downloadButton.css';

const DownloadButton = (props) => {
  return (
    <a href={props.path} download>
      <div styleName={'downloadButton'}>
        <div styleName={'iconContainer'}>
          <div styleName={'icon'} />
        </div>
        <div styleName={'name'}>{props.name}</div>
      </div>
    </a>
  );
};


DownloadButton.displayName = 'DownloadButton';

DownloadButton.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

DownloadButton.defaultProps = {};

export default DownloadButton;

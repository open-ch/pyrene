import React from 'react';
import PropTypes from 'prop-types';

import './downloadButton.css';

const DownloadButton = (props) => {
  const nameFromPath = props.path.split('.')[0].split('/').pop();
  const preparedName = `${nameFromPath.charAt(0).toUpperCase() + nameFromPath.slice(1)} (.${props.path.split('.')[1]})`;
  return (
    <a href={props.path} download>
      <div styleName={'downloadButton'}>
        <div styleName={'iconContainer'}>
          <div styleName={'icon'} />
        </div>
        <div styleName={'name'}>{preparedName}</div>
      </div>
    </a>
  );
};


DownloadButton.displayName = 'DownloadButton';

DownloadButton.propTypes = {
  path: PropTypes.string.isRequired,
};

DownloadButton.defaultProps = {};

export default DownloadButton;

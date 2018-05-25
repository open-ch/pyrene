import React from 'react';
import PropTypes from 'prop-types';

import './iconBox.css';

const handleIconClick = (name, downloadable) => {
  const textarea = document.createElement("textarea");
  textarea.textContent = name;
  textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge.
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand('copy'); // Security exception may be thrown by some browsers.
  } catch (ex) {
    console.warn('Copy to clipboard failed.', ex);
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
};

const IconBox = props => (
  <div styleName={'iconBox'} onClick={() => handleIconClick(props.name, props.downloadable)}>
    {props.name && <span styleName={'icon'} className={`pyreneIcon-${props.name}`} />}
  </div>
);


IconBox.displayName = 'iconBox';

IconBox.propTypes = {
  name: PropTypes.string,
  downloadable: PropTypes.bool,
};

IconBox.defaultProps = {
  name: '',
  downloadable: false,
};

export default IconBox;
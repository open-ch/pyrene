import React from 'react';
import PropTypes from 'prop-types';

import './displayBox.css';

const DisplayBox = props => (
  <div styleName="displayBox">
    <div styleName="positioningBox" style={{ width: props.width }}>
      {props.children}
    </div>
  </div>
);


DisplayBox.displayName = 'DisplayBox';

DisplayBox.defaultProps = {
  width: '100%',
};

DisplayBox.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DisplayBox;

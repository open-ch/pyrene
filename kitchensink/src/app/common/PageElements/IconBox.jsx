import React from 'react';
import PropTypes from 'prop-types';

import './iconBox.css';

const IconBox = props => (
  <div styleName={'iconBox'}>
    {props.name && <span styleName={'icon'} className={`pyreneIcon-${props.name}`} />}
  </div>
);


IconBox.displayName = 'iconBox';

IconBox.propTypes = {
  name: PropTypes.string,
};

IconBox.defaultProps = {
  name: '',
};

export default IconBox;
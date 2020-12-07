import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './designSystemBox.css';

const DesignSystemBox = (props) => (
  <div styleName="introDesignSystemBox">
    <div styleName="numberIconTitleContainer">
      <div styleName="number">{props.number}</div>
      <div styleName="iconTitle">
        <span styleName={classNames('icon', { [`${props.icon}`]: true })} />
        <span>{props.title}</span>
      </div>
    </div>
    <div styleName="description">
      {props.description}
    </div>
  </div>
);

DesignSystemBox.displayName = 'DesignSystemBox';

DesignSystemBox.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

DesignSystemBox.defaultProps = {};

export default DesignSystemBox;

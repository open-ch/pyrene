import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './principle.css';

const Principle = props => (
  <div styleName="principleContainer">
    <div styleName={classNames('icon', { [`${props.icon}`]: true })} />
    <div styleName="textArea">
      <span styleName="title">{props.title}</span>
      <span styleName="description">{props.description}</span>
    </div>
  </div>
);

Principle.displayName = 'Principle';

Principle.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Principle.defaultProps = {};

export default Principle;

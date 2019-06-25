import React from 'react';
import PropTypes from 'prop-types';

const Placeholder = props => (
  <div className="unSelectable">
    {props.label ? props.label : 'Content'}
  </div>
);

Placeholder.propTypes = {
  label: PropTypes.string,
};

Placeholder.defaultProps = {
  label: 'Content',
};

export default Placeholder;

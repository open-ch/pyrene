import React from 'react';
import PropTypes from 'prop-types';

const Placeholder = props => (
  <div className="unSelectable" style={{
    height: 200,
    backgroundColor: 'var(--neutral-020)',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    color: 'var(--neutral-100)',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  }}
  >
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

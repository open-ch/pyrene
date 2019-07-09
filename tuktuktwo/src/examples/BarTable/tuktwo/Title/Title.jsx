import React from 'react';
import PropTypes from 'prop-types';
import './title.css';

const Title = props => (
  <div styleName="title">
    {props.title}
    {props.subtitle && (
      <div styleName="subtitle">
        {props.subtitle}
      </div>
    )}
  </div>
);

Title.displayName = 'Title';

Title.defaultProps = {
  subtitle: '',
};

Title.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Title;

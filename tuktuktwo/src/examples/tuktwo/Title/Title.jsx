import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './title.css';

const Title = props => (
  <Fragment>
    <div styleName="title">
      {props.title}
    </div>
    <div styleName="container">
      {props.subtitle && (
        <div styleName="subtitle">
          {props.subtitle}
        </div>
      )}
      {props.legend && props.legend.length > 0 && (
        <div styleName="legend">
          {props.legend.map(item => (
            <div
              key={item.label}
              styleName="legendItem"
            >
              <span
                styleName="circle"
                style={{ backgroundColor: props.colorScheme[item.colorKey] }}
              />
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  </Fragment>
);

Title.displayName = 'Title';

Title.defaultProps = {
  subtitle: '',
  legend: [],
  colorScheme: [],
};

Title.propTypes = {
  colorScheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  legend: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Title;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './title.css';

/**
 * Titles are used to display titles, subtitles and legends along with chart components.
 */
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
  /**
   * Sets the colors of the bar chart. Type: { primary: string (required), secondary: string }
   */
  colorScheme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
  }),
  /**
   * Sets the legend. Type: [{ colorKey: string (required), secondary: string }]
   */
  legend: PropTypes.arrayOf(PropTypes.shape({
    colorKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  /**
   * Sets the subtitle.
   */
  subtitle: PropTypes.string,
  /**
   * Sets the title.
   */
  title: PropTypes.string.isRequired,
};

export default Title;

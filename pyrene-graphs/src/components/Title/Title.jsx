import React from 'react';
import PropTypes from 'prop-types';
import './title.css';
import colorSchemes from '../../styles/colorSchemes';

/**
 * Titles are used to display titles, subtitles and legends along with chart components.
 */
const Title = props => (
  <div styleName="container">
    <div styleName="title">
      {props.title}
    </div>
    <div styleName="subContainer">
      {props.subtitle && (
        <div styleName="subtitle">
          {props.subtitle}
        </div>
      )}
      {props.legend && props.legend.length > 0 && (
        <div styleName="legend">
          {props.legend.map((item, idx) => (
            <div
              key={item}
              styleName="legendItem"
            >
              <span
                styleName="circle"
                style={{ backgroundColor: props.colorScheme[idx] }}
              />
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

Title.displayName = 'Title';

Title.defaultProps = {
  subtitle: '',
  legend: [],
  colorScheme: colorSchemes.general,
};

Title.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: [ string ]
   */
  colorScheme: PropTypes.arrayOf(PropTypes.string),
  /**
   * Sets the legend. Type: [ string ]
   */
  legend: PropTypes.arrayOf(PropTypes.string),
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

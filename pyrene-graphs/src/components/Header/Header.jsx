import React from 'react';
import PropTypes from 'prop-types';
import './header.css';
import colorSchemes from '../../styles/colorSchemes';

/**
 * Headers are used to display a header, description and legends along with chart components.
 */
const Header = props => (
  <div styleName="container">
    <div styleName="header">
      {props.header}
    </div>
    {(props.description || (props.legend && props.legend.length > 0)) && (
      <div styleName="subContainer">
        {props.description && (
          <div styleName="description">
            {props.description}
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
    )}
  </div>
);

Header.displayName = 'Header';

Header.defaultProps = {
  description: '',
  legend: [],
  colorScheme: colorSchemes.general,
};

Header.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: [ string ]
   */
  colorScheme: PropTypes.arrayOf(PropTypes.string),
  /**
    * Sets the description.
    */
  description: PropTypes.string,
  /**
   * Sets the legend. Type: [ string ]
   */
  header: PropTypes.string.isRequired,
  /**
   * Sets the header.
   */
  legend: PropTypes.arrayOf(PropTypes.string),
};

export default Header;

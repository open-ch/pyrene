import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './header.css';

/**
 * Headers are used to display a title, description and legends along with chart components.
 */
const Header = (props) => (
  <div styleName="container">
    <div styleName="title">
      {props.title}
    </div>
    {(props.description || (props.legend && props.legend.length > 0)) && (
      <div styleName="subContainer">
        {props.description && (
          <div styleName="description">
            {props.description}
          </div>
        )}
        {props.legend && props.legend.length > 0 && (
          <div styleName={classNames('legend', { legendLeft: props.description === '' })}>
            {props.legend.map((item, index) => (
              <div
                key={item.label}
                styleName="legendItem"
              >
                {props.legendToggleCallback ? (
                  <>
                    <span
                      styleName="checkbox"
                      style={{ backgroundColor: item.color }}
                      onClick={() => props.legendToggleCallback(index)}
                    >
                      {!item.deselected && (
                        <span
                          styleName="checkboxIcon"
                          className="pyreneIcon-check"
                        />
                      )}
                    </span>
                  </>
                ) : (
                  <span
                    styleName="circle"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                {item.label}
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
  legend: {},
  legendToggleCallback: null,
};

Header.propTypes = {
  /**
    * Sets the description.
    */
  description: PropTypes.string,
  /**
   * Sets the legend items.
   * Type: [{ color: string, deselected: bool, label: string }]
   */
  legend: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    deselected: PropTypes.bool,
    label: PropTypes.string,
  })),
  /**
   * If callback is provided, the legend circles change to checkboxes in order to toggle data.
   */
  legendToggleCallback: PropTypes.func,
  /**
   * Sets the title.
   */
  title: PropTypes.string.isRequired,
};

export default Header;

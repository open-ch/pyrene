import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Icon } from 'pyrene';
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
                    <input
                      type="checkbox"
                      styleName="checkbox"
                      style={{ backgroundColor: item.color }}
                      onChange={() => props.legendToggleCallback(index)}
                      checked={!item.deselected}
                    />
                    <span
                      styleName="checkboxCustom"
                      onClick={() => props.legendToggleCallback(index)}
                    >
                      {!item.deselected && (
                        <Icon
                          name="check"
                          color="white"
                          type="inline"
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
  legend: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    deselected: PropTypes.bool,
    label: PropTypes.string,
  })),
  legendToggleCallback: PropTypes.func,
  /**
   * Sets the title.
   */
  title: PropTypes.string.isRequired,
};

export default Header;

import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './header.css';

/**
 * Headers are used to display a title, description and legends along with chart components.
 */
const Header = (props) => (
  <div className={styles.container}>
    <div className={styles.title}>
      {props.title}
    </div>
    {(props.description || (props.legend && props.legend.length > 0)) && (
      <div className={styles.subContainer}>
        {props.description && (
          <div className={styles.description}>
            {props.description}
          </div>
        )}
        {props.legend && props.legend.length > 0 && (
          <div className={clsx(styles.legend, { [styles.legendLeft]: props.description === '' })}>
            {props.legend.map((item, index) => (
              <div
                key={item.label}
                className={styles.legendItem}
              >
                {props.legendToggleCallback ? (
                  <>
                    <div
                      className={styles.checkbox}
                      style={{ backgroundColor: item.color }}
                      onClick={() => props.legendToggleCallback(index)}
                    >
                      {!item.deselected && (
                        <span
                          className={clsx(styles.checkboxIcon, 'pyreneIcon-check')}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <span
                    className={styles.circle}
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
  legend: [],
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

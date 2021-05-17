import React from 'react';
import clsx from 'clsx';
import { components } from 'react-select';
import styles from './multiSelectMenuWithOptions.css';

/* eslint-disable react/prop-types, react/jsx-props-no-spreading */
/* props are controlled by the parent component of react-select */

const MultiSelectMenuWithOptions = (props) => (
  <components.Menu {...props}>
    {props.getValue().length > 0 && (
      <div className={styles.selectMenuWithOptions}>
        {props.getValue().map((option) => (
          <div className={clsx(styles.selectOption, { [styles.invalid]: option.invalid })} key={option.value}>
            <div className={styles.optionLabel}>{option.label}</div>
            <div className={styles.clearBox} onClick={() => props.setValue(props.getValue().filter((e) => e !== option))}>
              <div className={clsx(styles.clearIcon, 'pyreneIcon-delete')} />
            </div>
          </div>
        ))}
      </div>
    )}
    {props.children}
  </components.Menu>
);


MultiSelectMenuWithOptions.displayName = 'MultiSelectMenuWithOptions';

export default MultiSelectMenuWithOptions;

/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { components, MenuProps } from 'react-select';
import { Option } from './types';
import styles from './multiSelectMenuWithOptions.css';

const MultiSelectMenuWithOptions: FunctionComponent<MenuProps<Option, boolean>> = (props) => (
  <components.Menu {...props}>
    <>
      {props.getValue().length > 0 && (
        <div className={styles.selectMenuWithOptions}>
          {props.getValue().map((option) => (
            <div className={clsx(styles.selectOption, { [styles.invalid]: option.invalid })} key={option.value}>
              <div className={styles.optionLabel}>{option.label}</div>
              <div className={styles.clearBox} onClick={() => props.setValue(props.getValue().filter((e) => e !== option), 'clear')}>
                <div className={clsx(styles.clearIcon, 'pyreneIcon-delete')} />
              </div>
            </div>
          ))}
        </div>
      )}
      {props.children}
    </>
  </components.Menu>
);

export default MultiSelectMenuWithOptions;

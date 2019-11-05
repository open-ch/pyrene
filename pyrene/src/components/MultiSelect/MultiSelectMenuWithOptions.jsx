import React from 'react';
import classNames from 'classnames';
import { components } from 'react-select';
import './multiSelectMenuWithOptions.css';

/* eslint-disable react/prop-types, react/jsx-props-no-spreading */
/* props are controlled by the parent component of react-select */

const MultiSelectMenuWithOptions = (props) => (
  <components.Menu {...props}>
    {props.getValue().length > 0 && (
      <div styleName="selectMenuWithOptions">
        {props.getValue().map((option) => (
          <div styleName={classNames('selectOption', { invalid: option.invalid })} key={option.value}>
            <div styleName="optionLabel">{option.label}</div>
            <div styleName="clearBox" onClick={() => props.setValue(props.getValue().filter((e) => e !== option))}>
              <div styleName="clearIcon" className="pyreneIcon-delete" />
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

/* eslint-disable react/display-name */
import React from 'react';
import { RadioPopoverProps } from './RadioPopover';
import { Example, StateProvider } from '../../examples/Example';
import { Option } from './types';

interface State {
  value: number | string,
}

const RadioGroup: Example<RadioPopoverProps, State> = {
  props: {
    options: [{ label: 'Beer 🍺', value: 'beer' }, { label: 'Coffee ☕️', value: 'coffee' }, { label: 'Coffeebeer 🍹😎', value: 'coffeebeer' }],
    onChange: (stateProvider: StateProvider<State>): RadioPopoverProps['onChange'] => (option) => stateProvider.setState({ value: option.value }),
    value: (stateProvider) => stateProvider.state.value || 'beer',
    renderLabel: (option: Option) => (
      <span>
        <strong>
          Chosen:
        </strong>
        {` ${option?.label || ''}`}
      </span>
    ),
    renderHelpSection: () => (
      <span>
        Define the drink with which you feel like a party animal.
      </span>
    ),
  },
  category: 'Form',
};

export default RadioGroup;

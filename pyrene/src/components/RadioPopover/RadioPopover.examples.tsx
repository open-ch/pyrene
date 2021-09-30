/* eslint-disable react/display-name */
import React from 'react';

const RadioGroup = {};

RadioGroup.props = {
  options: [{ label: 'Beer 🍺', value: 'beer' }, { label: 'Coffee ☕️', value: 'coffee' }, { label: 'Coffeebeer 🍹😎', value: 'coffeebeer' }],
  onChange: (stateProvider) => (value) => stateProvider.setState({ value: value.value }),
  value: (stateProvider) => stateProvider.state.value || 'beer',
  renderLabel: (value) => (
    <span>
      <strong>
        Chosen:
      </strong>
      {` ${value.label}`}
    </span>
  ),
  renderHelpSection: () => (
    <span>
      Define the drink with which you feel like a party animal.
    </span>
  ),
};

RadioGroup.category = 'Form';

export default RadioGroup;

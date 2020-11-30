/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Example, StateProvider } from '../../examples/Example';
import { RadioButtonProps } from './RadioButton';

export interface State {
  value: string | number
}

const RadioButton: Example<RadioButtonProps, State> = {};

RadioButton.props = {
  checked: false,
  disabled: false,
  invalid: false,
  label: 'one',
  name: 'one',
  readonly: false,
  value: '',
};

RadioButton.examples = [
  {
    props: {
      checked: false,
      disabled: false,
      invalid: false,
      label: 'one',
      name: 'zoo',
      readonly: false,
      value: 'one',
    },
    description: '',
  }, {
    props: {
      checked: false,
      disabled: false,
      invalid: false,
      label: 'two',
      name: 'zoo',
      readonly: false,
      value: 'two',
    },
    description: '',
  },
];

RadioButton.category = 'Form';

export default RadioButton;

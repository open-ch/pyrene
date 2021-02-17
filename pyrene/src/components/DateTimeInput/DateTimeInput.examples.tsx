import { Example } from '../../examples/Example';
import { DateTimeInputProps } from './DateTimeInput';


const DateTimeInput: Example<DateTimeInputProps> = {};

DateTimeInput.props = {
  onChange: () => {},
};

DateTimeInput.examples = [
  {
    props: {
      onChange: () => {},
    },
  },
];

DateTimeInput.category = 'Form';

export default DateTimeInput;

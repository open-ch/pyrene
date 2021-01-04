import { KeyValueTableProps } from './KeyValueTable';
import { Example } from '../../examples/Example';

const examples: Example<KeyValueTableProps> = {
  props: {
    title: 'KeyValue table',
    rows: [
      { key: 'Key1', value: 'value1' },
      { key: 'Key2', value: 'value2' },
      { key: 'Key3', value: 'value3' },
      { key: 'Short key', value: 'A very long value as long as the stream of time' },
      {
        key: 'Super Long Key Super Long Key Super Long Key Super Long Key Super Long Key Super Long Key SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey ',
        value: 'Super Long Value Super Long Value Super Long Value Super Long Value Super Long Value SuperLongValue SuperLongValue SuperLongValue SuperLongValue SuperLongValue SuperLongValue SuperLongValue',
      },
    ],
    keyWidth: 160,
  },
};

examples.category = 'Data';

export default examples;

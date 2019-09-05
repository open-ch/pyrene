const examples = {
  props: {
    title: 'KeyValue table',
    rows: [
      { key: 'Key', value: 'value' },
      { key: 'Key2', value: 'value2' },
      { key: 'Key3', value: 'value3' },
      {
        key: 'Super Long Key Super Long Key Super Long Key Super Long Key Super Long Key Super Long Key SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey ',
        value: 'Super Long Value Super Long Value Super Long Value Super Long Value Super Long Value SuperLongValue SuperLongValue SuperLongValue SuperLongValue SuperLongValue SuperLongValue SuperLongValue',
      },
    ],
  },
};

examples.category = 'Data';

export default examples;

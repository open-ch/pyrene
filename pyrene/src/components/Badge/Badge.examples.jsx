const examples = {};

examples.props = {
  label: 'Security Alert',
  type: 'danger',
  onClick: () => { alert('Dangerous!'); },
};

examples.examples = [
  {
    props: {
      label: 'Neutral',
      type: 'neutral',
      onClick: () => { alert('Neutral!'); },
    },
  },
  {
    props: {
      label: 'Info',
      type: 'info',
      onClick: () => { alert('We want information!'); },
    },
  },
  {
    props: {
      label: 'Success',
      type: 'success',
      onClick: () => { alert('This is a success!'); },
    },
  },
  {
    props: {
      label: 'Warning',
      type: 'warning',
      onClick: () => { alert('Warning!'); },
    },
  },
  {
    props: {
      label: 'Security Alert',
      type: 'danger',
      onClick: () => { alert('Dangerous!'); },
    },
  },
];

export default examples;
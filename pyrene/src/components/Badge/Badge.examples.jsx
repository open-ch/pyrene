const examples = {};

examples.props = {
  label: 'Security Alert',
  maxWidth: 160,
  type: 'danger',
  onClick: () => { alert('Dangerous!'); },
};

examples.examples = [
  {
    props: {
      label: 'A neutral label happy to be left-aligned',
      maxWidth: 120,
      textOverflow: 'ellipsis',
      type: 'neutral',
      onClick: () => { alert('Neutral!'); },
    },
  },
  {
    props: {
      label: 'Info',
      maxWidth: 100,
      type: 'info',
      onClick: () => { alert('We want information!'); },
    },
  },
  {
    props: {
      label: 'Success',
      maxWidth: 100,
      type: 'success',
      onClick: () => { alert('This is a success!'); },
    },
  },
  {
    props: {
      label: 'Warning',
      maxWidth: 100,
      type: 'warning',
      onClick: () => { alert('Warning!'); },
    },
  },
  {
    props: {
      label: 'A Very Important Security Alert',
      maxWidth: 100,
      textAlign: 'center',
      textOverflow: '',
      type: 'danger',
      onClick: () => { alert('Dangerous!'); },
    },
  },
];

export default examples;

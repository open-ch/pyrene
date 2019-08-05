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
      label: 'Long Neutral Label',
      maxWidth: 80,
      type: 'neutral',
      onClick: () => { alert('Neutral!'); },
    },
    description: 'Long Neutral Label',
  },
  {
    props: {
      label: 'Clipped Information',
      maxWidth: 80,
      styling: 'clip',
      type: 'info',
      onClick: () => { alert('We want information!'); },
    },
    description: 'Clipped Info',
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
      label: 'Very Important Security Alert',
      maxWidth: 100,
      styling: 'fulltext',
      type: 'danger',
      onClick: () => { alert('Dangerous!'); },
    },
    description: 'Very Important Security Alert',
  },
];

export default examples;

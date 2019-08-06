const examples = {};

examples.props = {
  label: 'Security Alert',
  maxWidth: 120,
  type: 'danger',
  onClick: () => { alert('Dangerous!'); },
};

examples.examples = [
  {
    props: {
      label: 'Release Notes',
      maxWidth: 100,
      type: 'neutral',
    },
    description: 'Unclickable badge.',
  },
  {
    props: {
      label: 'More Information',
      maxWidth: 80,
      type: 'info',
      onClick: () => { alert('We want information!'); },
    },
    description: 'Clickable badge alerting information.',
  },
  {
    props: {
      label: 'Success',
      maxWidth: 100,
      type: 'success',
      onClick: () => { alert('This is a success!'); },
    },
    description: 'Clickable badge alerting success.',
  },
  {
    props: {
      label: 'Warning',
      maxWidth: 100,
      type: 'warning',
    },
    description: 'Unclickable badge.',
  },
  {
    props: {
      label: 'Danger',
      maxWidth: 100,
      type: 'danger',
      onClick: () => { alert('Dangerous!'); },
    },
    description: 'Clickable badge alerting danger.',
  },
];

export default examples;

import { BadgeProps } from './Badge';
import { Example } from '../../examples/Example';

const examples: Example<BadgeProps> = {};

examples.props = {
  label: 'Security Alert',
  maxWidth: 120,
  type: 'danger',
  onClick: () => { alert('Dangerous!'); }, // eslint-disable-line no-alert
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
      onClick: () => { alert('We want information!'); }, // eslint-disable-line no-alert
    },
    description: 'Clickable badge alerting information.',
  },
  {
    props: {
      label: 'Success',
      maxWidth: 100,
      type: 'success',
      onClick: () => { alert('This is a success!'); }, // eslint-disable-line no-alert
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
      onClick: () => { alert('Dangerous!'); }, // eslint-disable-line no-alert
    },
    description: 'Clickable badge alerting danger.',
  },
];

examples.category = 'Other';

export default examples;

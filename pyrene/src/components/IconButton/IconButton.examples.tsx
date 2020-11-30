import { Example } from '../../examples/Example';
import { IconButtonProps } from './IconButton';

const IconButton: Example<IconButtonProps> = {};

IconButton.props = {
  icon: 'hot',
};

IconButton.examples = [
  {
    props: {
      icon: 'info',
      type: 'info',
      onClick: () => alert('Hello, world!'),
    },
    description: 'Info alert',
  },
  {
    props: { icon: 'hot' },
    description: 'Hot link of the day ;-)',
  },
  {
    props: {
      icon: 'alarmActive',
      disabled: true,
    },
    description: 'Disabled alarm',
  },
];

IconButton.category = 'Interaction';

export default IconButton;

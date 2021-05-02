import { Example } from '../../examples/Example';
import { LinkProps } from './Link';

const Link: Example<LinkProps> = {
  props: {
    label: 'Click Me',
    path: '#',
  },
  examples: [
    {
      props: { label: 'standalone', path: '#' },
      description: '',
    }, {
      props: { type: 'inline', label: 'inline link', path: '#' },
      description: '',
    },
  ],
  category: 'Interaction',
};

export default Link;

import { Example } from '../../examples/Example';
import { LinkProps } from './Link';

const Link : Example<LinkProps> = {};

Link.props = {
  label: 'Click Me',
  path: '#',
};

Link.examples = [
  {
    props: { label: 'standalone', path: '#' },
    description: '',
  }, {
    props: { type: 'inline', label: 'inline link', path: '#' },
    description: '',
  },
];

Link.category = 'Interaction';

export default Link;

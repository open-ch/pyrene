import { Example } from '../../examples/Example';
import { HeadingProps } from './Heading';

const Heading: Example<HeadingProps> = {};

Heading.props = {
  children: 'Heading',
};

Heading.examples = [
  {
    props: {
      children: 'Heading One',
    },
    description: 'Heading level 1',
  },
  {
    props: {
      children: 'Heading Two',
      level: 2,
    },
    description: 'Heading level 2',
  },
  {
    props: {
      children: 'Heading Three',
      level: 3,
    },
    description: 'Heading level 3',
  },
  {
    props: {
      children: 'Heading Four',
      level: 4,
    },
    description: 'Heading level 4',
  },
];

Heading.category = 'Layout';

export default Heading;

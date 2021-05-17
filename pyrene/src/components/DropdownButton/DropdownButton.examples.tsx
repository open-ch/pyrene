import { Example } from '../../examples/Example';
import { DropdownButtonProps } from './DropdownButton';

const examples: Example<DropdownButtonProps> = {};

examples.props = {
  label: 'Actions',
  icon: 'errorOutline',
  actions: [
    { label: 'action 1', onClick: () => {} },
    { label: 'action 2', onClick: () => {} },
  ],
};

examples.category = 'Interaction';

export default examples;

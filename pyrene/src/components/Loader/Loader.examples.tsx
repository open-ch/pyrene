import { Example } from '../../examples/Example';
import { LoaderProps } from './Loader';

const Loader: Example<LoaderProps> = {};

Loader.props = {
  size: 'small',
  styling: 'dark',
  type: 'standalone',
};

Loader.category = 'Other';

export default Loader;

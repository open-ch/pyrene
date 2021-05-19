import { Example } from '../../examples/Example';
import { BannerProps } from './Banner';

const Banner: Example<BannerProps> = {};

Banner.props = {
  label: 'There are over 10’000 objects to load.',
  type: 'info',
  styling: 'standard',
  children: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for the faithfulness and vigilance.',
};

Banner.category = 'Other';

export default Banner;

const IconButton = {};

IconButton.props = {
  icon: 'hot',
};

IconButton.examples = [
  {
    props: { icon: 'info' },
    description: 'Info link',
  },
  {
    props: { icon: 'hot' },
    description: 'Hot link of they day ;-)',
  },
];

IconButton.category = 'Interaction';

export default IconButton;

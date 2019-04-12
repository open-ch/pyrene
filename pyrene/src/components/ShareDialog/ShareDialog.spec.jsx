import React from 'react';

import ShareDialog from './ShareDialog';
import Button from '../Button/Button';

const props = {
  link: 'someLink',
};

describe('<ShareDialog />', () => {
  it('renders without crashing', () => {
    mount(<ShareDialog {...props} />);
  });

  it('renders dialog on click', () => {
    const rendered = mount(<ShareDialog {...props} />);
    rendered.find(Button).simulate('click');
  });

});

import React from 'react';

import Modal from './Modal';

const props = {
  title: 'titleLabel',
  size: 'large',
  renderCallback: () => <div>Content</div>, // eslint-disable-line react/display-name
};

describe('<Modal />', () => {
  it('renders without crashing', () => {
    shallow(<Modal {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<Modal {...props} />);

    expect(rendered.find('.titleBar')).toHaveLength(1);
    expect(rendered.contains(props.title)).toBe(true);

    expect(rendered.find('.contentContainer')).toHaveLength(1);
    expect(rendered.contains(props.renderCallback())).toBe(true);

    expect(rendered.find('Button Bar')).toHaveLength(1);
  });
});

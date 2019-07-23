import React from 'react';

import Table from './Table';

const props = {
  keyField: 'name',
  data: [{ name: 'Meredith Carney', age: 23 }, { name: 'Savage Weeks', age: 21 }],
  columns: [{ id: 'name', headerName: 'Name' }, { id: 'age', headerName: 'Age' }],
};

describe('<Table />', () => {

  it('renders without crashing', () => {
    shallow(<Table {...props} />);
  });

  it('should inject a custom div into React Table when an error prop exists', () => {
    const propsWithError = { ...props, error: 'Test Error' };
    const wrapper = mount(<Table {...propsWithError} />);

    expect(wrapper.find('div.customTableBody'))
      .toHaveLength(1);
    expect(wrapper.contains('Test Error'))
      .toBe(true);
  });

  it('should inject a custom div into React Table when there is no data', () => {
    const noDataProps = { ...props };
    noDataProps.data = [];

    const wrapper = mount(<Table {...noDataProps} />);

    expect(wrapper.find('div.customTableBody'))
      .toHaveLength(1);
    expect(wrapper.contains('No data found.'))
      .toBe(true);
  });

  it('should contain a loader while loading', () => {
    const wrapper = mount(<Table {...props} loading />);

    expect(wrapper.find('div.loader'))
      .toHaveLength(1);
  });

  it('should call button functions on click', () => {
    const buttonTestProps = { ...props };
    const onClick = jest.fn();

    buttonTestProps.actions = [{
      icon: 'search',
      label: 'Single',
      callback: onClick,
      active: 'single',
    }, {
      icon: 'delete',
      label: 'Multi',
      callback: onClick,
      active: 'multi',
    }, {
      icon: 'info',
      label: 'Always',
      callback: onClick,
      active: 'always',
    }];

    const wrapper = shallow(<Table {...buttonTestProps} />);

    wrapper.find('Button[label="Single"]')
      .simulate('click');
    expect(onClick)
      .toHaveBeenCalledTimes(1);

    wrapper.find('Button[label="Multi"]')
      .simulate('click');
    expect(onClick)
      .toHaveBeenCalledTimes(2);

    wrapper.find('Button[label="Always"]')
      .simulate('click');
    expect(onClick)
      .toHaveBeenCalledTimes(3);
  });

});

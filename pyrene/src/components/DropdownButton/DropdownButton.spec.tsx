import React from 'react';
import { mount, shallow } from 'enzyme';

import DropdownButton from './DropdownButton';
import Popover from '../Popover/Popover';
import Loader from '../Loader/Loader';

const props = {
  label: 'tbd',
  actions: [{ label: 'sub', onClick: jest.fn() }],
};

describe('<DropdownButton />', () => {
  it('renders without crashing', () => {
    mount(<DropdownButton {...props} />);
  });

  it('renders dropdown on click', () => {
    const dropdownButton = shallow(<DropdownButton {...props} />);

    // dropdown is not opened by default
    expect(dropdownButton.find(Popover).props().displayPopover).toEqual(false);

    // open the dropdown
    dropdownButton.find('button').simulate('click');

    dropdownButton.update();

    expect(dropdownButton.find(Popover).props().displayPopover).toEqual(true);

  });

  it('renders loader', () => {
    const dropdownButton = shallow(<DropdownButton {...props} loading />);

    // in case of loader button cannot be clicked
    expect(dropdownButton.find(Loader)).toHaveLength(1);
    expect(dropdownButton.find('button').props().disabled).toEqual(true);
  });

  it('renders disabled button', () => {
    const dropdownButton = shallow(<DropdownButton {...props} disabled />);
    expect(dropdownButton.find('button').props().disabled).toEqual(true);
  });

  it('triggers click on action', () => {

    const onClick = jest.fn();

    const dropdownButton = shallow(<DropdownButton {...props} actions={[{ label: 'sub', onClick: () => onClick() }]} />);

    // open the dropdown
    dropdownButton.find('button').simulate('click');
    dropdownButton.update();

    // find the first action (passing only one...)
    const onClickAction = dropdownButton.find(Popover).props().renderPopoverContent().props.actions[0];

    onClickAction.onClick();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

});

import React from 'react';

import SimpleTable from './SimpleTable.jsx';
import Loader from '../Loader/Loader';

const selectedActionClick = jest.fn();

const props = {
  actions: [
    {
      label: 'Name',
      onClick: (rowData) => selectedActionClick(rowData.name),
    },
    {
      label: 'Age',
      onClick: (rowData) => selectedActionClick(rowData.age),
    },
  ],
  data: [{ name: 'Meredith Carney', age: 23 }, { name: 'Savage Weeks', age: 21 }],
  columns: [
    { id: 'name', headerName: 'Name', accessor: 'name' },
    { id: 'age', headerName: 'Age', accessor: (d) => d.age },
    {
      id: 'customAge',
      headerName: 'Custom Age',
      accessor: (d) => d.age,
      cellRenderCallback: (d) => `Custom age is ${d.value}`,
    },
  ],
};

describe('<SimpleTable />', () => {
  it('renders without crashing', () => {
    shallow(<SimpleTable {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<SimpleTable {...props} />);
    // header
    expect(rendered.contains('Name')).toBe(true);
    expect(rendered.contains('Age')).toBe(true);
    // first row
    expect(rendered.contains('Meredith Carney')).toBe(true);
    expect(rendered.contains(23)).toBe(true);
    // second row
    expect(rendered.contains('Savage Weeks')).toBe(true);
    expect(rendered.contains(21)).toBe(true);
  });

  it('renders the cellRenderCallback correctly', () => {
    const rendered = shallow(<SimpleTable {...props} />);
    expect(rendered.contains('Custom age is 23')).toBe(true);
    expect(rendered.contains('Custom age is 21')).toBe(true);
  });

  it('should contain a loader while loading', () => {
    const rendered = mount(<SimpleTable {...props} loading />);
    expect(rendered.find(Loader)).toHaveLength(1);
  });

  it('should show "No data found" when there is no data', () => {
    const rendered = mount(<SimpleTable {...{ ...props, data: [] }} />);
    expect(rendered.contains('No data found.')).toBe(true);
  });

  it('does not render an action button if no action has been passed', () => {
    const rendered = mount(<SimpleTable {...{ ...props, actions: [] }} />);
    const actionButtonsFound = rendered.find('div .action').length;
    expect(actionButtonsFound).toBe(0);
  });

  it('renders an action menu with clickable links when the action button is pressed.', () => {
    const rendered = mount(<SimpleTable {...props} />);
    let actionMenuContainerFound = rendered.find('.actionMenuContainer').length;
    const lastActionButton = rendered.find('div .action').last();
    // We have no action list yet since we have not clicked the action button
    expect(actionMenuContainerFound).toBe(0);
    lastActionButton.simulate('click');
    actionMenuContainerFound = rendered.find('.actionMenuContainer').length;
    expect(actionMenuContainerFound).toBe(1);
    // Action button has been clicked, we have a menu with 2 action links now
    expect(rendered.find('.actionLink').length).toBe(2);
    rendered.find('.actionLink').last().simulate('click');
    expect(selectedActionClick).toHaveBeenCalledTimes(1);
  });
});

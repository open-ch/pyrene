import React from 'react';

import BarChartTable from './BarChartTable.jsx';

const columns = {
  label: {
    accessor: d => d.application,
    title: 'Application',
  },
  primaryValue: {
    accessor: d => d.volume,
    title: 'Volume',
    formatter: d => `${d} GB`,
  },
};

const props = {
  data: [
    {
      application: 'INFLUXdev',
      volume: 91.3,
      shareOfTotal: 12.76,
    },
    {
      application: 'MSS KAFKA (DEV)',
      volume: 89.7,
      shareOfTotal: 12.55,
    },
  ],
  columns: {
    ...columns,
    secondaryValue: {
      accessor: d => d.shareOfTotal,
      title: 'Share of Total',
      formatter: d => `${d} %`,
    },
  },
  header: 'Header',
  displayedRows: 1,
};

const propsOnlyPrimaryValue = {
  ...props,
  columns: columns,
};

const propsComparison = {
  data: [
    {
      application: 'INFLUXdev',
      volumeCurrent: 91.3,
      volumePrevious: 103.8,
    },
    {
      application: 'MSS KAFKA (DEV)',
      volumeCurrent: 89.7,
      volumePrevious: 88.8,
    },
  ],
  columns: {
    label: {
      accessor: d => d.application,
      title: 'Application',
    },
    primaryValue: {
      accessor: d => d.volumeCurrent,
      title: 'Current period',
      formatter: d => `${d} GB`,
    },
    secondaryValue: {
      accessor: d => d.volumePrevious,
      title: 'Previous period',
      formatter: d => `${d} GB`,
    },
  },
  header: 'Header',
  description: 'Description',
};

describe('<BarChartTable />', () => {
  it('renders without crashing', () => {
    shallow(<BarChartTable {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(<BarChartTable {...props} />);
    // Header
    expect(rendered.contains('Header')).toBe(true);
    expect(rendered.contains('Description')).toBe(false);
    // Table
    // header
    const expectedHeader = ['', 'Volume', '', 'Share of Total'];
    rendered.find('thead').find('th').forEach((th, idx) => {
      expect(th.text()).toBe(expectedHeader[idx]);
    });
    // rows
    rendered.find('tbody').find('tr').forEach((tr, rowIndex) => {
      const cells = tr.find('td');
      expect(cells.at(0).text()).toBe(props.data[rowIndex].application);
      expect(cells.at(1).find('.barContainer').exists()).toBe(true);
      expect(cells.at(2).text()).toBe(props.columns.primaryValue.formatter(props.data[rowIndex].volume));
      expect(cells.at(3).text()).toBe(props.columns.secondaryValue.formatter(props.data[rowIndex].shareOfTotal));
    });
  });

  it('renders without secondaryValue without crashing', () => {
    shallow(<BarChartTable {...propsOnlyPrimaryValue} />);
  });

  it('renders its content without secondaryValue', () => {
    const rendered = mount(<BarChartTable {...propsOnlyPrimaryValue} />);
    // Header
    expect(rendered.contains('Header')).toBe(true);
    expect(rendered.contains('Description')).toBe(false);
    // Table
    // header
    const expectedHeader = ['', 'Volume', '', 'Share of Total'];
    rendered.find('thead').find('th').forEach((th, idx) => {
      expect(th.text()).toBe(expectedHeader[idx]);
    });
    // rows
    rendered.find('tbody').find('tr').forEach((tr, rowIndex) => {
      const cells = tr.find('td');
      expect(cells.at(0).text()).toBe(props.data[rowIndex].application);
      expect(cells.at(1).find('.barContainer').exists()).toBe(true);
      expect(cells.at(2).text()).toBe(props.columns.primaryValue.formatter(props.data[rowIndex].volume));
      expect(cells).toHaveLength(3);
    });
  });

  it('renders butterfly without crashing', () => {
    shallow(<BarChartTable {...propsComparison} type="butterfly" />);
  });

  it('renders butterfly content', () => {
    const rendered = mount(<BarChartTable {...propsComparison} type="butterfly" />);
    // Header
    expect(rendered.contains('Header')).toBe(true);
    expect(rendered.contains('Description')).toBe(true);
    // Table
    // header
    const expectedHeader = ['', '', 'Current period', '', 'Previous period', ''];
    rendered.find('thead').find('th').forEach((th, idx) => {
      expect(th.text()).toBe(expectedHeader[idx]);
    });
    // rows
    rendered.find('tbody').find('tr').forEach((tr, rowIndex) => {
      const cells = tr.find('td');
      expect(cells.at(0).text()).toBe(propsComparison.data[rowIndex].application);
      expect(cells.at(1).text()).toBe(propsComparison.columns.primaryValue.formatter(propsComparison.data[rowIndex].volumeCurrent));
      expect(cells.at(2).find('.barContainer').exists()).toBe(true);
      expect(cells.at(3).find('.verticalLine').exists()).toBe(true);
      expect(cells.at(4).find('.barContainer').exists()).toBe(true);
      expect(cells.at(5).text()).toBe(propsComparison.columns.secondaryValue.formatter(propsComparison.data[rowIndex].volumePrevious));
    });
  });

  it('renders comparison without crashing', () => {
    shallow(<BarChartTable {...propsComparison} type="comparison" />);
  });

  // Show more Popover

  it('renders Show more link', () => {

    const rendered = mount(<BarChartTable {...props} />);
    expect(rendered.contains('Show all (2)')).toBe(true);
  });

  it('reacts to clicking', () => {
    const rendered = mount(<BarChartTable {...props} />);
    const showMoreLink = rendered.find('.showMoreLink');
    expect(showMoreLink.find('.popOverPlaceholder')).toHaveLength(0);
    showMoreLink.props().onClick();
    rendered.update();
    expect(rendered.find('.showMoreLink').find('.popOverPlaceholder')).toHaveLength(1);
  });
});

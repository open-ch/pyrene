import React from 'react';

import BarChartTable from './BarChartTable.jsx';


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
    label: {
      accessor: d => d.application,
      title: 'Application',
    },
    primaryValue: {
      accessor: d => d.volume,
      title: 'Volume',
      formatter: d => `${d} GB`,
    },
    secondaryValue: {
      accessor: d => d.shareOfTotal,
      title: 'Share of Total',
      formatter: d => `${d} %`,
    },
  },
  header: 'Header',
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
      expect(cells.at(1).find('rect').at(0).prop('className')).toBe('vx-bar');
      expect(cells.at(2).text()).toBe(props.columns.primaryValue.formatter(props.data[rowIndex].volume));
      expect(cells.at(3).text()).toBe(props.columns.secondaryValue.formatter(props.data[rowIndex].shareOfTotal));
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
    const expectedHeader = ['', '', 'Current periodPrevious period', '', ''];
    rendered.find('thead').find('th').forEach((th, idx) => {
      expect(th.text()).toBe(expectedHeader[idx]);
    });
    // rows
    rendered.find('tbody').find('tr').forEach((tr, rowIndex) => {
      const cells = tr.find('td');
      expect(cells.at(0).text()).toBe(propsComparison.data[rowIndex].application);
      expect(cells.at(1).text()).toBe(propsComparison.columns.primaryValue.formatter(propsComparison.data[rowIndex].volumeCurrent));
      expect(cells.at(2).find('rect').at(0).prop('className')).toBe('vx-bar');
      expect(cells.at(2).find('rect').at(1).prop('className')).toBe('vx-bar');
      expect(cells.at(3).text()).toBe(propsComparison.columns.secondaryValue.formatter(propsComparison.data[rowIndex].volumePrevious));
    });
  });

  it('renders comparison without crashing', () => {
    shallow(<BarChartTable {...propsComparison} type="comparison" />);
  });
});

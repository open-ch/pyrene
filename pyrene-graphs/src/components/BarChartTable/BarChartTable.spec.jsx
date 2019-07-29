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
  title: 'Title',
  subtitle: 'Subtitle',
};

describe('<BarChartTable />', () => {
  it('renders without crashing', () => {
    shallow(<BarChartTable {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(<BarChartTable {...props} />);
    // Title
    expect(rendered.contains('Title')).toBe(true);
    expect(rendered.contains('Subtitle')).toBe(true);
    // header
    const expectedHeader = ['Application', 'Volume', '', 'Share of Total'];
    rendered.find('thead').find('th').forEach((th, idx) => {
      expect(th.text()).toBe(expectedHeader[idx]);
    });
    // rows
    rendered.find('tbody').find('tr').forEach((tr, rowIndex) => {
      const cells = tr.find('td');
      expect(cells.at(0).text()).toBe(props.data[rowIndex].application);
      expect(cells.at(1).find('rect').prop('className')).toBe('vx-bar');
      expect(cells.at(2).text()).toBe(props.columns.primaryValue.formatter(props.data[rowIndex].volume));
      expect(cells.at(3).text()).toBe(props.columns.secondaryValue.formatter(props.data[rowIndex].shareOfTotal));
    });
  });
});

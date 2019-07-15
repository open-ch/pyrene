import React from 'react';
import '../../../css/componentPage.css';
import {
  Table, createSimpleFilter, createDataFilter,
} from 'pyrene/dist/pyrene.dev';

import CodeBox from '../../common/PageElements/HowTo/CodeBox/CodeBox';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';
import DisplayBox from '../../common/PageElements/HowTo/DisplayBox/DisplayBox';

/* eslint-disable react/no-multi-comp */

const data = [
  {
    name: 'My Name', date: '11.6.19', city: 'Zurich', country: 'CH', hidden: 'Open',
  },
  {
    name: 'Your Name', date: '-', city: 'Zurich', country: 'CH', hidden: 'Open',
  },
  {
    name: 'Complicated Name', date: 'Monday', city: 'Zurich', country: 'CH', hidden: 'Open',
  },
  {
    name: 'Named', date: '-', city: 'Brno', country: 'CZ', hidden: 'Close',
  },
  {
    name: 'Da Name', date: '-', city: 'Taumatawhakaanhu', country: 'NZ', hidden: 'Open',
  },
  {
    name: 'Another', date: '-', city: 'Empty City', country: '', hidden: 'Open',
  },
  {
    name: 'Last', date: '-', city: 'Null City', country: null, hidden: 'Open',
  },
  {
    name: 'Really Last', date: '-', city: 'False City', country: false, hidden: 'Open',
  },
];


const columns = [
  { headerName: 'Name', accessor: 'name', id: 'ispName' },
  { headerName: 'Date', accessor: 'date', id: 'date' },
  { headerName: 'City', accessor: 'city', id: 'city' },
  { headerName: 'Country', accessor: 'country', id: 'country' },
];


class SimpleFilteredTable extends React.Component {

     filters = [{
       type: 'multiSelect',
       label: 'City',
       accessor: 'city',
       id: 'city',
       defaultValue: [
         { value: 'Zurich', label: 'Zurich' },
         { value: 'Brno', label: 'Brno' },
       ],
       options: [
         { value: 'Zurich', label: 'Zurich' },
         { value: 'Brno', label: 'Brno' },
         { value: 'Taumatawhakaanhu', label: 'Taumatawhakaanhu' },
         { value: 'New York', label: 'New York' },
         { value: '', label: '-empty-' }, { value: 'CH', label: 'CH' },
       ],
     }, {
       type: 'text',
       label: 'Name',
       accessor: 'name',
       id: 'name',
       defaultValue: 'Name',
     }, {
       type: 'text',
       label: 'Name Reverse',
       id: 'name_reverse',
       customFilter: (filteredInput, d) => d.name.split('').reverse().join('').includes(filteredInput),
       defaultValue: 'det',
     }];

    state = {
      filterValues: {},
    };

    render() {
      const { filterFunc, filterProps } = createSimpleFilter(this.filters);

      return (
        <Table
          columns={columns}
          data={filterFunc(this.state.filterValues, data)}
          keyField="id"
          filters={filterProps}
          onFilterChange={filterValues => this.setState({ filterValues })}
        />
      );
    }

}


class DataFilteredTable extends React.Component {

     filters = [{
       type: 'singleSelect',
       label: 'City',
       accessor: 'city',
       id: 'city',
       optionsAccessors: { value: d => d.city, label: d => `City: ${d.city}` },
       defaultValue: { value: 'Zurich', label: 'Zurich' },
     }, {
       type: 'singleSelect',
       label: 'Country',
       accessor: 'country',
       id: 'country',
       optionsAccessors: { value: d => d.country, label: d => (d.country === null ? 'null' : d.country === '' ? 'empty' : d.country === false ? 'false' : d.country) }, // eslint-disable-line no-nested-ternary
     }, {
       type: 'text',
       label: 'Name',
       accessor: 'name',
       id: 'name',
     }];

     state = {
       filterValues: {},
     };

     render() {
       const { dataFilterFunc, filterProps } = createDataFilter(this.filters, data);

       return (
         <Table
           columns={columns}
           data={dataFilterFunc(this.state.filterValues)}
           keyField="id"
           filters={filterProps}
           onFilterChange={filterValues => this.setState({ filterValues })}
         />
       );
     }

}

const SimpleFilterCode = `
class SimpleFilteredTable extends React.Component {

    filters = [{
      type: 'multiSelect',
      label: 'City',
      accessor: 'city',
      id: 'city',
      defaultValue: [
        { value: 'Zurich', label: 'Zurich' },
        { value: 'Brno', label: 'Brno' },
      ],
      options: [
        { value: 'Zurich', label: 'Zurich' },
        { value: 'Brno', label: 'Brno' },
        { value: 'Taumatawhakaanhu', label: 'Taumatawhakaanhu' },
        { value: 'New York', label: 'New York' },
        { value: '', label: '-empty-' }, { value: 'CH', label: 'CH' },
      ],
    }, {
      type: 'text',
      label: 'Name',
      accessor: 'name',
      id: 'name',
      defaultValue: 'Name',
    }, {
      type: 'text',
      label: 'Name Reverse',
      id: 'name_reverse',
      customFilter: (filteredInput, d) => d.name.split('').reverse().join('').includes(filteredInput),
      defaultValue: 'det',
    }];

    state = {
      filterValues: {},
    };

    render() {
      const { filterFunc, filterProps } = createSimpleFilter(this.filters);

      return (
        <Table
          columns={columns}
          data={filterFunc(this.state.filterValues, data)}
          keyField="id"
          filters={filterProps}
          onFilterChange={filterValues => this.setState({ filterValues })}
        />
      );
    }

}`;

const DataFilterCode = `class DataFilteredTable extends React.Component {

     filters = [{
       type: 'singleSelect',
       label: 'City',
       accessor: 'city',
       id: 'city',
       optionsAccessors: { value: d => d.city, label: d => \`City:\${d.city}\` },
       defaultValue: { value: 'Zurich', label: 'Zurich' },
     }, {
       type: 'singleSelect',
       label: 'Country',
       accessor: 'country',
       id: 'country',
       optionsAccessors: { value: d => d.country, label: d => (d.country ? d.country : 'n/a') },
     }, {
       type: 'text',
       label: 'Name',
       accessor: 'name',
       id: 'name',
     }];

     state = {
       filterValues: {},
     };

     render() {
       const { dataFilterFunc, filterProps } = createDataFilter(this.filters, data);

       return (
         <Table
           columns={columns}
           data={dataFilterFunc(this.state.filterValues)}
           keyField="id"
           filters={filterProps}
           onFilterChange={filterValues => this.setState({ filterValues })}
         />
       );
     }

}`;


const FilterUsage = () => (
  <div styleName="page">
    <div className="header">
      <div styleName="title">Filter</div>
      <div styleName="description">
        <p>
In order to display filtered data, a filter needs to be connected, with e.g., a Table. There are multiple ways to achieve that, depending on your use case.
        </p>
      </div>
      <div className="topicContent">
        <Paragraph title="Simple Filter">
          <DescriptionBox>
            <p>
            Based on filter definitions, the filter input fields and a filter function is provided, your component only needs to store the filterValues and execute filterFunc once data or filters are changed.
            </p>
          </DescriptionBox>
          <CodeBox>
            {SimpleFilterCode}
          </CodeBox>
          <DisplayBox>
            <SimpleFilteredTable />
          </DisplayBox>
          <DescriptionBox>
            <p>
              Note that you can also filter on data that is not displayed in the table as the filtering and table column definitions are kept separate.
            </p>
          </DescriptionBox>
        </Paragraph>
        <Paragraph title="Data Filter">
          <DescriptionBox>
            <p>
             If you want to automatically fill in possible options based on the available data, use createDataFilter. It will only provide options that are available in the data.
            </p>
            <p>
             Since we are already passing the data to createDataFilter, the actual dataFilterFunc does not need to receive it again.
            </p>
          </DescriptionBox>
          <CodeBox>
            {DataFilterCode}
          </CodeBox>
          <DisplayBox>
            <DataFilteredTable />
          </DisplayBox>
        </Paragraph>
      </div>
    </div>
  </div>
);

export default FilterUsage;

/* eslint-disable no-nested-ternary, max-classes-per-file */
import React from 'react';
import {
  Table, createSimpleFilter, createDataFilter,
} from '@osag/pyrene/dist/pyrene.dev';
import CodeBox from '../../common/PageElements/HowTo/CodeBox/CodeBox';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';
import DisplayBox from '../../common/PageElements/HowTo/DisplayBox/DisplayBox';
import styles from '../../../css/componentPage.css';

/* eslint-disable react/no-multi-comp */
/* eslint max-classes-per-file: ["error", 2] */

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
     }, {
       type: 'text',
       label: 'Name Reverse',
       id: 'name_reverse',
       customFilter: (filteredInput, d) => d.name.split('').reverse().join('').includes(filteredInput),
     }];

     constructor(props) {
       super(props);

       this.state = {
         filterValues: {},
       };
     }

     render() {
       const { filterFunc, filterProps } = createSimpleFilter(this.filters);

       return (
         <Table
           columns={columns}
           data={filterFunc(this.state.filterValues, data)}
           keyField="id"
           filters={filterProps}
           onFilterChange={(filterValues) => this.setState({ filterValues })}
           filterValues={this.state.filterValues}
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
       optionsAccessors: { value: (d) => d.city, label: (d) => `City: ${d.city}` },
     }, {
       type: 'singleSelect',
       label: 'Country',
       accessor: 'country',
       id: 'country',
       optionsAccessors: { value: (d) => d.country, label: (d) => (d.country === null ? 'null' : d.country === '' ? 'empty' : d.country === false ? 'false' : d.country) }, // eslint-disable-line no-nested-ternary
     }, {
       type: 'text',
       label: 'Name',
       accessor: 'name',
       id: 'name',
     }];

     constructor(props) {
       super(props);

       this.state = {
         filterValues: {},
       };
     }

     render() {
       const { dataFilterFunc, filterProps } = createDataFilter(this.filters, data);

       return (
         <Table
           columns={columns}
           data={dataFilterFunc(this.state.filterValues)}
           keyField="id"
           filters={filterProps}
           onFilterChange={(filterValues) => this.setState({ filterValues })}
           filterValues={this.state.filterValues}
         />
       );
     }

}

class NegatedFilters extends React.Component {

  filters = [{
    type: 'singleSelect',
    label: 'City',
    accessor: 'city',
    id: 'city',
    optionsAccessors: { value: (d) => d.city, label: (d) => `City: ${d.city}` },
    negated: false,
  }, {
    type: 'singleSelect',
    label: 'Country',
    accessor: 'country',
    id: 'country',
    optionsAccessors: { value: (d) => d.country, label: (d) => (d.country === null ? 'null' : d.country === '' ? 'empty' : d.country === false ? 'false' : d.country) },
    negated: false,
  }, {
    type: 'text',
    label: 'Name',
    accessor: 'name',
    id: 'name',
    negated: false,
  }];

  constructor(props) {
    super(props);
    this.state = {
      filterValues: {},
      filters: this.filters,
    };
  }

  render() {
    const { dataFilterFunc, filterProps } = createDataFilter(this.state.filters, data);

    return (
      <Table
        columns={columns}
        data={dataFilterFunc(this.state.filterValues)}
        keyField="id"
        filters={filterProps}
        onFilterChange={(filterValues, negatedFilters) => {
          this.setState((previousState) => {
            const filters = previousState.filters.map((filter) => {
              const toReturn = filter;
              toReturn.negated = negatedFilters.includes(filter.id);
              return toReturn;
            });
            return ({
              filterValues: filterValues,
              filters: filters,
            });
          });
        }}
        filterValues={this.state.filterValues}
        negatable
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
    }, {
      type: 'text',
      label: 'Name Reverse',
      id: 'name_reverse',
      customFilter: (filteredInput, d) => d.name.split('').reverse().join('').includes(filteredInput),
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
     }, {
       type: 'singleSelect',
       label: 'Country',
       accessor: 'country',
       id: 'country',
       optionsAccessors: { value: d => d.country, label: d => (d.country === null ? 'null' : d.country === '' ? 'empty' : d.country === false ? 'false' : d.country) },
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
           filterValues={this.state.filterValues}
         />
       );
     }

}`;

const NegatedFiltersCode = `
class NegatedFilters extends React.Component {

  filters = [{
    type: 'singleSelect',
    label: 'City',
    accessor: 'city',
    id: 'city',
    optionsAccessors: { value: d => d.city, label: d => \`City:\${d.city}\` },
    negated: false
  }, {
    type: 'singleSelect',
    label: 'Country',
    accessor: 'country',
    id: 'country',
    optionsAccessors: { value: (d) => d.country, label: (d) => (d.country === null ? 'null' : d.country === '' ? 'empty' : d.country === false ? 'false' : d.country) },
    negated: false
  }, {
    type: 'text',
    label: 'Name',
    accessor: 'name',
    id: 'name',
    negated: false
  }];

  constructor(props) {
    super(props);
    this.state = {
      filterValues: {},
      filters: this.filters,
    };
  }

  render() {
    const { dataFilterFunc, filterProps } = createDataFilter(this.state.filters, data);

    return (
      <Table
        columns={columns}
        data={dataFilterFunc(this.state.filterValues)}
        keyField="id"
        filters={filterProps}
        onFilterChange={(filterValues, negatedFilters) => {
          this.setState((previousState) => {
            const filters = previousState.filters.map((filter) => {
              const toReturn = filter;
              toReturn.negated = negatedFilters.includes(filter.id);
              return toReturn;
            });
            return ({
              filterValues: filterValues,
              filters: filters,
            });
          });
        }}
        filterValues={this.state.filterValues}
        negatable
      />
    );
  }

}`;

const FilterUsage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div className={styles.title}>Filter</div>
      <div className={styles.description}>
        <p>
          In order to display filtered data, a filter needs to be connected, with e.g., a Table. There are multiple ways to achieve that, depending on your use case.
        </p>
      </div>
      <div className={styles.topicContent}>
        <Paragraph title="Simple Filter">
          <DescriptionBox>
            <p>
              Based on filter definitions, the filter input fields and a filter function is provided as well as filterValues.
              Your component needs to init the filterValues to
              , pass them to filter, change them based on onFilterChange.
              Pass data to table via executing filterFunc once data or filterValues are changed
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
              For this optionsAccessors has to be specified.
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
        <Paragraph title="Negated Filters">
          <DescriptionBox>
            <p>
              If you want to exclude a specific value from the result set, you can enable the negation features of the filters, by setting the negation property in the configuration provided for the filters.
            </p>
            <p>
              The status of the filters, if negated or not, is usually kept as a state of the parent component that should make use of the filters, in a similar way as the filterValues.
              Everytime there is a filter change, it is necessary to check if the filter has been negated or not and if so, update the related filter configuration
            </p>
          </DescriptionBox>
          <CodeBox>
            {NegatedFiltersCode}
          </CodeBox>
          <DisplayBox>
            <NegatedFilters />
          </DisplayBox>
        </Paragraph>
      </div>
    </div>
  </div>
);

export default FilterUsage;

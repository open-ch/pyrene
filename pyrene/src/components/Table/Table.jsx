import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import './table.css';

const Table = props => {
  const data = [
    {
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      },
    },
    {
      name: 'Linsley Tanner',
      age: 62,
      friend: {
        name: 'Maurer Jason',
        age: 32,
      },
    },
  ];

  const columns = [{
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
  }, {
    Header: 'Age',
    accessor: 'age',
  }, {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Friend Name',
    accessor: d => d.friend.name // Custom value accessors!
  }, {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
  }];

  return (
    <div>
      <ReactTable
        defaultPageSize={3}
        data={data}
        columns={columns}
      />
    </div>
  );
};


Table.displayName = 'Table';

Table.defaultProps = {};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
};

export default Table;
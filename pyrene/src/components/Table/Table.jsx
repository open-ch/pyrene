import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import './table.css';
import SingleSelect from '../SelectElements/SingleSelect/SingleSelect';

/**
 * All mighty table
 */
const Table = props => (
  <div>
    <ReactTable
      defaultPageSize={3}
      data={props.data}
      columns={props.columns}

      filterable={props.filterable}
      multiSort={props.multiSort}
      PadRowComponent={props.PadRowComponent}
      showPageSizeOptions={props.showPageSizeOptions}

      resizable={false}
      showPaginationBottom={false}
      showPagination
      showPaginationTop

      PaginationComponent={(props) => {
        console.log(props);
        return <SingleSelect
          options={props.pageSizeOptions.map(e => ({label: `${e}`, value: `${e}`}))}
          onChange={(e) => props.onPageSizeChange(parseInt(e.target.value.value, 10))}
          value={`${props.pageSize}`}
        />;
      }}

      sortable
    />
  </div>
);


Table.displayName = 'Table';

Table.defaultProps = {
  defaultPageSize: 10,
  defaultSortDesc: true,
  filterable: false,
  loading: false,
  multiSort: true,
  showPageSizeOptions: true,
  PadRowComponent: () => <span>&nbsp;</span>,
  pageSizeOptions: [5, 10, 20, 50, 100],
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,

  defaultPageSize: PropTypes.number,
  defaultSortDesc: PropTypes.bool,

  filterable: PropTypes.bool,

  loading: PropTypes.bool,

  multiSort: PropTypes.bool,

  PadRowComponent: PropTypes.func, // the content rendered inside of a padding row
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),

  showPageSizeOptions: PropTypes.bool,
};

export default Table;
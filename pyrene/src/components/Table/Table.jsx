import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import classNames from 'classnames';

import './table.css';
import TablePagination from './TablePagination/TablePagination';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Filter from '../Filter/Filter';
import TableHeaderCell from './TableHeader/TableHeaderCell';
import TableHeader from './TableHeader/TableHeader';
import colorConstants from '../../styles/colorConstants';
import TableColumnPopover from './TableColumnButton/TableColumnPopover/TableColumnPopover';

/**
 * All mighty table
 */
export default class Table extends React.Component {

  state = {
    selected: null,
  };

  renderLoader = () => (
    <div styleName={'loader'}>
      <Loader size={'large'} />
    </div>
  );


  render() {
    return (
      <div styleName={'tableContainer'}>
        {this.props.title && <div styleName={'titleBar'}>
          {this.props.title}
        </div>}
        {this.props.loading && this.renderLoader()}
        <div styleName={classNames('filterContainer', {loading: this.props.loading})}>
          {this.props.filters.length > 0 && <Filter filters={this.props.filters} onFilterSubmit={this.props.onFilterChange} />}
        </div>
        <div styleName={classNames('tableAndActions', {loading: this.props.loading})}>
          {/*<TableColumnPopover />*/}
          {this.props.actions.length > 0 && <div styleName={'toolbar'}>
          {this.props.actions.map((action, index) => (
            <React.Fragment key={action.label}>
              <Button label={action.label} icon={action.icon ? action.icon : undefined} onClick={action.callBack} type={'action'} />
              {index + 1 < this.props.actions.length && <div styleName={'spacer'} />}
            </React.Fragment>
          ))}
        </div>}
          <ReactTable
            defaultPageSize={this.props.defaultPageSize}
            data={this.props.data}
            columns={this.props.columns}
            pageSizeOptions={this.props.pageSizeOptions}

            multiSort={this.props.multiSort}
            PadRowComponent={this.props.PadRowComponent}

            getTrProps={(state, rowInfo) => {
              // no row selected yet
              const selectedIndex = this.state.selected == null ? null : this.state.selected.index;
              return {
                onClick: (e) => {
                  this.setState({
                    selected: rowInfo
                  })
                },
                onDoubleClick: (e) => {
                  this.props.onRowDoubleClick(rowInfo);
                },
                style: {
                  background: typeof rowInfo === 'undefined' ? null : rowInfo.index === selectedIndex ? colorConstants.neutral030 : null,
                }
              }
            }}

            TheadComponent={props => <TableHeader {...props} />}
            ThComponent={props => <TableHeaderCell {...props} />}
            PaginationComponent={props => <TablePagination {...props} />}
            TfootComponent={props => <TablePagination {...props} />}
            resizable={false}
            showPaginationBottom
            showPagination
            showPaginationTop
            showPageSizeOptions
            sortable
          />
        </div>
      </div>
    );
  }
}


Table.displayName = 'Table';

Table.defaultProps = {
  actions: [],
  title: '',
  defaultPageSize: 10,
  loading: false,
  multiSort: true,
  pageSizeOptions: [10, 20, 50, 100, 250],
  filters: [],
  onRowDoubleClick: () => null,
  onFilterChange: () => null,
};

Table.propTypes = {
  /**
   * Sets the table actions. Type: [{ icon: string, label: string (required), action: func (required) }]
   */
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired,
  })),
  /**
   * Sets the Table columns. For a detailed prop description check the react-table docs.
   */
  columns: PropTypes.array.isRequired,
  /**
   * Sets the Table data displayed in the rows. For a detailed prop description check the react-table docs.
   */
  data: PropTypes.array.isRequired,
  /**
   * Sets the page size when the component is first mounted.
   */
  defaultPageSize: PropTypes.number,
  /**
   * Sets the available filters.
   * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array }]
   */
  filters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['singleSelect', 'multiSelect', 'text']).isRequired,
    filterKey: PropTypes.string.isRequired,
    options: PropTypes.array,
  })),
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading: PropTypes.bool,
  /**
   * Whether multiSorting via shift click is possible.
   */
  multiSort: PropTypes.bool,
  /**
   * Called when the filter changes.
   */
  onFilterChange: PropTypes.func,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick: PropTypes.func,
  /**
   * Sets the page sizes that the user can choose from.
   */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  /**
   * Sets the title.
   */
  title: PropTypes.string,
};

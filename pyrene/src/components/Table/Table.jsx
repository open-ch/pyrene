import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import classNames from 'classnames';

import './table.css';
import TablePagination from './TablePagination/TablePagination';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import TableFilter from './TableFilter/TableFilter';
import TableHeaderCell from './TableHeader/TableHeaderCell';
import TableHeader from './TableHeader/TableHeader';
import colorConstants from '../../styles/colorConstants';

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
        {/* Future Filter component
        <div styleName={classNames('filterContainer', {loading: this.props.loading})}>
          <TableFilter />
        </div>
        */}
        <div styleName={classNames('tableAndActions', {loading: this.props.loading})}>
        <div styleName={'toolbar'}>
          {this.props.actions.map((action, index) => (
            <React.Fragment>
              <Button label={action.label} icon={action.icon ? action.icon : undefined} onClick={action.callBack} type={'action'} />
              {index + 1 < this.props.actions.length && <div styleName={'spacer'} />}
            </React.Fragment>
          ))}
        </div>
          <ReactTable
            defaultPageSize={this.props.defaultPageSize}
            data={this.props.data}
            columns={this.props.columns}
            pageSizeOptions={this.props.pageSizeOptions}

            filterable={this.props.filterable}
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
  title: 'Table',
  defaultPageSize: 10,
  defaultSortDesc: true,
  filterable: false,
  loading: false,
  multiSort: true,
  PadRowComponent: () => <span>&nbsp;</span>,
  pageSizeOptions: [10, 20, 50, 100, 250],
  onRowDoubleClick: () => null,
};

Table.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired,
  })),

  columns: PropTypes.array.isRequired,

  data: PropTypes.array.isRequired,
  defaultPageSize: PropTypes.number,
  defaultSortDesc: PropTypes.bool,

  filterable: PropTypes.bool,

  loading: PropTypes.bool,

  multiSort: PropTypes.bool,

  onRowDoubleClick: PropTypes.func,

  PadRowComponent: PropTypes.func, // the content rendered inside of a padding row
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),

  title: PropTypes.string,
};

import React from 'react';
import ArrowButton from '../../ArrowButton/ArrowButton';
import TableSelect from './TableSelect/TableSelect';

import './tablePagination.css';

const TablePagination = props => {
  return (
    <div styleName={'tablePagination'}>
      <div styleName={'resultsCounter'}>
        {props.data.length} results found
      </div>

      <div styleName={'separator'} />

      <div styleName={'pageSizeSelectOptions'}>
        <div styleName={'pageSizeSelect'}>
          <TableSelect
            placeholder={`${props.pageSize}`}
            options={props.pageSizeOptions.map(e => ({label: `${e}`, value: `${e}`}))}
            onChange={(e) => props.onPageSizeChange(parseInt(e.value, 10))}
            value={`${props.pageSize}`}
          />
        </div>
        <div styleName={'spacer small'}/>
        per page
      </div>

      <div styleName={'separator'} />

      <div styleName={'pageNavigation'}>
        <ArrowButton direction={'left'} disabled={!props.canPrevious} onClick={() => props.onPageChange(props.page - 1)} type={'minimal'} />
        <div styleName={'spacer small'}/>
        <div styleName={'pageTracker'}>{props.page + 1} of {props.pages}</div>
        <div styleName={'spacer small'}/>
        <ArrowButton direction={'right'} disabled={!props.canNext} onClick={() => props.onPageChange(props.page + 1)} type={'minimal'} />
      </div>
    </div>
  );
};

export default TablePagination;
import React from 'react';
import PropTypes from 'prop-types';
import ArrowButton from '../ArrowButton/ArrowButton';
import SingleSelect from '../SelectElements/SingleSelect/SingleSelect';

import './tablePagination.css';

const TablePagination = props => (
  <div styleName={'tablePagination'}>
    <div styleName={'pageNavigation'}>
      <ArrowButton direction={'left'} disabled={!props.canPrevious} onClick={() => props.onPageChange(props.page - 1)} />
      <div styleName={'spacer small'} />
      <div styleName={'pageTracker'}>{props.page + 1} of {props.pages}</div>
      <div styleName={'spacer small'} />
      <ArrowButton direction={'right'} disabled={!props.canNext} onClick={() => props.onPageChange(props.page + 1)} />
    </div>
    {props.showPageSizeOptions && <div styleName={'pageSizeSelect'}>
      <SingleSelect
        placeholder={`${props.pageSize}`}
        options={props.pageSizeOptions.map(e => ({label: `${e}`, value: `${e}`}))}
        onChange={(e) => props.onPageSizeChange(parseInt(e.target.value.value, 10))}
        value={`${props.pageSize}`}
      />
    </div>}
  </div>
);

export default TablePagination;
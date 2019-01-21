import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PROPCONSTANTS from '../TreeTablePropTypes';

import './treeTableCell.css';

const TreeTableCell = props => (
  <div style={props.style} styleName={'treeTableCell'}>

    {props.firstColumn && (props.parent ?
      <div styleName={classNames('pivotIcon', { sectionOpen: props.sectionOpen })} className={'pyreneIcon-chevronDown'} onClick={e => props.onExpandClick(e, props.treeIndex, props.parent)} />
      :
      <div styleName={'iconSpaceholder'} />
    )}

    {/* Use renderCallback if there is one defined for this column */}

    {props.columnProps.renderCallback ?
      props.columnProps.renderCallback({ value: props.value, original: props.original })
      :
      <div styleName={'cellDataContainer'}>
        {props.value}
      </div>
    }
  </div>
);


TreeTableCell.displayName = 'TreeTableCell';

TreeTableCell.defaultProps = {
  value: '',
  columnProps: {},
  parent: false,
  sectionOpen: false,
  firstColumn: false,
  style: {},
};

TreeTableCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  columnProps: PROPCONSTANTS.COLUMN,
  firstColumn: PropTypes.bool,
  onExpandClick: PropTypes.func.isRequired,
  parent: PropTypes.bool,
  sectionOpen: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  treeIndex: PropTypes.string.isRequired,
};

export default TreeTableCell;
import React from 'react';
import PropTypes from 'prop-types';

import './treeTableCell.css';
import classNames from 'classnames';

const TreeTableCell = props => (
  <div style={props.style} styleName={'treeTableCell'}>

    {props.firstColumn && (props.parent ?
      <div styleName={classNames('pivotIcon', { sectionOpen: props.sectionOpen })} className={'pyreneIcon-chevronDown'} />
      :
      <div styleName={'iconSpaceholder'} />
    )}

    {/* Use renderCallback if there is one defined for this column */}

    {props.columnProps.renderCallback ?
      props.columnProps.renderCallback(props.cellData)
      :
      <div styleName={'cellDataContainer'}>
        {props.cellData}
      </div>
    }
  </div>
);


TreeTableCell.displayName = 'TreeTableCell';

TreeTableCell.defaultProps = {
  parent: false,
  sectionOpen: false,
  firstColumn: false,
};

TreeTableCell.propTypes = {
  cellData: PropTypes.any,
  columnProps: PropTypes.object,
  parent: PropTypes.bool,
  firstColumn: PropTypes.bool,
  sectionOpen: PropTypes.bool,
};

export default TreeTableCell;
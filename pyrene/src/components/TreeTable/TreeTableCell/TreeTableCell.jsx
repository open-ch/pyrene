import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PROPCONSTANTS from '../TreeTablePropTypes';

import './treeTableCell.css';

export default class TreeTableCell extends React.PureComponent {

  render() {
    return (
      <div style={this.props.style} styleName={'treeTableCell'}>

        {this.props.firstColumn && (this.props.parent ?
            <div styleName={classNames('pivotIcon', {sectionOpen: this.props.sectionOpen})} className={'pyreneIcon-chevronDown'} onClick={this.props.onExpandClick}/>
            :
            <div styleName={'iconSpaceholder'}/>
        )}

        {/* Use renderCallback if there is one defined for this column */}

        {this.props.columnProps.renderCallback ?
          this.props.columnProps.renderCallback(this.props.value, this.props.original)
          :
          <div styleName={'cellDataContainer'}>
            {this.props.value}
          </div>
        }
      </div>
    );
  }
}


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

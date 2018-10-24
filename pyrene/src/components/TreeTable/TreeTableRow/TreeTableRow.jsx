import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniqid from 'uniqid';

import './treeTableRow.css';
import TreeTableUtils from '../TreeTableUtils';
import TreeTableCell from '../TreeTableCell/TreeTableCell';

export default class TreeTableRow extends React.Component {

  state = {
    displayChildren: false,
  };

  manageRowExpansion = () => {
    const { treeIndex, expandedRows } = this.props;

    let expandRow = false;
    expandedRows.forEach(rowIndex => {
      if (rowIndex.startsWith(treeIndex) && rowIndex.includes(treeIndex)) {
        expandRow = true;
      }
    });

    return expandRow;
  };

  render() {

    return (
      <div styleName={classNames('treeTableRow', { parent: this.props.parent })} onClick={e => this.props.onRowClick(e, this.props.treeIndex, this.props.parent)}>

        {/* Row Elements are the elements displayed inside header rows */}
        <div styleName={'rowElementsContainer'}>

          {this.props.parent && <div styleName={classNames('pivotIcon', { sectionOpen: this.state.displayChildren })} className={'pyreneIcon-chevronDown'} />}

          {this.props.columns.map((column, index) => {

            const styling = {};
            if (index === 0) {
              styling.marginLeft = (this.props.treeIndex.split('.').length - 2) * 20;
            }

            return (
              <TreeTableCell style={styling} key={uniqid()}>
                {this.props.data[column.accessor]}
              </TreeTableCell>
            );
          })}

          <div style={{marginLeft: 45}}>
            {this.props.treeIndex}
          </div>

        </div>

        {/* These are the */}

        {this.props.parent && <div styleName={classNames('childrenRowsContainer', { display: this.manageRowExpansion() })}>
          {this.props.generateRowsFromData(this.props.data.children, this.props.columns, this.props.treeIndex, this.props.expandedRows)}
        </div>}
      </div>
    );
  }

}

TreeTableRow.displayName = 'TreeTableRow';

TreeTableRow.defaultProps = {
  parent: false,
  displayChildren: false,
  displayAllChildren: false,
};

TreeTableRow.propTypes = {
  expandedRows: PropTypes.arrayOf(PropTypes.string),
  treeIndex: PropTypes.number,
  data: PropTypes.object,
  columns: PropTypes.array,
  parent: PropTypes.bool,
  generateRowsFromData: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};


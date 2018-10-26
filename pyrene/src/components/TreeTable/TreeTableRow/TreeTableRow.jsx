import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniqid from 'uniqid';

import './treeTableRow.css';
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
    const displaySection = this.manageRowExpansion();
    return (
      <div styleName={classNames('treeTableRow', { parent: this.props.parent })} onClick={e => this.props.onRowClick(e, this.props.treeIndex, this.props.parent)}>

        {/* Row Elements are the elements displayed inside header rows */}
        <div styleName={'rowElementsContainer'}>

          {this.props.columns.map((column, index) => {

            const styling = {};
            if (index === 0) {
              styling.paddingLeft = ((this.props.treeIndex.split('.').length - 2) * 24) + 8;
              return (
                <TreeTableCell style={styling} key={uniqid()}>
                  {this.props.parent ? <div styleName={classNames('pivotIcon', { sectionOpen: displaySection })} className={'pyreneIcon-chevronDown'} />
                  : <div styleName={'iconSpaceholder'} />}

                  {this.props.data[column.accessor]}
                </TreeTableCell>
              );
            }

            return (
              <TreeTableCell key={uniqid()}>
                {this.props.data[column.accessor]}
              </TreeTableCell>
            );
          })}

        </div>

        {/* These are the */}

        {this.props.parent && <div styleName={classNames('childrenRowsContainer', { display: displaySection })}>
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
  treeIndex: PropTypes.string,
  data: PropTypes.object,
  columns: PropTypes.array,
  parent: PropTypes.bool,
  generateRowsFromData: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};


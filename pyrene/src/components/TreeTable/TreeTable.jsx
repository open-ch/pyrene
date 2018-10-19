import React from 'react';
import PropTypes from 'prop-types';


import './treeTable.css';
import TreeTableUtils from './TreeTableUtils';
import TreeTableHeader from './TreeTableHeader/TreeTableHeader';

/**
 *  🌳 (╯°□°）╯︵ ┻━┻
 *
*/
export default class TreeTable extends React.Component {

  state = {};

  render() {

    return (
      <div styleName={'treeTableContainer'}>
        {this.props.title && <div styleName={'treeTableTitle'}>
          {this.props.title}
        </div>}
        <TreeTableHeader headers={this.props.columns.map(col => {
          return col.header ? col.header : col.accessor;
        })} />
        <div styleName={'treeTableData'}>
        {TreeTableUtils.generateRowsFromData(this.props.data, this.props.columns, 0)}
        </div>
      </div>
    );
  }

}

TreeTable.displayName = 'TreeTable';

TreeTable.defaultProps = {
  title: '',
};

TreeTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array.isRequired,
  /**
   * Needs description & better type
   */
  data: PropTypes.array.isRequired,
};
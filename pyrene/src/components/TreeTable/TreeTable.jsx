import React from 'react';
import PropTypes from 'prop-types';


import './treeTable.css';
import TreeTableUtils from './TreeTableUtils';

/**
 *  🌳 (╯°□°）╯︵ ┻━┻
 *
*/
export default class TreeTable extends React.Component {

  state = {};

  render() {

    return (
      <div styleName={'treeTableContainer'}>
        {TreeTableUtils.generateRowsFromData(this.props.data, this.props.columns, 0)}
      </div>
    );
  }

}

TreeTable.displayName = 'TreeTable';

TreeTable.defaultProps = {
};

TreeTable.propTypes = {
  columns: PropTypes.array.isRequired,
  /**
   * Needs description & better type
   */
  data: PropTypes.array.isRequired,
};
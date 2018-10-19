import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniqid from 'uniqid';

import './treeTableRow.css';
import TreeTableUtils from '../TreeTableUtils';

export default class TreeTableRow extends React.Component {

  state = {
    displayChildren: false,
  };

  handleOnRowClick = (event) => {
    event.stopPropagation();
    this.setState((prevState, props) => ({
      displayChildren: !prevState.displayChildren,
    }));
  };

  render () {
    return (
      <div styleName={classNames('treeTableRow', {parent: this.props.parent})} onClick={e => this.handleOnRowClick(e)}>

        <div styleName={'parentRowElementsContainer'}>

          {this.props.parent && <div styleName={classNames('pivotIcon', {sectionOpen: this.state.displayChildren})} className={'pyreneIcon-chevronDown'} />}

          {this.props.columns.map((column, index) => {
            const styling = {};
            if (index === 0 && !this.props.parent) {
              styling.marginLeft = this.props.treeLevel * 20;
            }
            return <div style={styling} key={uniqid()}>{this.props.data[column.accessor]}</div>;
          })}

        </div>

        {this.props.parent && <div styleName={classNames('childrenRowsContainer', {hidden: !this.state.displayChildren})}>
          {TreeTableUtils.generateRowsFromData(this.props.data.children, this.props.columns, this.props.treeLevel + 1)}
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
  treeLevel: PropTypes.number,
  data: PropTypes.object,
  columns: PropTypes.array,
  parent: PropTypes.bool,
  displayChildren: PropTypes.bool,
  displayAllChildren: PropTypes.bool,
};


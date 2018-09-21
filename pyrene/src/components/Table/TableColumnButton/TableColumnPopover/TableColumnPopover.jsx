import React from 'react';
import PropTypes from 'prop-types';

import './tableColumnPopover.css';
import Popover from '../../../Popover/Popover';
import classNames from 'classnames';
import TableColumnList from '../TableColumnList/TableColumnList';

export default class TableColumnPopover extends React.Component {
  state = {
    displayPopover: false,
  };

  togglePopover = () => {
    this.setState((prevState, props) => ({
      displayPopover: !prevState.displayPopover,
    }));
  };

  render(){
    return (
      <div styleName="tableColumnButton">
        <Popover
          preferredPosition={['bottom']}
          align={'end'}
          displayPopover={this.state.displayPopover}
          distanceToTarget={8}
          onClickOutside={() => this.setState({displayPopover: false})}
          renderPopoverContent={() => <TableColumnList />}
        >

          <div styleName={classNames('columnButton', { popoverOpen: this.state.displayPopover })} onClick={this.togglePopover}>
            <div styleName={'buttonLabel'}>
              Columns
            </div>
            <div styleName={'arrowIcon'} className={'icon-collapsDown'} />
          </div>

        </Popover>
      </div>
    );
  }
}


TableColumnPopover.displayName = 'TableColumnPopover';

TableColumnPopover.defaultProps = {};

TableColumnPopover.propTypes = {};
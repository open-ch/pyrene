import React from 'react';
import PropTypes from 'prop-types';

import './treeTableActionBar.css';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button from '../../Button/Button';
import CheckboxPopover from '../../CheckboxPopover/CheckboxPopover';

const TreeTableActionBar = props => (
  <div styleName={'treeTableActionBar'}>
    <ButtonBar
      leftButtonSectionElements={[
        <Button
          label={props.displayExpandAllAction ? 'Expand All' : 'Collapse All'}
          icon={props.displayExpandAllAction ? 'chevronDown' : 'chevronUp'}
          type={'action'}
          onClick={props.toggleAll}
        />,
      ]}
      noPadding
    />
    {props.columnToggleProps.toggleColumns && <CheckboxPopover
      buttonLabel={'Columns'}
      listItems={props.columnToggleProps.listItems}
      onItemClick={props.columnToggleProps.onItemClick}
      onRestoreDefault={props.columnToggleProps.onRestoreDefault}
    />}
  </div>
);

TreeTableActionBar.displayName = 'TreeTableActionBar';

TreeTableActionBar.defaultProps = {};

TreeTableActionBar.propTypes = {
  columnToggleProps: PropTypes.shape.isRequired,
  displayExpandAllAction: PropTypes.bool.isRequired,
  toggleAll: PropTypes.func.isRequired,
};

export default TreeTableActionBar;
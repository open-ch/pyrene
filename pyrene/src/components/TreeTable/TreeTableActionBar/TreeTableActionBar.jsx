import React from 'react';
import PropTypes from 'prop-types';

import './treeTableActionBar.css';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button from '../../Button/Button';
import CheckboxPopover from '../../CheckboxPopover/CheckboxPopover';

const TreeTableActionBar = (props) => (
  <div styleName="treeTableActionBar">
    <ButtonBar
      leftButtonSectionElements={[
        <Button
          label={props.displayExpandAll ? 'Collapse All' : 'Expand All'}
          icon={props.displayExpandAll ? 'chevronUp' : 'chevronDown'}
          type="action"
          onClick={props.toggleAll}
        />,
      ]}
      noPadding
    />
    <div styleName="treeTableRightSideContainer">
      {props.renderRightItems && props.renderRightItems()}
      {props.columnToggleProps.toggleColumns && (
        <CheckboxPopover
          buttonLabel="Columns"
          listItems={props.columnToggleProps.listItems}
          onItemClick={props.columnToggleProps.onItemClick}
          onRestoreDefault={props.columnToggleProps.onRestoreDefault}
        />
      )}
    </div>
  </div>
);

TreeTableActionBar.displayName = 'TreeTableActionBar';

TreeTableActionBar.defaultProps = {
  renderRightItems: null,
};

TreeTableActionBar.propTypes = {
  columnToggleProps: PropTypes.shape({
    listItems: PropTypes.array,
    onItemClick: PropTypes.func,
    onRestoreDefault: PropTypes.func,
    toggleColumns: PropTypes.bool,
  }).isRequired,
  displayExpandAll: PropTypes.bool.isRequired,
  renderRightItems: PropTypes.func,
  toggleAll: PropTypes.func.isRequired,
};

export default TreeTableActionBar;

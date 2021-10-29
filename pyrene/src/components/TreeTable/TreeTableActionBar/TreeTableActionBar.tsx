/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';

import styles from './treeTableActionBar.css';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button from '../../Button/Button';
import CheckboxPopover from '../../CheckboxPopover/CheckboxPopover';

interface Item {
  id: string,
  label: string,
  value: boolean
}

export interface TreeTableActionBarProps {
  columnToggleProps: {
    listItems: Array<Item>,
    onItemClick: () => void,
    onRestoreDefault: () => void,
    toggleColumns: boolean,
  },
  disabledExpand: boolean,
  displayExpandAll: boolean,
  renderRightItems?: () => JSX.Element,
  toggleAll: () => void,
}

const TreeTableActionBar: FunctionComponent<TreeTableActionBarProps> = ({
  columnToggleProps,
  disabledExpand,
  displayExpandAll,
  renderRightItems,
  toggleAll,
}) => (
  <div className={styles.treeTableActionBar}>
    <ButtonBar
      leftButtonSectionElements={[
        <Button
          label={displayExpandAll ? 'Expand All' : 'Collapse All'}
          icon={displayExpandAll ? 'chevronDown' : 'chevronUp'}
          type="action"
          onClick={toggleAll}
          disabled={disabledExpand}
        />,
      ]}
      noPadding
    />
    <div className={styles.treeTableRightSideContainer}>
      {renderRightItems?.()}
      {columnToggleProps.toggleColumns && (
        <CheckboxPopover
          buttonLabel="Columns"
          listItems={columnToggleProps.listItems}
          onItemClick={columnToggleProps.onItemClick}
          onRestoreDefault={columnToggleProps.onRestoreDefault}
        />
      )}
    </div>
  </div>
);

export default TreeTableActionBar;

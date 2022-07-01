import React from 'react';

import { Row } from 'react-table-7';
import styles from './TreeTableActionBar.module.css';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button, { ButtonProps } from '../../Button/Button';
import CheckboxPopover, { CheckboxPopoverProps } from '../../CheckboxPopover/CheckboxPopover';
// eslint-disable-next-line import/no-cycle
import { Action } from '../TreeTableReact';
import { handleActionAvailability } from '../../../utils/TableUtils';

export interface TreeTableActionBarProps {
  actions: Array<Action>;
  expandAllVisible: boolean;
  selection: Row<{}>[];
  columnToggleProps?: {
    listItems: CheckboxPopoverProps['listItems'];
    onItemClick: CheckboxPopoverProps['onItemClick'];
    onRestoreDefault: CheckboxPopoverProps['onRestoreDefault'];
    toggleColumns: boolean;
  };
  disabledExpand: boolean;
  displayExpandAll: boolean;
  renderRightItems?: () => JSX.Element;
  toggleAll: ButtonProps['onClick'];
}

function TreeTableActionBar({
  actions,
  expandAllVisible,
  selection,
  columnToggleProps,
  disabledExpand,
  displayExpandAll,
  renderRightItems,
  toggleAll,
}: TreeTableActionBarProps) {
  return (
    <div className={styles.treeTableActionBar}>
      <ButtonBar
        leftButtonSectionElements={[
          ...(expandAllVisible
            ? [
                <Button
                  label={displayExpandAll ? 'Expand All' : 'Collapse All'}
                  icon={displayExpandAll ? 'chevronDown' : 'chevronUp'}
                  type="action"
                  onClick={toggleAll}
                  disabled={disabledExpand}
                />,
              ]
            : []),
          ...actions.map((ac) => (
            <Button
              label={ac.label}
              icon={ac.icon}
              type="action"
              onClick={() => ac.callback(selection)}
              disabled={!handleActionAvailability(selection.length, ac.active)}
            />
          )),
        ]}
        noPadding
      />
      <div className={styles.treeTableRightSideContainer}>
        {renderRightItems?.()}
        {columnToggleProps?.toggleColumns && (
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
}

export default TreeTableActionBar;

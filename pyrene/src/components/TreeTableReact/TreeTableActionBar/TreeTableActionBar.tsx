import React from 'react';

import { Row } from 'react-table-7';
import styles from './TreeTableActionBar.module.css';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button, { ButtonProps } from '../../Button/Button';
import CheckboxPopover, { CheckboxPopoverProps } from '../../CheckboxPopover/CheckboxPopover';
// eslint-disable-next-line import/no-cycle
import { Action } from '../TreeTableReact';
import { handleActionAvailability } from '../../../utils/TableUtils';
import ShareDialog from '../../ShareDialog/ShareDialog';

export interface TreeTableActionBarProps {
  actions: Action[];
  expandAllVisible: boolean;
  selection: Row<{}>[] | string[];
  columnToggleProps?: {
    listItems: CheckboxPopoverProps['listItems'];
    onItemClick: CheckboxPopoverProps['onItemClick'];
    onRestoreDefault: CheckboxPopoverProps['onRestoreDefault'];
    toggleColumns: boolean;
  };
  disabledExpand: boolean;
  displayExpandAll: boolean;
  renderPagination?: () => false | undefined | JSX.Element;
  renderRightItems?: () => JSX.Element;
  toggleAll: ButtonProps['onClick'];
  shareLink?: string;
}

function TreeTableActionBar({
  actions,
  expandAllVisible,
  selection,
  columnToggleProps,
  disabledExpand,
  displayExpandAll,
  renderRightItems,
  renderPagination,
  toggleAll,
  shareLink,
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
                  width={103}
                />,
              ]
            : []),
          ...(shareLink ? [<ShareDialog position="bottom" align="start" link={shareLink} />] : []),
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
        <div className={styles.columnsPaginationContainer}>
          {renderPagination?.()}
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
    </div>
  );
}

export default TreeTableActionBar;

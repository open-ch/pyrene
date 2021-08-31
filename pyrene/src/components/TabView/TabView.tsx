/* eslint-disable react/require-default-props */
import React, { FunctionComponent, useRef, useReducer } from 'react';
import clsx from 'clsx';

import styles from './tabView.css';

interface Tab {
  disabled?: boolean,
  name: string,
  renderAuxiliaryInfo?: () => void,
  renderCallback: () => JSX.Element,
}

interface TabViewProps {
  /**
   * Sets the number of tabs that are displayed before the more tab.
   */
  directAccessTabs?: number,
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * Sets the tab to preselect when the component is first mounted.
   */
  initialTabName: string,
  /**
   * Sets a maximum allowed width for the tabs.
   */
  maxTabWidth?: number,
  /**
   * Called when the selected tab changes.
   */
  tabChanged?: (tabName: string, index: number) => void,
  /**
   * Tab header element between tab content and tabs
   */
  tabHeaderElement?: React.ReactNode,
  /**
   * Data input array for the tabs.
   * Type: [{ name: string (required), renderAuxiliaryInfo: func, renderCallback: func (required), disabled: bool }]
   */
  tabs: Array<Tab>,
}

interface State {
  selectedTabIndex: number,
  displayMoreMenu: boolean,
  moreTabLabel: string,
}

interface Action {
  type: 'togglingMore' | 'clickingTab' | 'changingTab' | 'updatingLabel'
}

interface TogglingMoreAction extends Action {
  type: 'togglingMore',
  payload: {
    displayMoreMenu: boolean,
  }
}

interface ClickingTabAction extends Action {
  type: 'clickingTab',
  payload: {
    selectedTabIndex: number,
    displayMoreMenu: boolean,
  }
}

interface ChangingTabAction extends Action {
  type: 'changingTab',
  payload: {
    index: number,
    tabName: string,
    tabChanged?: TabViewProps['tabChanged'],
  }
}
interface UpdatingLabelAction extends Action {
  type: 'updatingLabel',
  payload: {
    moreTabLabel: string,
  }
}

const reducer = (state: State, action: TogglingMoreAction | ClickingTabAction | ChangingTabAction | UpdatingLabelAction): State => {
  switch (action.type) {
    case 'togglingMore': {
      return {
        ...state,
        displayMoreMenu: action.payload.displayMoreMenu,
      };
    }
    case 'clickingTab': {
      return {
        ...state,
        selectedTabIndex: action.payload.selectedTabIndex,
        displayMoreMenu: action.payload.displayMoreMenu,
      };
    }
    case 'changingTab':
      action.payload?.tabChanged?.(action.payload.tabName, action.payload.index);
      return { ...state };
    case 'updatingLabel': {
      return {
        ...state,
        moreTabLabel: action.payload.moreTabLabel,
      };
    }
    default: {
      return { ...state };
    }
  }
};

/**
 * Tabs are used to display multiple contents in a single container.
 *
 * Tabs are useful for displaying different contexts without having to navigate to other pages.
 */
const TabView: FunctionComponent<TabViewProps> = ({
  tabs,
  initialTabName,
  directAccessTabs = 0,
  disabled = false,
  maxTabWidth = 127,
  tabHeaderElement = null,
  tabChanged = () => null,
}: TabViewProps) => {
  const [state, dispatch] = useReducer(reducer, {
    selectedTabIndex: tabs.map((t) => t.name).indexOf(initialTabName),
    displayMoreMenu: false,
    moreTabLabel: 'More',
  });

  const menuRef = useRef<HTMLDivElement | null>(null);

  const computeTabs = () => (directAccessTabs && tabs.length > directAccessTabs ? [tabs.slice(0, directAccessTabs), tabs.slice(directAccessTabs)]
    : [tabs, null]);

  const toggleMoreMenu = () => {
    const displayMenu = !state.displayMoreMenu;
    dispatch({ type: 'togglingMore', payload: { displayMoreMenu: displayMenu } });
    if (displayMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  };

  const handleClickOutside = (event: React.MouseEvent<any>) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && state.displayMoreMenu) {
      toggleMoreMenu();
    }
    document.removeEventListener('mousedown', handleClickOutside);
  };

  const doChangeTab = (tabName: string, index: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!disabled) {
      dispatch({ type: 'clickingTab', payload: { selectedTabIndex: index, displayMoreMenu: false } });
      dispatch({ type: 'changingTab', payload: { tabName, index, tabChanged } });
    }
    if (directAccessTabs && index >= directAccessTabs) {
      dispatch({ type: 'updatingLabel', payload: { moreTabLabel: tabName } });
    } else {
      dispatch({ type: 'updatingLabel', payload: { moreTabLabel: 'More' } });
    }
  };

  const renderMoreMenu = (moreTabs : null | Array<Tab>, visibleTabs: null | Array<Tab>) => (
    <div className={styles.moreMenu} ref={menuRef} role="listbox">
      <div className={styles.titleBox}>
        <span className={styles.title}>
          {' '}
          {state.moreTabLabel}
          {' '}
        </span>
        <span className={clsx('pyreneIcon-chevronDown', styles.moreArrow)} />
      </div>
      {moreTabs?.map?.((tab, index) => (
        <div
          className={clsx(styles.option, { [styles.disabled]: tab.disabled })}
          onClick={(event) => !tab.disabled && doChangeTab(tab.name, index + (visibleTabs?.length || 0), event)}
          key={tab.name}
          role="option"
        >
          <span className={styles.optionLabel}>{tab.name}</span>
          {tab.renderAuxiliaryInfo?.()}
        </div>
      ))}
    </div>
  );

  const [visibleTabs, moreTabs] = computeTabs();

  return (
    <div className={clsx(styles.tabView, { [styles.disabled]: disabled })}>
      <div className={styles.tabBar} role="tablist">
        {
          visibleTabs?.map?.((tab, index) => (
            <div
              className={clsx(
                styles.tab,
                { [styles.selected]: index === state.selectedTabIndex },
                { [styles.disabled]: tab.disabled },
                'unSelectable',
              )}
              style={{ maxWidth: maxTabWidth }}
              onClick={(event) => !tab.disabled && doChangeTab(tab.name, index, event)}
              key={tab.name}
              role="tab"
            >
              {tab.name}
              {tab.renderAuxiliaryInfo?.()}
            </div>
          ))
        }
        {moreTabs && moreTabs.length > 0
        && (
          <div
            className={clsx(
              styles.moreTab,
              { [styles.displayMenu]: state.displayMoreMenu },
              { [styles.selected]: state.selectedTabIndex >= (!!visibleTabs && visibleTabs.length) },
              { [styles.hidden]: !moreTabs.some((element) => (typeof element.disabled === 'undefined' || element.disabled === false)) },
              'unSelectable',
            )}
            style={{ maxWidth: maxTabWidth }}
            onClick={toggleMoreMenu}
          >
            <div className={styles.titleBox}>
              <span className={styles.title}>
                {' '}
                {state.moreTabLabel}
                {' '}
              </span>
              <span className={clsx('pyreneIcon-chevronDown', styles.moreArrow)} />
            </div>
            {renderMoreMenu(moreTabs, visibleTabs)}
          </div>
        )}
      </div>
      {tabHeaderElement}
      <div className={clsx(styles.tabContent, { [styles.withHeader]: !!tabHeaderElement })} role="tabpanel">
        {tabs[state.selectedTabIndex].renderCallback()}
      </div>

    </div>
  );
};

TabView.displayName = 'TabView';

export default TabView;

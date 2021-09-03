/* eslint-disable react/static-property-placement */
import React, {
  createRef, MouseEvent, ReactNode, Component,
} from 'react';
import clsx from 'clsx';

import styles from './tabView.module.css';

interface Tab {
  disabled?: boolean,
  name: string,
  renderAuxiliaryInfo?: () => void,
  renderCallback: () => JSX.Element,
}

export interface TabViewProps {
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
  tabHeaderElement?: ReactNode,
  /**
   * Data input array for the tabs.
   * Type: [{ name: string (required), renderAuxiliaryInfo: func, renderCallback: func (required), disabled: bool }]
   */
  tabs: Array<Tab>,
}

interface TabViewState {
  selectedTabIndex: number,
  displayMoreMenu: boolean,
  moreTabLabel: string,
}

/**
 * Tabs are used to display multiple contents in a single container.
 *
 * Tabs are useful for displaying different contexts without having to navigate to other pages.
 */
export default class TabView extends Component<TabViewProps, TabViewState> {

  menuRef = createRef<HTMLDivElement>();

  static displayName = 'TabView';

  static defaultProps = {
    disabled: false,
    directAccessTabs: undefined,
    maxTabWidth: 127,
    tabHeaderElement: null,
  };

  constructor(props: TabViewProps) {
    super(props);

    this.state = {
      selectedTabIndex: props.tabs.map((t) => t.name).indexOf(props.initialTabName),
      displayMoreMenu: false,
      moreTabLabel: 'More',
    };
  }

  computeTabs = ():[Array<Tab>, Array<Tab> | null] => (this.props.directAccessTabs && this.props.tabs.length > this.props.directAccessTabs
    ? [
      this.props.tabs.slice(0, this.props.directAccessTabs),
      this.props.tabs.slice(this.props.directAccessTabs),
    ]
    : [
      this.props.tabs,
      null,
    ]);

  handleClickOutside = (event: MouseEvent | any): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (this.menuRef.current && !this.menuRef.current.contains(event.target as Element) && this.state.displayMoreMenu) {
      this.toggleMoreMenu();
    }
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  toggleMoreMenu = (): void => {
    const displayMenu = !this.state.displayMoreMenu;
    this.setState(() => ({
      displayMoreMenu: displayMenu,
    }));
    if (displayMenu) {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  };

  _tabChanged(tabName: string, index: number, event: MouseEvent<HTMLElement>): void {
    event.stopPropagation();
    if (!this.props.disabled) {
      this.setState(() => ({
        selectedTabIndex: index,
        displayMoreMenu: false,
      }),
      () => this.props?.tabChanged?.(tabName, index));
    }
    if (this.props.directAccessTabs && index >= this.props.directAccessTabs) {
      this.setState(() => ({
        moreTabLabel: tabName,
      }));
    } else {
      this.setState(() => ({
        moreTabLabel: 'More',
      }));
    }
  }

  renderMoreMenu = (moreTabs: null | Array<Tab>, visibleTabs: Array<Tab>): JSX.Element => (
    <div className={styles.moreMenu} ref={this.menuRef} role="listbox">
      <div className={styles.titleBox}>
        <span className={styles.title}>
          {' '}
          {this.state.moreTabLabel}
          {' '}
        </span>
        <span className={clsx('pyreneIcon-chevronDown', styles.moreArrow)} />
      </div>
      {moreTabs?.map?.((tab, index) => (
        <div
          className={clsx(styles.option, { [styles.disabled]: tab.disabled })}
          onClick={(event) => !tab.disabled && this._tabChanged(tab.name, index + visibleTabs.length, event)}
          key={tab.name}
          role="option"
        >
          <span className={styles.optionLabel}>{tab.name}</span>
          {tab.renderAuxiliaryInfo?.()}
        </div>
      ))}
    </div>
  );

  render(): JSX.Element {
    const [visibleTabs, moreTabs] = this.computeTabs();

    return (
      <div className={clsx(styles.tabView, { [styles.disabled]: this.props.disabled })}>
        <div className={styles.tabBar} role="tablist">
          {
            visibleTabs?.map?.((tab, index) => (
              <div
                className={clsx(
                  styles.tab,
                  { [styles.selected]: index === this.state.selectedTabIndex },
                  { [styles.disabled]: tab.disabled },
                  'unSelectable',
                )}
                style={{ maxWidth: this.props.maxTabWidth }}
                onClick={(event) => !tab.disabled && this._tabChanged(tab.name, index, event)}
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
                { [styles.displayMenu]: this.state.displayMoreMenu },
                { [styles.selected]: this.state.selectedTabIndex >= (visibleTabs?.length || 0) },
                { [styles.hidden]: !moreTabs.some((element) => (typeof element.disabled === 'undefined' || element.disabled === false)) },
                'unSelectable',
              )}
              style={{ maxWidth: this.props.maxTabWidth }}
              onClick={this.toggleMoreMenu}
            >
              <div className={styles.titleBox}>
                <span className={styles.title}>
                  {' '}
                  {this.state.moreTabLabel}
                  {' '}
                </span>
                <span className={clsx('pyreneIcon-chevronDown', styles.moreArrow)} />
              </div>
              {this.renderMoreMenu(moreTabs, visibleTabs)}
            </div>
          )}
        </div>
        {this.props.tabHeaderElement}
        <div className={clsx(styles.tabContent, { [styles.withHeader]: !!this.props.tabHeaderElement })} role="tabpanel">
          {this.props.tabs[this.state.selectedTabIndex].renderCallback()}
        </div>
      </div>
    );
  }

}

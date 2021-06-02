import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './tabView.css';

/**
 * Tabs are used to display multiple contents in a single container.
 *
 * Tabs are useful for displaying different contexts without having to navigate to other pages.
 */
export default class TabView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTabIndex: props.tabs.map((t) => t.name).indexOf(props.initialTabName),
      displayMoreMenu: false,
      moreTabLabel: 'More',
    };
  }

  computeTabs = () => (this.props.directAccessTabs && this.props.tabs.length > this.props.directAccessTabs
    ? [
      this.props.tabs.slice(0, this.props.directAccessTabs),
      this.props.tabs.slice(this.props.directAccessTabs),
    ]
    : [
      this.props.tabs,
      null,
    ]);

  handleClickOutside = (event) => {
    if (this.menuRef && !this.menuRef.contains(event.target) && this.state.displayMoreMenu) {
      this.toggleMoreMenu();
    }
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  toggleMoreMenu = () => {
    const displayMenu = !this.state.displayMoreMenu;
    this.setState(() => ({
      displayMoreMenu: displayMenu,
    }));
    if (displayMenu) {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  };

  _tabChanged(tabName, index, event) {
    event.stopPropagation();
    if (!this.props.disabled) {
      this.setState(() => ({
        selectedTabIndex: index,
        displayMoreMenu: false,
      }),
      () => this.props.tabChanged(tabName, index));
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

  renderMoreMenu = (moreTabs, visibleTabs) => (
    <div className={styles.moreMenu} ref={(menu) => { this.menuRef = menu; }} role="listbox">
      <div className={styles.titleBox}>
        <span className={styles.title}>
          {' '}
          {this.state.moreTabLabel}
          {' '}
        </span>
        <span className={clsx('pyreneIcon-chevronDown', styles.moreArrow)} />
      </div>
      {moreTabs.map((tab, index) => (
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

  render() {
    const [visibleTabs, moreTabs] = this.computeTabs();

    return (
      <div className={clsx(styles.tabView, { [styles.disabled]: this.props.disabled })}>
        <div className={styles.tabBar} role="tablist">
          {
            visibleTabs.map((tab, index) => (
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
                { [styles.selected]: this.state.selectedTabIndex >= visibleTabs.length },
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

TabView.displayName = 'TabView';

TabView.defaultProps = {
  disabled: false,
  tabChanged: () => null,
  directAccessTabs: null,
  maxTabWidth: 127,
  tabHeaderElement: null,
};

TabView.propTypes = {
  /**
   * Sets the number of tabs that are displayed before the more tab.
   */
  directAccessTabs: PropTypes.number,
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Sets the tab to preselect when the component is first mounted.
   */
  initialTabName: PropTypes.string.isRequired,
  /**
   * Sets a maximum allowed width for the tabs.
   */
  maxTabWidth: PropTypes.number,
  /**
   * Called when the selected tab changes.
   */
  tabChanged: PropTypes.func,
  /**
   * Tab header element between tab content and tabs
   */
  tabHeaderElement: PropTypes.element,
  /**
   * Data input array for the tabs.
   * Type: [{ name: string (required), renderAuxiliaryInfo: func, renderCallback: func (required), disabled: bool }]
   */
  tabs: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    renderAuxiliaryInfo: PropTypes.func,
    renderCallback: PropTypes.func.isRequired,
  })).isRequired,
};

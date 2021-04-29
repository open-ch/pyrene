import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './tabView.css';

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
    <div styleName="moreMenu" ref={(menu) => { this.menuRef = menu; }} role="listbox">
      <div styleName="titleBox">
        <span styleName="title">
          {' '}
          {this.state.moreTabLabel}
          {' '}
        </span>
        <span className="pyreneIcon-chevronDown" styleName="moreArrow" />
      </div>
      {moreTabs.map((tab, index) => (
        <div
          styleName={clsx('option', { disabled: tab.disabled })}
          onClick={(event) => !tab.disabled && this._tabChanged(tab.name, index + visibleTabs.length, event)}
          key={tab.name}
          role="option"
        >
          <span styleName="optionLabel">{tab.name}</span>
          {tab.renderAuxiliaryInfo?.()}
        </div>
      ))}
    </div>
  );

  render() {
    const [visibleTabs, moreTabs] = this.computeTabs();

    return (
      <div styleName={clsx('tabView', { disabled: this.props.disabled })}>
        <div styleName="tabBar" role="tablist">
          {
            visibleTabs.map((tab, index) => (
              <div
                styleName={clsx(
                  'tab',
                  { selected: index === this.state.selectedTabIndex },
                  { disabled: tab.disabled },
                )}
                className="unSelectable"
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
              styleName={
                clsx(
                  'moreTab',
                  { displayMenu: this.state.displayMoreMenu },
                  { selected: this.state.selectedTabIndex >= visibleTabs.length },
                  { hidden: !moreTabs.some((element) => (typeof element.disabled === 'undefined' || element.disabled === false)) },
                )
              }
              className="unSelectable"
              style={{ maxWidth: this.props.maxTabWidth }}
              onClick={this.toggleMoreMenu}
            >
              <div styleName="titleBox">
                <span styleName="title">
                  {' '}
                  {this.state.moreTabLabel}
                  {' '}
                </span>
                <span className="pyreneIcon-chevronDown" styleName="moreArrow" />
              </div>
              {this.renderMoreMenu(moreTabs, visibleTabs)}
            </div>
          )}
        </div>
        {this.props.tabHeaderElement}
        <div styleName={clsx('tabContent', { withHeader: !!this.props.tabHeaderElement })} role="tabpanel">
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

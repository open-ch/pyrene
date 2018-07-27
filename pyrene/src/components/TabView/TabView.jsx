import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './tabView.css';

/**
 * Feed me data and i shall give you tabs
 */
export default class TabView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTabIndex: props.tabs.map(t => t.name).indexOf(props.initialTabName),
      displayMoreMenu: false,
      moreTabLabel: 'More',
    };
  }

  _tabChanged(tabName, index, event) {
    event.stopPropagation();
    if (!this.props.disabled) {
      this.setState((prevState, props) => ({
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
      }))
    }
  }

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

  renderMoreMenu = (moreTabs, visibleTabs) => (
    <div styleName={'moreMenu'} ref={(menu) => { this.menuRef = menu; }} role="listbox">
      <div styleName={'titleBox'}>
        <span styleName={'title'}> {this.state.moreTabLabel} </span>
        <span className={'icon-collapsDown'} styleName={'moreArrow'} />
      </div>
      {moreTabs.map((tab, index) =>
        <div
          styleName={classNames('option', {disabled: tab.disabled})} key={tab.name} onClick={(event) => !tab.disabled && this._tabChanged(tab.name, index + visibleTabs.length, event)}
          role="option"
        >
          <span styleName={'optionLabel'}>{tab.name}</span>
        </div>
      )}
    </div>
  );

  computeTabs = () => {
    return this.props.directAccessTabs && this.props.tabs.length > this.props.directAccessTabs
      ? [
        this.props.tabs.slice(0, this.props.directAccessTabs),
        this.props.tabs.slice(this.props.directAccessTabs),
      ]
      : [
        this.props.tabs,
        null,
      ];
  };

  render() {
    const [visibleTabs, moreTabs] = this.computeTabs();

    return (
      <div styleName={classNames('tabView', {disabled: this.props.disabled})}>
        <div styleName={'tabBar'} role="tablist">
          {
            visibleTabs.map((tab, index) => (
                <div
                  styleName={classNames(
                      'tab',
                      { selected: index === this.state.selectedTabIndex },
                      { disabled: tab.disabled })
                  }
                  className={'unSelectable'}
                  style={{maxWidth: this.props.maxTabWidth}}
                  onClick={(event) => !tab.disabled && this._tabChanged(tab.name, index, event)}
                  key={tab.name}
                  role="tab"
                >
                  {tab.name}
                </div>
            ))
          }
          {moreTabs && moreTabs.length > 0 &&
          <div
            styleName={
              classNames(
                'moreTab',
                {displayMenu: this.state.displayMoreMenu},
                {selected: this.state.selectedTabIndex >= visibleTabs.length},
                {hidden: !moreTabs.some((element) => (typeof element.disabled === 'undefined' || element.disabled === false))}
              )}
            className={'unSelectable'}
            style={{maxWidth: this.props.maxTabWidth}}
            onClick={this.toggleMoreMenu}>
            <div styleName={'titleBox'}>
              <span styleName={'title'}> {this.state.moreTabLabel} </span>
              <span className={'icon-collapsDown'} styleName={'moreArrow'} />
            </div>
            {this.renderMoreMenu(moreTabs, visibleTabs)}
          </div>
          }
        </div>

        <div className="tabContent" role="tabpanel">
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
};

TabView.propTypes = {
  /**
   * Number of tabs that are displayed before the "more" tab.
   */
  directAccessTabs: PropTypes.number,
  /**
   * Whether or not the tabView is active.
   */
  disabled: PropTypes.bool,
  /**
   * Name of the tab to preselect on firs load.
   */
  initialTabName: PropTypes.string.isRequired,
  /**
   * Maximum allowed width of the tabs.
   */
  maxTabWidth: PropTypes.number,
  /**
   * Event handler. Triggered the selected tab changes.
   */
  tabChanged: PropTypes.func,
  /**
   * Data input array for the tabs. [{name: string required, renderCallback: func required, disabled: bool}]
   */
  tabs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    renderCallback: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  })).isRequired,
};

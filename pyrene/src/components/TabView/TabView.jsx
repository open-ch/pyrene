import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './tabView.css';


export default class TabView extends React.Component {

  constructor(props) {
    super(props);

    const [visibleTabs, moreTabs] = this.props.moreTabCutoff && this.props.tabs.length > this.props.moreTabCutoff
      ? [
        this.props.tabs.slice(0, this.props.moreTabCutoff),
        this.props.tabs.slice(this.props.moreTabCutoff),
      ]
      : [
        this.props.tabs,
        null,
      ];

    this.state = {
      selectedTabIndex: props.tabs.map(t => t.name).indexOf(props.initialTabName),
      visibleTabs,
      moreTabs,
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
    if (index >= this.state.visibleTabs.length) {
      this.setState(() => ({
        moreTabLabel: tabName,
      }));
    } else {
      this.setState(() => ({
        moreTabLabel: 'More',
      }))
    }
  }

  toggleMoreMenu = () => {
    this.setState((prevState, props) => ({
      displayMoreMenu: !prevState.displayMoreMenu,
    }));
  };

  renderMoreMenu = () => (
    <div styleName={'moreMenu'}>
      <div styleName={'title'}>
        {this.state.moreTabLabel}
        <span className={'icon-collapsUp'} styleName={'moreArrow'} />
      </div>
      {this.state.moreTabs.map((tab, index) => <div styleName={'option'} onClick={(event) => !tab.disabled && this._tabChanged(tab.name, index + this.state.visibleTabs.length, event)}>{tab.name}</div>)}
    </div>
  );

  render() {

    return (
      <div styleName={'tabView'}>

        <div styleName={'tabBar'}>
          {
            this.state.visibleTabs.map((tab, index) => (
                <div
                  styleName={classNames(
                      'tab',
                      { selected: index === this.state.selectedTabIndex },
                      { disabled: tab.disabled })
                  }
                  className={'unSelectable'}
                  onClick={(event) => !tab.disabled && this._tabChanged(tab.name, index, event)}
                  key={tab.name}
                >
                  {tab.name}
                </div>
            ))
          }

          {this.state.moreTabs && this.state.moreTabs.length > 0 &&
          <div
            styleName={
              classNames(
                'moreTab',
                {displayMenu: this.state.displayMoreMenu},
                {selected: this.state.selectedTabIndex >= this.state.visibleTabs.length},
                {disabled: !this.state.moreTabs.some((element) => (element.disabled === false))}
              )}
            className={'unSelectable'}
            onClick={this.toggleMoreMenu}>
            {this.state.moreTabLabel}
            <span className={'icon-collapsDown'} styleName={'moreArrow'} />
            {this.state.displayMoreMenu && this.renderMoreMenu()}
          </div>
          }
        </div>

        <div id="tabContent">
          {this.props.tabs.map((e, i) => (i === this.state.selectedTabIndex ? (<div key={e.name}>{e.renderCallback()}</div>) : null))}
        </div>

      </div>
    );
  }
}


TabView.displayName = 'TabView';

TabView.defaultProps = {
  disabled: false,
  tabChanged: () => {},
  moreTabCutoff: null,
};

TabView.propTypes = {
  disabled: PropTypes.bool,
  initialTabName: PropTypes.string.isRequired,
  tabChanged: PropTypes.func,
  moreTabCutoff: PropTypes.number,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    renderCallback: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  })).isRequired,
};

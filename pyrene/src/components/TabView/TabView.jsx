import React from 'react';
import PropTypes from 'prop-types';

import './tabView.css';


export default class TabView extends React.Component {

  constructor(props) {
    super(props);

    const [visibleTabs, moreTabs] = this.props.moreTabCutoff && this.props.tabs.length > this.props.moreTabCutoff
      ? [
        this.props.tabs.slice(0, this.props.moreTabCutoff + 1),
        this.props.tabs.slice(this.props.moreTabCutoff + 1),
      ]
      : [
        this.props.tabs,
        null,
      ];

    this.state = {
      selectedTabIndex: props.tabs.map(t => t.name).indexOf(props.initialTabName),
      visibleTabs,
      moreTabs,
    };

  }

  _tabChanged(tab, index) {
    if (!this.props.disabled) {
      this.setState({
        selectedTabIndex: index,
      });
      this.props.tabChanged(tab, index);
    }
  }

  render() {

    return (
      <div>
        <ul id="tabBar">
          {
            this.state.visibleTabs.map((tab, index) => {
              const classNames = [];
              if (index === this.state.selectedTabIndex) {
                classNames.push('selected');
              }
              if (tab.disabled) {
                classNames.push('disabled');
              }

              return (
                <li key={tab.name}>
                  <a
                    id={`${tab.name}Tab`} href={`#${tab.name}`}
                    className={classNames.join(' ')}
                    onClick={() => !tab.disabled && this._tabChanged(tab.name, index)}
                  >
                    {tab.name}
                  </a>
                </li>
              );
            })
          }

          {this.state.moreTabs && this.state.moreTabs.length > 0 && (() => {

            const showMoreOption = this.state.selectedTabIndex <= this.props.moreTabCutoff;
            const classNames = ['moreTab'];

            if (this.state.selectedTabIndex > this.props.moreTabCutoff) {
              classNames.push('selected');
            }

            return (
              <li className="moreTab">
                <select
                  className={classNames.join(' ')}
                  onChange={(event) => {

                    const index = showMoreOption
                      ? parseInt(event.target.value) + 1
                      : parseInt(event.target.value);

                    const tab = this.props.tabs[index];

                    if (!tab.disabled) {
                      this._tabChanged(tab.name, index);
                    }

                  }}
                >
                  {showMoreOption && <option value="none" selected>MORE</option>}
                  {
                    this.state.moreTabs.map((tab, index) => {
                      return (
                        <option
                          key={tab.name}
                          value={index + this.props.moreTabCutoff}
                        >{tab.name}</option>
                      )
                    })
                  }
                </select>
              </li>
            )

          })()

          }

        </ul>

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

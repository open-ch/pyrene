import React from 'react';
import Icon from '../Icon/Icon';
import Placeholder from '../../examples/Placeholder';

const TabView = {};

const renderAuxiliaryIcon = (name) => (
  <div style={{ marginLeft: 4 }}>
    <Icon name={name} />
  </div>
);

TabView.props = {
  initialTabName: 'Tab 1',
  directAccessTabs: 3,
  tabChanged: (stateProvider) => () => stateProvider.setState((prevState) => ({ tabName: prevState.tabName ? prevState.tabName + 1 : 1 })),
  tabs: (stateProvider) => [
    { name: 'Tab 1', renderAuxiliaryInfo: () => renderAuxiliaryIcon('home'), renderCallback: () => <Placeholder label="tab 1" /> }, // eslint-disable-line react/display-name
    { name: 'Tab 2', renderCallback: () => <Placeholder label={`Tab ${stateProvider.state.tabName}`} />, disabled: false }, // eslint-disable-line react/display-name
    { name: 'Tab 3', renderCallback: () => <Placeholder label="tab 3" />, disabled: true }, // eslint-disable-line react/display-name
    { name: 'Looooooooooooooooooooooooooooooooooooooong Name', renderCallback: () => <Placeholder label="tab 4" /> }, // eslint-disable-line react/display-name
    {
      name: 'Tab 5', renderAuxiliaryInfo: () => renderAuxiliaryIcon('info'), renderCallback: () => <Placeholder label="tab 5" />, disabled: true, // eslint-disable-line react/display-name
    },
  ],
};

TabView.category = 'Layout';

export default TabView;

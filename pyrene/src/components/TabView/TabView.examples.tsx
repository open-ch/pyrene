import React from 'react';
import Icon from '../Icon/Icon';
import Placeholder from '../../examples/Placeholder';
import { TabViewProps } from './TabView';
import { Example, StateProvider } from '../../examples/Example';
import { IconNames } from '../types';

const renderAuxiliaryIcon = (name: keyof IconNames) => (
  <div style={{ marginLeft: 4 }}>
    <Icon name={name} />
  </div>
);

interface State {
  tabName: number;
}

const TabView: Example<TabViewProps, State> = {
  props: {
    initialTabName: 'Tab 1',
    directAccessTabs: 3,
    tabChanged: (stateProvider: StateProvider<State>) => () => stateProvider.setState((prevState) => ({ tabName: prevState.tabName ? prevState.tabName + 1 : 1 })),
    tabs: (stateProvider) => [
      { name: 'Tab 1', renderAuxiliaryInfo: () => renderAuxiliaryIcon('home'), renderCallback: () => <Placeholder label="tab 1" /> }, // eslint-disable-line react/display-name
      { name: 'Tab 2', renderCallback: () => <Placeholder label={`Tab ${stateProvider.state.tabName}`} />, disabled: false }, // eslint-disable-line react/display-name
      { name: 'Tab 3', renderCallback: () => <Placeholder label="tab 3" />, disabled: true }, // eslint-disable-line react/display-name
      { name: 'Looooooooooooooooooooooooooooooooooooooong Name', renderCallback: () => <Placeholder label="tab 4" /> }, // eslint-disable-line react/display-name
      {
        name: 'Tab 5', renderAuxiliaryInfo: () => renderAuxiliaryIcon('info'), renderCallback: () => <Placeholder label="tab 5" />, disabled: true, // eslint-disable-line react/display-name
      },
    ],
  },
  category: 'Layout',
};

export default TabView;

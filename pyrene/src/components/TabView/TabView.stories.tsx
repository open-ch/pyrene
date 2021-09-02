import React from 'react';

import { Story, Meta } from '@storybook/react';
import Icon from '../Icon/Icon';
import TabViewComponent, { TabViewProps } from './TabView';
import Placeholder from '../../examples/Placeholder';
import { Example, StateProvider } from '../../examples/Example';

export default {
  title: 'Components/Layout/TabView',
  component: TabViewComponent,
} as Meta;

interface State {
  tabName: string
}

const renderAuxiliaryIcon = (name: string) => (
  <div style={{ marginLeft: 4 }}>
    <Icon name={name} />
  </div>
);

const Template: Story<Example<TabViewProps, State>> = (args) => <TabViewComponent {...args as any} />;

export const TabView = Template.bind({});

TabView.args = {
  props: {
    initialTabName: 'Tab 1',
    directAccessTabs: 3,
    tabChanged: (stateProvider: StateProvider<State>) => () => stateProvider.setState((prevState) => ({ tabName: prevState.tabName ? `${prevState.tabName} ${1}` : '1' })),
    tabs: (stateProvider: StateProvider<State>) => [
      { name: 'Tab 1', renderAuxiliaryInfo: () => renderAuxiliaryIcon('home'), renderCallback: () => <Placeholder label="tab 1" /> }, // eslint-disable-line react/display-name
      { name: 'Tab 2', renderCallback: () => <Placeholder label={`Tab ${stateProvider.state.tabName}`} />, disabled: false }, // eslint-disable-line react/display-name
      { name: 'Tab 3', renderCallback: () => <Placeholder label="tab 3" />, disabled: true }, // eslint-disable-line react/display-name
      { name: 'Looooooooooooooooooooooooooooooooooooooong Name', renderCallback: () => <Placeholder label="tab 4" /> }, // eslint-disable-line react/display-name
      {
        name: 'Tab 5', renderAuxiliaryInfo: () => renderAuxiliaryIcon('info'), renderCallback: () => <Placeholder label="tab 5" />, disabled: true, // eslint-disable-line react/display-name
      },
    ],
  },
};

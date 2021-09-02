// @ts-nocheck
import React from 'react';

import { Story, Meta } from '@storybook/react';
import Icon from '../Icon/Icon';
import TabViewComponent, { TabViewProps } from './TabView';
import StateProvider from '../../examples/StateProvider';
import Placeholder from '../../examples/Placeholder';

export default {
  title: 'Components/Layout/TabView',
  component: TabViewComponent,
} as Meta;

const renderAuxiliaryIcon = (name: string) => (
  <div style={{ marginLeft: 4 }}>
    <Icon name={name} />
  </div>
);

type ProviderState = {
  tabName: number;
};

const Template: Story<TabViewProps> = (args) => (
  <StateProvider<TabViewProps, ProviderState> initState={{ tabName: undefined }}>
    {
      (state, setState) => ({
        component: TabViewComponent,
        props: {
          initialTabName: 'Tab 1',
          directAccessTabs: 3,
          tabChanged: () => setState((prevState: ProviderState) => ({ tabName: prevState.tabName ? prevState.tabName + 1 : 1 })),
          tabs: [
            { name: 'Tab 1', renderAuxiliaryInfo: () => renderAuxiliaryIcon('home'), renderCallback: () => <Placeholder label="tab 1" /> }, // eslint-disable-line react/display-name
            { name: 'Tab 2', renderCallback: () => <Placeholder label={`Tab ${state.tabName || ''}`} />, disabled: false }, // eslint-disable-line react/display-name
            { name: 'Tab 3', renderCallback: () => <Placeholder label="tab 3" />, disabled: true }, // eslint-disable-line react/display-name
            { name: 'Looooooooooooooooooooooooooooooooooooooong Name', renderCallback: () => <Placeholder label="tab 4" /> }, // eslint-disable-line react/display-name
            {
              name: 'Tab 5', renderAuxiliaryInfo: () => renderAuxiliaryIcon('info'), renderCallback: () => <Placeholder label="tab 5" />, disabled: true, // eslint-disable-line react/display-name
            },
          ],
        },
      })
    }
  </StateProvider>
);

export const TabView = Template.bind({});

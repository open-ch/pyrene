import React from 'react';

import { Story, Meta } from '@storybook/react';
import Icon from '../Icon/Icon';
import TabViewComponent, { TabViewProps } from './TabView';
import Placeholder from '../../examples/Placeholder';
import { IconNames } from '../types';

export default {
  title: 'Components/Layout/TabView',
  component: TabViewComponent,
} as Meta;

const renderAuxiliaryIcon = (name: keyof IconNames) => (
  <div style={{ marginLeft: 4 }}>
    <Icon name={name} />
  </div>
);

const Template: Story<TabViewProps> = (args) => <TabViewComponent {...args} />;

export const TabView = Template.bind({});

TabView.args = {
  initialTabName: 'Tab 1',
  directAccessTabs: 3,
  tabs: [
    { name: 'Tab 1', renderAuxiliaryInfo: () => renderAuxiliaryIcon('home'), renderCallback: () => <Placeholder label="tab 1" /> }, // eslint-disable-line react/display-name
    { name: 'Tab 2', renderCallback: () => <Placeholder label="Tab 2" />, disabled: false }, // eslint-disable-line react/display-name
    { name: 'Tab 3', renderCallback: () => <Placeholder label="tab 3" />, disabled: true }, // eslint-disable-line react/display-name
    { name: 'Looooooooooooooooooooooooooooooooooooooong Name', renderCallback: () => <Placeholder label="tab 4" /> }, // eslint-disable-line react/display-name
    {
      name: 'Tab 5', renderAuxiliaryInfo: () => renderAuxiliaryIcon('info'), renderCallback: () => <Placeholder label="tab 5" />, disabled: true, // eslint-disable-line react/display-name
    },
  ],
};

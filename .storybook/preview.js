import '../pyrene/src/styles/common.module.css';
import '../pyrene/src/styles/colors.module.css';
import '../pyrene/src/styles/fonts.module.css';

import {
  Title,
  Subtitle,
  Description,
  ArgsTable,
} from '@storybook/addon-docs';

import kitchensinkTheme from './KitchensinkTheme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: kitchensinkTheme,
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <ArgsTable />
      </>
    ),
  },
}

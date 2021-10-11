import '../pyrene/src/styles/common.module.css';
import '../pyrene/src/styles/colors.module.css';
import '../pyrene/src/styles/fonts.module.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
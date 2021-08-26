import '../src/styles/common.module.css';
import '../src/styles/colors.module.css';
import '../src/styles/fonts.module.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

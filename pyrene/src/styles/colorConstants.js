/* handy dandy regex when adding a lot of new icons:
   CMD + R -> activate Regex checkbox
   Search field: ((.*(-(\d{3}:\s(.{7}(;
   Replace field: $2$4'$5',
*/

const colorPalette = {
  /* NEUTRAL */
  neutral500: '#1d273b',
  neutral400: '#454d61',
  neutral300: '#6b7282',
  neutral200: '#979ca8',
  neutral100: '#c0c4cc',
  neutral050: '#e1e3e8',
  neutral030: '#f0f2f5',
  neutral020: '#fafbfc',
  neutral010: '#fafafa',
  neutral000: '#ffffff',

  /* BLUE */
  blue950: '#002061',
  blue900: '#00297d',
  blue800: '#003296',
  blue700: '#003bb2',
  blue600: '#0049db',
  blue500: '#0055ff',
  blue400: '#3075ff',
  blue300: '#5c92ff',
  blue200: '#78a5ff',
  blue100: '#bad1ff',
  blue050: '#dbe7ff',

  /* RED */
  red950: '#57080f',
  red900: '#700b13',
  red800: '#8a0d18',
  red700: '#a7101d',
  red600: '#ca1423',
  red500: '#e61728',
  red400: '#ec535f',
  red300: '#f0747e',
  red200: '#f3969e',
  red100: '#f7b9be',
  red050: '#fbdcde',
  red010: '#fff9f9',

  /* ORANGE */
  orange950: '#8b3c07',
  orange900: '#b95408',
  orange800: '#cf6706',
  orange700: '#e47306',
  orange600: '#f58602',
  orange500: '#ff9500',
  orange400: '#ffb445',
  orange300: '#ffc063',
  orange200: '#ffd08b',
  orange100: '#ffeacc',
  orange050: '#fff4e5',
  orange010: '#fffcf7',

  /* GREEN */
  green950: '#005128',
  green900: '#006834',
  green800: '#008040',
  green700: '#009c4e',
  green600: '#00bb5d',
  green500: '#00d66b',
  green400: '#42e091',
  green300: '#6be7a9',
  green200: '#8cecbc',
  green100: '#b3f2d2',
  green050: '#d9f8e8',
  green010: '#f7fdf9',

  /* ACQUA */
  acqua950: '#094d5f',
  acqua900: '#0c647a',
  acqua800: '#0f7b96',
  acqua700: '#1295b6',
  acqua600: '#15b4db',
  acqua500: '#19cdfa',
  acqua400: '#44d6fa',
  acqua300: '#62ddfb',
  acqua200: '#7ce2fc',
  acqua100: '#b5eefd',
  acqua050: '#d5f5fe',

  /* TEAL */
  teal950: '#045346',
  teal900: '#056b5a',
  teal800: '#06836f',
  teal700: '#089f86',
  teal600: '#09c0a2',
  teal500: '#0bdbb9',
  teal400: '#4ae4cb',
  teal300: '#71ead6',
  teal200: '#90eedf',
  teal100: '#b6f4ea',
  teal050: '#daf9f4',
};

const functionalColors = {
  /* DEFAULT */
  backgroundLight: colorPalette.neutral000,
  backgroundTint: colorPalette.neutral020,
  border: colorPalette.neutral050,
  text: colorPalette.neutral500,
  icon: colorPalette.neutral300,
  iconLight: colorPalette.neutral100,
  primary: colorPalette.blue500,
  primaryDark: colorPalette.blue600,
  secondary: colorPalette.neutral030,
  secondaryDark: colorPalette.neutral050,

  /* STATUS */
  okFg: colorPalette.green500,
  okDark: colorPalette.green700,
  okLight: colorPalette.green100,
  okLighter: colorPalette.green050,

  dangerFg: colorPalette.red500,
  dangerDark: colorPalette.red600,
  dangerLight: colorPalette.red100,
  dangerLighter: colorPalette.red050,

  warningFg: colorPalette.orange500,
  warningDark: colorPalette.orange700,
  warningLight: colorPalette.orange100,
  warningLighter: colorPalette.orange050,

  outageFg: colorPalette.neutral500,
  outageLight: colorPalette.neutral100,

  inactiveFg: colorPalette.neutral100,
  inactiveLight: colorPalette.neutral050,

  informationFg: colorPalette.blue500,
  informationLight: colorPalette.blue050,

  /* ADMIN */
  adminFg: colorPalette.red500,
  adminBg: colorPalette.red050,
};

const colorConstants = {...colorPalette, ...functionalColors};

export default colorConstants;
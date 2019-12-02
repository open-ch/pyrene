/* eslint-disable no-nested-ternary */


/* Print style to console:
   object: (base, state) => {
    console.log('object');
    console.log(base);
    return {...base};
   }
 */

import colorConstants from '../../styles/colorConstants';

const selectStyle = {
  container: (base) => ({
    ...base,
    fontFamily: 'FiraGO, Helvetica, sans-serif !important',
    fontSize: 12,
    fontWeight: 'normal',
    width: '100%',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.33,
    letterSpacing: 'normal',
    color: colorConstants.neutral500,
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  control: (base, state) => ({
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    outline: '0 !important',
    position: 'relative',
    alignItems: 'center',

    minHeight: 32,
    height: 32,
    backgroundColor:
      state.isFocused || state.hasValue
        ? colorConstants.neutral000
        : colorConstants.neutral020,
    border:
      state.selectProps.isInvalid && !state.isDisabled
        ? `solid 1px ${colorConstants.red500}`
        : state.isFocused
          ? `solid 1px ${colorConstants.blue500}`
          : `solid 1px ${colorConstants.neutral100}`,
    borderRadius: 2,
    cursor: 'pointer',

    '& .singleSelect__dropdown-indicator:after': {
      color: state.isFocused
        ? colorConstants.blue500
        : colorConstants.neutral300,
      transform: state.isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
    },

    '& .singleSelect__single-value': {
      backgroundColor:
        state.hasValue && state.isFocused
          ? colorConstants.blue050
          : 'transparent',
    },

    ':hover': {
      border: `solid 1px ${colorConstants.blue500}`,

      '& .singleSelect__dropdown-indicator:after': {
        color: colorConstants.blue500,
      },
    },
  }),

  valueContainer: (base) => ({
    ...base,
    height: 32,
    '& :last-child': {
      zIndex: 2,
    },
  }),

  placeholder: (base) => ({
    ...base,
    color: colorConstants.neutral200,
  }),

  clearIndicator: () => ({
    '& svg': {
      display: 'none',
    },
    ':after': {
      fontFamily: 'PyreneIconFont !important',
      fontSize: 16,
      color: colorConstants.neutral300,
      speak: 'none',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      textTransform: 'none',
      lineHeight: 1,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',

      paddingRight: 4,

      display: 'inline-block',
      verticalAlign: 'middle',
      content: '"7"',
    },
    ':hover:after': {
      color: colorConstants.red500,
    },
  }),

  dropdownIndicator: () => ({
    '& svg': {
      display: 'none',
    },
    ':after': {
      fontFamily: 'PyreneIconFont !important',
      fontSize: 16,
      color: colorConstants.neutral300,
      speak: 'none',
      textTransform: 'none',
      lineHeight: 1,
      transition: 'transform 0.3s ease-out',
      display: 'inline-block',
      verticalAlign: 'middle',
      content: '"3"',
      marginRight: 8,
    },
  }),

  input: (base) => ({
    ...base,
    '[type="text"]': {
      fontFamily: 'FiraGO, Helvetica, sans-serif !important',
      fontSize: 12,
      fontWeight: 'normal',
      color: colorConstants.neutral400,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
  }),

  menu: (base) => ({
    ...base,
    boxShadow:
      '0 4px 8px -2px rgba(0, 21, 44, 0.2), 0 0 1px 0 rgba(0, 21, 44, 0.3)',
    borderRadius: 2,
    marginTop: 4,
    maxHeight: 308,
  }),

  option: (base, { isSelected, isFocused }) => ({
    ...base,
    ':active': {
      backgroundColor: colorConstants.neutral030,
    },
    backgroundColor: isSelected
      ? colorConstants.neutral030
      : isFocused
        ? colorConstants.backgroundTint
        : colorConstants.neutral000,
    height: 30,
    color: colorConstants.neutral500,
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),

  group: () => ({
    paddingTop: 0,
    paddingBottom: 0,
  }),

  groupHeading: () => ({
    fontFamily: 'FiraGO, Helvetica, sans-serif !important',
    fontWeight: 500,
    color: colorConstants.neutral500,
    padding: '8px 12px',
    borderBottom: '1px solid #e0e2e5',
  }),
};

export default selectStyle;

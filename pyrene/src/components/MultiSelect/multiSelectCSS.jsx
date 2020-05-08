/* eslint-disable no-nested-ternary */

/* Print style to console:
   object: (base, state) => {
    console.log('object');
    console.log(base);
    return {...base};
   }
*/

import colorConstants from '../../styles/colorConstants';

const multiSelectStyle = (props) => ({
  container: (base) => ({
    ...base,
    fontFamily: 'FiraGO, Helvetica, sans-serif !important',
    fontSize: 12,
    width: '100%',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  indicatorsContainer: (base) => ({
    ...base,
    alignItems: 'flex-start',
    paddingTop: 7,
  }),

  control: (base, state) => ({
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    outline: '0 !important',
    position: 'relative',
    alignItems: props.rows <= 0 ? 'center' : 'flex-start',
    overflow: 'hidden',

    backgroundColor: (state.isFocused || state.hasValue) ? colorConstants.backgroundLight : colorConstants.backgroundTint,
    border: state.selectProps.isInvalid && !state.isDisabled ? `solid 1px ${colorConstants.red500}` : state.isFocused ? `solid 1px ${colorConstants.blue500}` : state.hasValue ? `solid 1px ${colorConstants.neutral500}` : `solid 1px ${colorConstants.neutral100}`,
    borderRadius: 2,
    cursor: 'pointer',

    '& .multiSelect__dropdown-indicator:after': {
      color: state.isFocused ? colorConstants.blue500 : colorConstants.neutral300,
      transform: state.isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
    },

    '& .multiSelect__single-value': {
      backgroundColor: state.hasValue && state.isFocused ? colorConstants.blue050 : 'transparent',
    },

    ':hover': {
      border: `solid 1px ${colorConstants.blue500}`,

      '& .multiSelect__dropdown-indicator:after': {
        color: colorConstants.blue500,
      },
    },
  }),

  // whole "text area" input, without border (that's why 7 and not 8px...)
  valueContainer: (base, state) => {
    if (props.selectedOptionsInDropdown) {
      return {
        ...base,
        overflow: 'hidden',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
        padding: '4px 4px 4px 7px',
        minHeight: '30px',
        height: '30px',
      };
    }

    return {
      ...base,
      minHeight: 30,
      height: props.rows <= 0 ? 'inherit' : (props.rows * 22) + 8,
      overflow: state.hasValue ? 'auto' : 'hidden',
      padding: '4px 4px 4px 7px',
      maxHeight: props.rows <= 0 ? 79 : (props.rows * 22) + 8,
      alignItems: 'flex-start',
      alignContent: 'flex-start',
    };
  },

  placeholder: (base) => ({
    ...base,
    color: colorConstants.neutral200,
    height: '100%',
    paddingTop: 8,
    margin: '0px',
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

      display: 'inline-block',
      verticalAlign: 'middle',
      content: '"7"',
    },
    ':hover:after': {
      color: colorConstants.red500,
    },
  }),

  dropdownIndicator: (base, state) => ({
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

      transition: 'transform 0.3s ease-out',
      display: 'inline-block',
      verticalAlign: 'middle',
      content: state.selectProps.menuIsOpen ? '"\x64"' : '"\x63"',
      marginRight: 7,
    },
  }),

  input: (base) => ({
    ...base,
    // same margin as for the grey box from top & bottom; if selectedOptionsInDropdown additional 2px padding needed between text and |
    margin: props.selectedOptionsInDropdown && props.value?.length > 0 ? '2px 0 2px 2px' : '2px 0 2px 0px',
    padding: 0,
    lineHeight: '18px',
    '[type="text"]': {
      fontFamily: 'FiraGO, Helvetica, sans-serif !important',
      fontSize: 12,
      color: colorConstants.neutral500,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
  }),

  menu: (base) => ({
    ...base,
    boxShadow: '0 4px 8px -2px rgba(0, 21, 44, 0.2), 0 0 1px 0 rgba(0, 21, 44, 0.3)',
    borderRadius: 2,
    marginTop: 4,
  }),

  option: (base, { isSelected, isFocused }) => ({
    ...base,
    ':active': {
      backgroundColor: colorConstants.neutral030,
    },
    backgroundColor: isSelected ? colorConstants.neutral030 : isFocused ? colorConstants.backgroundTint : colorConstants.neutral000,
    height: 32,
    color: colorConstants.neutral400,
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),

  // the grey boxes
  multiValue: (base, { data }) => ({
    ...base,
    alignItems: 'center',
    backgroundColor: data.invalid ? colorConstants.red100 : colorConstants.neutral030,
    paddingLeft: 3,
    margin: '2px 4px 2px 0px',
    height: '18px',
  }),

  // text in the grey boxes - options label
  multiValueLabel: (base, { data }) => ({ // eslint-disable-line no-unused-vars
    ...base,
    boxSizing: 'border-box',
    paddingLeft: 8,
    fontSize: 12,
    color: colorConstants.neutral400,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '123px',
  }),

  // "x" next to the label
  multiValueRemove: (base, { data }) => ({
    display: 'flex',
    paddingLeft: 4,
    paddingRight: 4,
    '& svg': {
      display: 'none',
    },
    ':after': {
      fontFamily: 'PyreneIconFont !important',
      fontSize: 14,
      color: colorConstants.neutral300,
      speak: 'none',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      textTransform: 'none',
      lineHeight: 1,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      content: '"7"',
      borderRadius: 2,
    },
    ':hover:after': {
      color: colorConstants.red500,
      backgroundColor: data.invalid ? colorConstants.neutral030 : colorConstants.neutral050,
    },
  }),

  noOptionsMessage: (base) => ({
    ...base,
    fontStyle: 'italic',
    color: colorConstants.neutral200,
    textAlign: 'left',
  }),

});

export default multiSelectStyle;

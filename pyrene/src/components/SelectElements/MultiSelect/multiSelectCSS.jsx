/* eslint-disable no-nested-ternary */

/* Print style to console:
   object: (base, state) => {
    console.log('object');
    console.log(base);
    return {...base};
   }
*/

import colorConstants from '../../../styles/colorConstants';

const multiSelectStyle = props => ({
  container: base => ({
    ...base,
    fontFamily: 'AvenirNext, Helvetica, sans-serif !important',
    fontSize: 13,
    fontWeight: 500,
    width: '100%',
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
    alignItems: props.rows <= 0 ? 'center' : 'flex-start',
    overflow: 'hidden',

    backgroundColor: (state.isFocused || state.hasValue) ? colorConstants.neutral000 : colorConstants.neutral020,
    border: state.selectProps.isInvalid && !state.isDisabled ? `solid 1px ${colorConstants.red500}` : state.isFocused ? `solid 1px ${colorConstants.blue500}` : `solid 1px ${colorConstants.neutral100}`,
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

  valueContainer: (base, state) => {
    if (props.selectedOptionsInDropdown) {
      return {
        ...base,
        overflow: 'hidden',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
        padding: '2px 6px',
        minHeight: '30px',
      };
    }

    return {
      ...base,
      minHeight: 30,
      height: props.rows <= 0 ? 'inherit' : (props.rows * 25) + 6,
      overflow: state.hasValue ? 'auto' : 'hidden',
      padding: '2px 6px',
      maxHeight: props.rows <= 0 ? 79 : (props.rows * 25) + 4,
    };
  },

  placeholder: base => ({
    ...base,
    color: colorConstants.neutral200,
  }),

  clearIndicator: () => ({
    '& svg': {
      display: 'none',
    },
    ':after': {
      fontFamily: 'IconFont !important',
      fontSize: 18,
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

  dropdownIndicator: () => ({
    '& svg': {
      display: 'none',
    },
    ':after': {
      fontFamily: 'IconFont !important',
      fontSize: 18,
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
      content: '"3"',
      marginRight: 8,
    },
  }),

  input: base => ({
    ...base,
    '[type="text"]': {
      fontFamily: 'AvenirNext, Helvetica, sans-serif !important',
      fontSize: 13,
      fontWeight: 500,
      color: colorConstants.neutral400,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
  }),

  menu: base => ({
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
    ':hover': {
      backgroundColor: colorConstants.neutral030,
    },
    backgroundColor: (isSelected || isFocused) ? colorConstants.neutral030 : colorConstants.neutral000,
    height: 32,
    color: colorConstants.neutral400,
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),

  multiValue: (base, { data }) => ({
    ...base,
    alignItems: 'center',
    backgroundColor: data.invalid ? colorConstants.red100 : colorConstants.neutral030,
  }),

  multiValueLabel: (base, { data }) => ({
    ...base,
    boxSizing: 'border-box',
    paddingLeft: 8,
    fontSize: 13,
    color: colorConstants.neutral400,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),

  multiValueRemove: (base, { data }) => ({
    display: 'block',
    height: 14,
    paddingLeft: 4,
    paddingRight: 4,
    '& svg': {
      display: 'none',
    },
    ':after': {
      fontFamily: 'IconFont !important',
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

  noOptionsMessage: (base, state) => ({
    ...base,
    fontStyle: 'italic',
    color: colorConstants.neutral200,
    textAlign: 'left',
  }),

});

export default multiSelectStyle;

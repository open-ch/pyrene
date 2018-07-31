/* eslint-disable no-nested-ternary */

/* Print style to console:
   object: (base, state) => {
    console.log('object');
    console.log(base);
    return {...base};
   }
 */


const multiSelectStyle = rows => ({
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
    alignItems: rows < 0 ? 'center' : 'flex-start',
    overflow: 'hidden',

    minHeight: 32,
    height: rows < 0 ? 'none' : (rows * 24) + 6,
    maxHeight: rows < 0 ? 78 : 'none',
    backgroundColor: (state.isFocused || state.hasValue) ? 'var(--neutral-0)' : 'var(--neutral-020)',
    border: state.selectProps.isInvalid && !state.isDisabled ? 'solid 1px var(--red-500)' : state.isFocused ? 'solid 1px var(--blue-500)' : 'solid 1px var(--neutral-100)',
    borderRadius: 2,
    cursor: 'pointer',

    '& .multiSelect__dropdown-indicator:after': {
      color: state.isFocused ? 'var(--blue-500)' : 'var(--neutral-300)',
      transform: state.isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
    },

    '& .multiSelect__single-value': {
      backgroundColor: state.hasValue && state.isFocused ? 'var(--blue-50)' : 'transparent',
    },

    ':hover': {
      border: 'solid 1px var(--blue-500)',

      '& .multiSelect__dropdown-indicator:after': {
        color: 'var(--blue-500)',
      },
    },
  }),

  valueContainer: base => ({
    ...base,
    overflow: 'auto',
    paddingLeft: 6,
    paddingRight: 6,
    maxHeight: rows < 0 ? 76 : (rows * 24) + 4,
  }),

  placeholder: base => ({
    ...base,
    color: 'var(--neutral-200)',
  }),

  clearIndicator: () => ({
    '& svg': {
      display: 'none',
    },
    ':after': {
      fontFamily: 'IconFont !important',
      fontSize: 18,
      color: 'var(--neutral-300)',
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
      color: 'var(--red-500)',
    },
  }),

  dropdownIndicator: () => ({
    '& svg': {
      display: 'none',
    },
    ':after': {
      fontFamily: 'IconFont !important',
      fontSize: 18,
      color: 'var(--neutral-300)',
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
      color: 'var(--neutral-400)',
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
      backgroundColor: 'var(--neutral-030)',
    },
    ':hover': {
      backgroundColor: 'var(--neutral-030)',
    },
    backgroundColor: (isSelected || isFocused) ? 'var(--neutral-030)' : 'var(--neutral-0)',
    height: 32,
    color: 'var(--neutral-400)',
    cursor: 'pointer',
  }),

  multiValue: (base, { data }) => ({
    ...base,
    height: 20,
    alignItems: 'center',
    backgroundColor: data.invalid ? 'var(--red-100)' : 'var(--neutral-030)',
    flexShrink: 0,
  }),

  multiValueLabel: (base, { data }) => ({
    boxSizing: 'border-box',
    paddingLeft: 8,
    fontSize: 13,
    color: 'var(--neutral-400)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),

  multiValueRemove: (base, { data }) => ({
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
    '& svg': {
      display: 'none',
    },
    ':after': {
      fontFamily: 'IconFont !important',
      fontSize: 14,
      color: 'var(--neutral-300)',
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
      color: 'var(--red-500)',
      backgroundColor: data.invalid ? 'var(--neutral-0)' : 'var(--neutral-050)',
    },
  }),

  noOptionsMessage: (base, state) => ({
    ...base,
    fontStyle: 'italic',
    color: 'var(--neutral-200)',
    textAlign: 'left',
  }),

});

export default multiSelectStyle;

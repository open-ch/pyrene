import React, { FunctionComponent, useState, useEffect, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import {
  InputActionMeta,
  SelectComponentsConfig,
  components,
  ControlProps,
  Props,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import styles from '../SingleSelect/select.module.css';
import MultiSelectStyle from './multiSelectCSS';
import Loader from '../Loader/Loader';
import CustomOption from '../SingleSelect/CustomOption';

import {
  DEFAULT_DELIMITERS,
  delimiterCheck,
  getRegExp,
  createNewValue,
  findValueIndex,
  checkLastTag,
  getLastTagValue,
  getStartedValue,
} from './utils';
import { OptionType, Tag, TagValue } from './types';
import Icon from '../Icon/Icon';
import styles2 from './SearchWithTags.module.css';
import ResultCount from './ResultCount';
import DropdownMenu from './DropdownMenu';

export interface MultiSelectProps {
  /**
   * Whether the selection is clearable.
   */
  clearable?: boolean;
  /**
   * Whether the user can create new options.
   */
  creatable?: boolean;
  /**
   * Sets delimiters for entered values
   */
  customDelimiters?: string[];
  /**
   * Sets tags array
   */
  tags?: Tag[];
  /**
   * Sets a preselected options. Type: [ string | number ]
   */
  defaultValue?: TagValue[];
  /**
   * Sets a label below the input field to display additional information for the user.
   */
  helperLabel?: string;
  /**
   * Sets the visual appearance, to signal that the input is invalid.
   */
  invalid?: boolean;
  /**
   * Sets the label displayed instead of the helperLabel when the input is invalid.
   */
  invalidLabel?: string;
  /**
   * Displays a loading indicator inside of the input.
   */
  loading?: boolean;
  /**
   * Javascript event handler.
   */
  onBlur?: () => void;
  /**
   * Custom event handler, returns selected options from the options array.
   */
  onChange?: (options: TagValue[]) => void;
  /**
   * Focus event handler, use this to dynamically fetch options.
   */
  onFocus?: () => void;
  /**
   * Sets the placeholder label.
   */
  placeholder?: string;
  /**
   * Whether the options are automatically sorted by the label or not.
   */
  sorted?: boolean;
  /**
   * Sets the tags value of the input field.
   */
  tagsValue?: TagValue[];
  /**
   * Total number of results.
   */
  resultCount?: number;
  /**
   * Currently selected result, must be smaller than resultCount.
   */
  selectedResult?: number;
  /**
   * SelectResult handler return selectedItem number.
   */
  onSelectedResultChange?: (selectedItem?: number) => void;
  /**
   * Whether to show result count component.
   */
  showResultCount?: boolean;
  /**
   * Set search string
   */
  setSearchValue: (search: string) => void;
  /**
   * String without a tag
   */
  searchValue?: string;
}

const LoadingIndicator = () => <Loader />;

/**
 * Multi-Selects are used when the user has to make a choice from a list. It allows the user to select multiple items from a dropdown list.
 */
const SearchWithTags: FunctionComponent<MultiSelectProps> = (props: MultiSelectProps) => {
  const {
    clearable = true,
    creatable = false,
    customDelimiters,
    defaultValue = [],
    helperLabel = '',
    invalid = false,
    invalidLabel = '',
    loading = false,
    onBlur,
    onChange,
    onFocus,
    placeholder = '',
    sorted = true,
    tagsValue = [],
    tags,
    resultCount,
    onSelectedResultChange,
    selectedResult,
    showResultCount,
    setSearchValue,
    searchValue = '',
  } = props;

  const [tag, setTag] = useState<string>();
  const [options, setOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    setOptions(tags?.filter((tagName) => tagName?.value === tag)?.[0]?.options ?? []);
  }, [tag]);

  const selectNextResult = useCallback(() => {
    if (selectedResult && resultCount && selectedResult >= resultCount) {
      onSelectedResultChange?.(1);
      return;
    }
    onSelectedResultChange?.(selectedResult ?? 0 + 1);
  }, [selectedResult, resultCount, onSelectedResultChange]);
  const selectPreviousResult = useCallback(() => {
    if (selectedResult && selectedResult <= 1) {
      onSelectedResultChange?.(resultCount);
      return;
    }
    onSelectedResultChange?.(selectedResult ?? 0 - 1);
  }, [selectedResult, resultCount, onSelectedResultChange]);

  const opts = useMemo(
    () => (sorted ? [...options].sort((a, b) => a.label.localeCompare(b.label)) : options),
    [options, sorted]
  );

  const [delimiters, setDelimiters] = useState<string[]>(DEFAULT_DELIMITERS);
  const [regexObj, setRegexObj] = useState(getRegExp(delimiters));

  useEffect(() => {
    if (customDelimiters) {
      setDelimiters([...DEFAULT_DELIMITERS, ...customDelimiters]);
    }
  }, [customDelimiters]);

  // set initial input value
  useEffect(() => {
    const searchInputIndex = findValueIndex(tagsValue);
    if (searchInputIndex > -1 && tagsValue[searchInputIndex].label.trim() !== searchValue.trim()) {
      setSearchValue(tagsValue[searchInputIndex].label);
    }
  }, []);

  const Control = useCallback(
    ({ children, ...props }: ControlProps<TagValue, true>) => {
      const clearValue = () => {
        if (props.selectProps.inputValue) {
          setSearchValue('');
        }
        props.clearValue();
      };

      return (
        <components.Control {...props}>
          <div className={styles2.search}>
            <Icon type="standalone" name="search" />
          </div>
          {children}
          {showResultCount ? (
            <ResultCount
              resultCount={resultCount}
              selectNextResult={selectNextResult}
              selectPreviousResult={selectPreviousResult}
              selectedResult={selectedResult}
              hasValue={props.hasValue}
              clearValue={clearValue}
              input={props.selectProps.inputValue}
            />
          ) : null}
        </components.Control>
      );
    },
    [
      resultCount,
      selectedResult,
      onSelectedResultChange,
      selectNextResult,
      selectPreviousResult,
      showResultCount,
    ]
  );

  useEffect(() => {
    setRegexObj(getRegExp(delimiters));
  }, [delimiters]);

  const editExistingValue = useCallback(
    (editedValue: string) => {
      const newInputValue = searchValue + ' ' + editedValue;
      setSearchValue(newInputValue ?? '');
      onChange?.(tagsValue.filter((option) => option.label !== editedValue));
    },
    [searchValue, onChange, tagsValue]
  );

  const MultiValueLabel: SelectComponentsConfig<TagValue, true>['MultiValueLabel'] = ({
    innerProps,
    children,
  }) => (
    <div
      onDoubleClick={() => (creatable ? editExistingValue(children) : undefined)}
      title={typeof children === 'string' ? children : undefined}
      {...innerProps}
    >
      {children}
    </div>
  );

  const handleTagSelect = useCallback(
    (tag: string) => {
      // check if the last word is a started tag
      const trimmedInput = searchValue.trim();
      const beforeTag = getStartedValue(searchValue, tag);
      const newInput =
        beforeTag !== undefined ? `${beforeTag}${tag}: ` : `${trimmedInput} ${tag}: `;
      setSearchValue(newInput);
      setTag?.(tag);
    },
    [searchValue]
  );

  const componentsNormal = {
    LoadingIndicator,
    Option: CustomOption,
    MultiValueLabel,
    Control: Control,
    DropdownIndicator: null,
    ClearIndicator: showResultCount ? null : undefined,
    Menu: (props: any) =>
      DropdownMenu({
        ...props,
        children: props.children,
        tags,
        handleOnTagClick: handleTagSelect,
        showOptions: !!tag,
      }),
  };

  const onChangeHandle = useCallback(
    (updatedOptions?: TagValue[], isRemove?: boolean, select?: TagValue) => {
      if (isRemove && updatedOptions !== undefined) {
        onChange?.([]);
      } else if (select) {
        // check if last string is started selected value
        const beforeSelect = getStartedValue(searchValue, select.label);
        const newSelect = beforeSelect
          ? `${beforeSelect} ${select.label}`
          : `${searchValue} ${select.label}`;
        onChange?.(createNewValue(newSelect, tagsValue, setSearchValue, tags));
      } else if (searchValue) {
        onChange?.(createNewValue(searchValue, tagsValue, setSearchValue, tags));
      }
      setTag?.(undefined);
    },
    [searchValue, options, onChange, tagsValue, tags]
  );

  const onBlurHandle = useCallback(() => {
    onBlur?.();
    onChangeHandle();
  }, [onBlur, onChangeHandle]);

  const formatNoOptionsMessage = useCallback(
    (newValue: string) => {
      if (tag) {
        let optionResults = getLastTagValue(newValue, tag);
        return `Add tag "${tag}: ${optionResults ?? ''}"`;
      }
      return `Search for "${newValue}"`;
    },
    [tag]
  );
  return (
    <div className={styles.selectContainer}>
      <CreatableSelect<TagValue, true>
        className="multiSelect"
        styles={MultiSelectStyle(props as Props<TagValue, true>) as any}
        components={componentsNormal as SelectComponentsConfig<TagValue, true>}
        // Sets the internal value to "" in case of null or undefined
        getOptionValue={(option) =>
          option.value !== null && typeof option.value !== 'undefined' ? option.value : ''
        }
        blurInputOnSelect={false}
        placeholder={placeholder}
        options={opts}
        value={tagsValue}
        defaultValue={defaultValue}
        isClearable={clearable}
        isInvalid={invalid}
        isLoading={loading}
        inputValue={searchValue}
        onChange={(options: any, v: any) => {
          onChangeHandle(
            options,
            v.action === 'remove-value' || v.action === 'clear',
            v.action === 'select-option' && v.option
          );
        }}
        onInputChange={(input: string, action: InputActionMeta) => {
          if (action.action !== 'input-blur' && action.action !== 'menu-close') {
            setSearchValue(input);
            if (tags) {
              setTag?.(checkLastTag(input, tags));
            }
          }
        }}
        onBlur={onBlurHandle}
        onFocus={onFocus}
        onKeyDown={(key: React.KeyboardEvent<HTMLElement>) => delimiterCheck(key, regexObj)}
        maxMenuHeight={264}
        closeMenuOnSelect={false}
        formatCreateLabel={(newValue) => formatNoOptionsMessage(newValue)}
        noOptionsMessage={(input) => formatNoOptionsMessage(input.inputValue)}
        isMulti
        isSearchable
        escapeClearsValue
        captureMenuScroll
        filterOption={(candidate, input) => {
          const currentValue = getLastTagValue(input, tag);
          return currentValue ? candidate.label.includes(currentValue) : true;
        }}
      />

      {invalid && invalidLabel ? (
        <div className={styles.invalidLabel}>
          <span className={clsx('pyreneIcon-errorOutline', styles.errorIcon)} />
          {invalidLabel}
        </div>
      ) : (
        <>{helperLabel && <div className={styles.selectHelper}>{helperLabel}</div>}</>
      )}
    </div>
  );
};

export default SearchWithTags;

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
  useRef,
} from 'react';
import clsx from 'clsx';
import {
  InputActionMeta,
  SelectComponentsConfig,
  components,
  ControlProps,
  IndicatorContainerProps,
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
   * Whether to show "search for" message while searching.
   */
  showSearching?: boolean;
  /**
   * Set search string
   */
  setSearchValue: (search: string) => void;
  /**
   * String without a tag
   */
  searchValue?: string;
}

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
    showSearching = false,
  } = props;

  const [tag, setTag] = useState<string>();
  const [options, setOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    setOptions(
      tags?.filter((tagName) => tagName?.value?.toLowerCase() === tag?.toLowerCase())?.[0]
        ?.options ?? []
    );
  }, [tag, tags]);

  const selectNextResult = useCallback(() => {
    if (selectedResult && resultCount && selectedResult >= resultCount) {
      onSelectedResultChange?.(1);
      return;
    }
    onSelectedResultChange?.((selectedResult ?? 0) + 1);
  }, [selectedResult, resultCount, onSelectedResultChange]);

  const selectPreviousResult = useCallback(() => {
    if ((selectedResult ?? 0) <= 1) {
      onSelectedResultChange?.(resultCount);
      return;
    }
    onSelectedResultChange?.((selectedResult ?? 0) - 1);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectRef = useRef<any>(null);
  const openMenu = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    selectRef.current?.setState({ ...selectRef.current.state, menuIsOpen: true });
  };
  const closeMenu = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    selectRef.current?.setState({ ...selectRef.current.state, menuIsOpen: false });
  };
  const Control = useCallback(
    ({ children, ...rest }: ControlProps<TagValue, true>) => (
      <div onClick={openMenu}>
        <components.Control {...rest}>
          <div className={styles2.search}>
            <Icon type="standalone" name="search" />
          </div>
          {children}
        </components.Control>
      </div>
    ),

    []
  );
  const IndicatorsContainer = useCallback(
    ({ ...rest }: IndicatorContainerProps<TagValue, true>) => {
      const clearValue = () => {
        if (rest.selectProps.inputValue) {
          setSearchValue('');
        }
        rest.clearValue();
      };

      return (
        <components.IndicatorsContainer {...rest}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {rest.selectProps.isLoading ? (
            <div className={styles2.loading}>
              <Loader />
            </div>
          ) : showResultCount ? (
            <ResultCount
              resultCount={resultCount}
              selectNextResult={selectNextResult}
              selectPreviousResult={selectPreviousResult}
              selectedResult={selectedResult}
              hasValue={!!rest.selectProps.inputValue ?? rest.hasValue}
              clearValue={clearValue}
            />
          ) : null}
        </components.IndicatorsContainer>
      );
    },
    [
      resultCount,
      selectedResult,
      selectNextResult,
      selectPreviousResult,
      showResultCount,
      setSearchValue,
    ]
  );

  useEffect(() => {
    setRegexObj(getRegExp(delimiters));
  }, [delimiters]);

  const editExistingValue = useCallback(
    (editedValue: string) => {
      const newInputValue = `${searchValue} ${editedValue}`;
      setSearchValue(newInputValue ?? '');
      onChange?.(tagsValue.filter((option) => option.label !== editedValue));
    },
    [searchValue, onChange, tagsValue, setSearchValue]
  );

  const MultiValueLabel: SelectComponentsConfig<TagValue, true>['MultiValueLabel'] = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      ({ innerProps, children }) =>
        (
          <div
            onDoubleClick={() => editExistingValue(children)}
            title={typeof children === 'string' ? children : undefined}
            {...innerProps}
          >
            {children}
          </div>
        ),
    [editExistingValue]
  );

  const handleTagSelect = useCallback(
    (selectedTag: string) => {
      // check if the last word is a started tag
      const trimmedInput = searchValue.trim();
      const beforeTag = getStartedValue(searchValue, selectedTag);
      const newInput =
        beforeTag !== undefined
          ? `${beforeTag}${selectedTag}: `
          : `${trimmedInput} ${selectedTag}: `;
      setSearchValue(newInput);
      setTag?.(selectedTag);
    },
    [searchValue, setSearchValue]
  );

  const componentsNormal = useMemo(
    () => ({
      Option: CustomOption,
      MultiValueLabel,
      Control: Control,
      IndicatorsContainer,
      DropdownIndicator: null,
      ClearIndicator: showResultCount ? null : undefined,
      ...(!tag && {
        Menu: (menuProps: any) =>
          DropdownMenu({
            ...menuProps,
            children: menuProps.children as ReactNode,
            tags,
            showSearching,
            handleOnTagClick: handleTagSelect,
          }),
      }),
    }),
    [
      tags,
      tag,
      showResultCount,
      handleTagSelect,
      Control,
      IndicatorsContainer,
      MultiValueLabel,
      showSearching,
    ]
  );
  const onChangeHandle = useCallback(
    (updatedOptions?: TagValue[], isRemove?: boolean, select?: TagValue) => {
      if (isRemove) {
        onChange?.(updatedOptions ?? []);
      } else if (select) {
        // check if last string is started selected value
        const beforeSelect = getStartedValue(searchValue, select.label);
        const newSelect = beforeSelect
          ? `${beforeSelect} ${select.label}`
          : `${searchValue} ${select.label}`;
        onChange?.(createNewValue(newSelect, tagsValue, setSearchValue, tags, creatable));
      } else if (searchValue) {
        onChange?.(createNewValue(searchValue, tagsValue, setSearchValue, tags, creatable));
      }
      setTag?.(undefined);
    },
    [searchValue, onChange, tagsValue, tags, setSearchValue, creatable]
  );

  const onBlurHandle = useCallback(() => {
    onBlur?.();
    onChangeHandle();
  }, [onBlur, onChangeHandle]);

  const formatNoOptionsMessage = useCallback(
    (newValue: string) => {
      if (tag) {
        const optionResults = getLastTagValue(newValue, tag);
        return creatable ? `Add tag "${tag}: ${optionResults ?? ''}"` : 'No options found';
      }
      return showSearching ? `Search for "${newValue}"` : undefined;
    },
    [tag, creatable, showSearching]
  );

  return (
    <div className={styles.selectContainer}>
      <CreatableSelect<TagValue, true>
        className="multiSelect"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        // eslint-disable-next-line @typescript-eslint/no-shadow
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
        onKeyDown={(key: React.KeyboardEvent<HTMLElement>) => {
          if (key.key === 'Enter') {
            if (resultCount && showResultCount) {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              key.shiftKey ? selectPreviousResult() : selectNextResult();
            }
            closeMenu();
          } else delimiterCheck(key, regexObj);
        }}
        maxMenuHeight={264}
        onSelectResetsInput={false}
        closeMenuOnSelect={false}
        formatCreateLabel={(newValue) => formatNoOptionsMessage(newValue)}
        // workaround to not display 'create' option in dropdown when not creatable
        isValidNewOption={() => creatable}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        noOptionsMessage={(input) => formatNoOptionsMessage(input.inputValue)}
        filterOption={(candidate, input) => {
          const currentValue = getLastTagValue(input, tag);
          return currentValue
            ? candidate.label.toLowerCase().includes(currentValue.toLowerCase())
            : true;
        }}
        openMenuOnClick={false}
        ref={selectRef}
        isMulti
        isSearchable
        escapeClearsValue
        openMenuOnFocus
        captureMenuScroll
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

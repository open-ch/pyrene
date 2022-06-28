import { TagValue, Tag } from './types';

export const DEFAULT_DELIMITERS = ['\n', '\t'];

/**
 * Get tag style
 * @param {Tag[]} Tags - array of available tags
 * @param {string} tagName - name of a tag
 * @returns {Tag['style']}
 */
export const getStyle = (tags: Tag[], tagName?: string) =>
  tags?.find((defaultTag) => defaultTag.value === tagName)?.style;

/**
 * Get RegExp to detect tag
 * @param {Tag[]} Tags - array of available tags
 * @returns {RegExp}
 */
export const getTagsRegex = (tags?: Tag[]) => {
  const tagsValues = tags?.flatMap((tag) => tag.value);
  return new RegExp(`(${tagsValues?.join('|')})(?=\\s*:)`, 'i');
};

/**
 * Returns a RegExp object used to match a text with a pattern
 * @param {string[]} regexStringArray - Array of regex string delimiters
 * @returns {RegExp}
 */
export const getRegExp = (regexStringArray: string[]) =>
  new RegExp(`\\s*[${regexStringArray.join('|')}]\\s*`);

/**
 * Checks if a KeyboardEvent contains a delimiter and returns an Enter key event if it does.
 * @param {RegExp} delimiterRegexObj - Delimiter regex used for testing
 * @param {React.KeyboardEvent<HTMLElement>} keyEvent - KeyboardEvent to check
 * @returns {React.KeyboardEvent<HTMLElement>}
 */
export const delimiterCheck = (
  keyEvent: React.KeyboardEvent<HTMLElement>,
  delimiterRegexObj: RegExp
) => {
  if (delimiterRegexObj.test(keyEvent.key)) {
    keyEvent.preventDefault();
    keyEvent.currentTarget.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'Enter',
        key: 'Enter',
        charCode: 13,
        keyCode: 13,
        view: window,
        bubbles: true,
      })
    );
  }
  return keyEvent;
};

export const validateTag = (tag: string, value: string, tags: Tag[], currentValue: TagValue[]) =>
  tags.find((availableTag) => availableTag.value === tag)?.validate?.(value, currentValue);

export const hasDuplicates = (input: string, value: TagValue[]) => {
  const existingLabels = value?.map((v) => v.label);
  return existingLabels?.find(
    (v) => v.toLowerCase().replace(/\s/g, '') === input.toLowerCase().replace(/\s/g, '')
  );
};

export const findValueIndex = (values?: TagValue[]) =>
  values?.findIndex((v) => v?.tag === undefined) ?? -1;

/**
 * Create new values from string based on tags
 * @param {string} string - string to get values from
 * @param {string} type - array of string values
 * @param {RegExp} typeRegex - array of string values
 * @param {Tag[]} tags - array of string values
 * @param {TagValue[]} options - array of string values
 * @returns {TagValue[]}
 */
const getNewTags = (
  string: string,
  type: string,
  typeRegex: RegExp,
  tags: Tag[],
  options: TagValue[]
): TagValue[] => {
  const results = [...options];
  // everything after tag
  const valueRegex = new RegExp(`(?<=(${type})\\s*:).*$`, 'i');
  let value = string?.match(valueRegex)?.[0].trim();

  let leftovers = '';

  // check if there is other filter in value
  const type2 = value?.match(typeRegex)?.[0].trim();

  if (type2 && value) {
    // get just the first tag value
    const valueRegex2 = new RegExp(`.+?(?=${type2})`);
    value = value.match(valueRegex2)?.[0].trim();

    // remaining string to check
    const replace = new RegExp(`(?<=${type}\\s*:\\s*${value}).*$`);
    leftovers = string.match(replace)?.[0].trim() ?? '';
  }
  const label = `${type}: ${value}`;
  value &&
    !hasDuplicates(label, results) &&
    results.push({
      value: value,
      label: label,
      tag: type,
      invalid: validateTag(type, value, tags, options),
      style: getStyle(tags, type),
    });
  if (leftovers && type2) {
    return getNewTags(leftovers, type2, typeRegex, tags, results);
  }
  return results;
};

/**
 * Create TagValue[] values from input
 * @param {string} string - input value
 * @param {Tag[]} tags - tags
 * @returns {TagValue[]}
 */
export const detectTag = (
  string: string,
  existingValues: TagValue[],
  setInput: (input: string) => void,
  tags?: Tag[]
): TagValue[] => {
  const typeRegex = getTagsRegex(tags);
  const type = string?.match(typeRegex)?.[0].trim();
  if (!type || !tags) {
    setInput(string);
    return existingValues;
  }
  const beforeTagRegex = new RegExp(`.*?(?=${type}\\s*:)`);
  const beforeValue = string.match(beforeTagRegex)?.[0];
  setInput(beforeValue ?? '');
  let options = existingValues;

  // everything that is before first tag
  const leftovers = beforeValue ? string.replace(beforeValue, '').trim() : string;
  return getNewTags(leftovers, type, typeRegex, tags, options);
};

/**
 * Return the new value object array.
 * @param {string[]} values - array of string values
 * @param {object[]} options - pre-provided options
 * @param {object[]} existingValues - current values in the input
 * @param {Tag[]} tags - tags
 * @returns {object[]} array of value object in same format as the options
 */
export const createNewValue = (
  value: string,
  existingValues: TagValue[],
  setInput: (input: string) => void,
  tags?: Tag[]
) => detectTag(value, existingValues, setInput, tags).flatMap((v) => v);

/**
 * Return the current tag in the input.
 * @param {string} input - current input state
 * @param {Tag[]} tags - tags
 * @returns {string} current last tag in the input
 */
export const checkLastTag = (input: string, tags: Tag[]) => {
  const tagsValues = tags?.flatMap((tag) => tag.value);
  const tagsOptions = tagsValues?.join('|');
  // last tag in string
  const lastTag = new RegExp(`((${tagsOptions})\\s*:\\s*)(?!.*((${tagsOptions})\\s*:\\s*))`, 'i');
  const optionTag = input?.match(lastTag)?.[0].replace(':', '').trim();
  return optionTag;
};

/**
 * Return the current value of last tag to match with available options.
 * @param {string} input - current input state
 * @param {Tag[]} tags - tags
 * @returns {string} current value of tag
 */
export const checkLastTagValue = (input: string, tags: Tag[]) => {
  const lastTag = checkLastTag(input, tags);
  // tag value
  return getLastTagValue(input, lastTag);
};

export const getLastTagValue = (input: string, lastTag?: string) =>
  lastTag
    ? input
        .match(new RegExp(`(?<=(${lastTag}\\s*:\\s*)(?!.*((${lastTag})\\s*:\\s*))).*$`, 'i'))?.[0]
        .trimStart()
    : undefined;
/**
 * Return before string of another string if match otherwise return undefined.
 * @param {string} input - current input state
 * @param {string} matchedString - tags
 * @returns {string} marched part
 */
export const getStartedValue = (input: string, matchedString: string): string | undefined => {
  const lastWord = input.match(/\b(\w+)$/)?.[0];
  const beforeLastWord = new RegExp(`.*?(?=${lastWord})`);
  return lastWord && matchedString.includes(lastWord)
    ? input.match(beforeLastWord)?.[0]
    : undefined;
};

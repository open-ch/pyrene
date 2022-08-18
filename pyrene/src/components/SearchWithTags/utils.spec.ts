import { Tag } from './types';
import {
  createNewValue,
  findValueIndex,
  checkLastTag,
  getLastTagValue,
  getStartedValue,
} from './utils';
const setInput = (input: string) => {};
const tagOptions: Tag[] = [
  { value: 'type', style: { backgroundColor: '#C0EDC0', color: '#4F815E' } },
  { value: 'section', style: { backgroundColor: '#E5EDF5', color: '#454D61' } },
  { value: 'source', style: { backgroundColor: '#A5EAE3', color: '#357E81' } },
  { value: 'destination', style: { backgroundColor: '#91C3EA', color: '#215888' } },
  { value: 'rule', style: { backgroundColor: '#F7EEAF', color: '#86824E' } },
];

const valuesYes = [
  {
    value: 'amande: eth0 (10.236.50.24)',
    label: 'amande: eth0 (10.236.50.24)',
    invalid: false,
  },
  {
    value: 'LABS_ZONE_APPS',
    label: 'source: LABS_ZONE_APPS',
    tag: 'source',
    invalid: false,
    style: { backgroundColor: '#A5EAE3', color: '#357E81' },
  },
  {
    value: 'eth:blabla',
    label: 'type: eth:blabla',
    tag: 'type',
    invalid: false,
    style: { backgroundColor: '#C0EDC0', color: '#4F815E' },
  },
];
const valuesNo = [
  {
    value: 'cool',
    label: 'type: cool',
    tag: 'type',
    invalid: false,
    style: { backgroundColor: '#C0EDC0', color: '#4F815E' },
  },
  {
    value: 'LABS_ZONE_APPS SSL',
    label: 'source: LABS_ZONE_APPS SSL',
    tag: 'source',
    invalid: false,
    style: { backgroundColor: '#A5EAE3', color: '#357E81' },
  },
];

describe('createNewValue()', () => {
  it('values with tags', () => {
    const rawString1 = 'amande: eth0 (10.236.50.24) source : LABS_ZONE_APPS type: eth:blabla';
    const rawString2 = '10.236.50.24 destination: wtf-cvp001 : eth0 (10.236.41.11)';
    const rawString3 = 'MGMT_ACCESS [65684] Destination: ANY type: MGMT_ACCESS [65684]';
    const value1 = createNewValue(rawString1, [], setInput, tagOptions, true);
    const value2 = createNewValue(rawString2, [], setInput, tagOptions, true);
    const value3 = createNewValue(rawString3, [], setInput, tagOptions, true);
    expect(value1).toEqual([
      {
        value: 'LABS_ZONE_APPS',
        label: 'source: LABS_ZONE_APPS',
        tag: 'source',
        invalid: false,
        style: { backgroundColor: '#A5EAE3', color: '#357E81' },
      },
      {
        value: 'eth:blabla',
        label: 'type: eth:blabla',
        tag: 'type',
        invalid: false,
        style: { backgroundColor: '#C0EDC0', color: '#4F815E' },
      },
    ]);
    expect(value2).toStrictEqual([
      {
        value: 'wtf-cvp001 : eth0 (10.236.41.11)',
        label: 'destination: wtf-cvp001 : eth0 (10.236.41.11)',
        tag: 'destination',
        invalid: false,
        style: { backgroundColor: '#91C3EA', color: '#215888' },
      },
    ]);
    expect(value3).toStrictEqual([
      {
        value: 'ANY',
        label: 'destination: ANY',
        tag: 'destination',
        invalid: false,
        style: { backgroundColor: '#91C3EA', color: '#215888' },
      },
      {
        value: 'MGMT_ACCESS [65684]',
        label: 'type: MGMT_ACCESS [65684]',
        tag: 'type',
        invalid: false,
        style: { backgroundColor: '#C0EDC0', color: '#4F815E' },
      },
    ]);
  });

  it('only tags', () => {
    const rawString = 'type: cool source: LABS_ZONE_APPS SSL';
    const value = createNewValue(rawString, [], setInput, tagOptions, true);
    expect(value).toStrictEqual([
      {
        value: 'cool',
        label: 'type: cool',
        tag: 'type',
        invalid: false,
        style: { backgroundColor: '#C0EDC0', color: '#4F815E' },
      },
      {
        value: 'LABS_ZONE_APPS SSL',
        label: 'source: LABS_ZONE_APPS SSL',
        tag: 'source',
        invalid: false,
        style: { backgroundColor: '#A5EAE3', color: '#357E81' },
      },
    ]);
  });
  it('only empty space', () => {
    const rawString = '      ';
    const value = createNewValue(rawString, [], setInput, tagOptions, true);
    expect(value).toStrictEqual([]);
  });

  it('filter empty tag', () => {
    const rawString = 'type: source: LABS_ZONE_APPS SSL   ';
    const value = createNewValue(rawString, [], setInput, tagOptions, true);
    expect(value).toEqual([
      {
        value: 'LABS_ZONE_APPS SSL',
        label: 'source: LABS_ZONE_APPS SSL',
        tag: 'source',
        invalid: false,
        style: { backgroundColor: '#A5EAE3', color: '#357E81' },
      },
    ]);
  });

  it('filter duplicates', () => {
    const rawString =
      'amande: eth0 (10.236.50.24) source : LABS_ZONE_APPS type: eth:blabla type: eth:blabla';
    const value = createNewValue(rawString, [], setInput, tagOptions, true);
    expect(value).toStrictEqual([
      {
        value: 'LABS_ZONE_APPS',
        label: 'source: LABS_ZONE_APPS',
        tag: 'source',
        invalid: false,
        style: { backgroundColor: '#A5EAE3', color: '#357E81' },
      },
      {
        value: 'eth:blabla',
        label: 'type: eth:blabla',
        tag: 'type',
        invalid: false,
        style: { backgroundColor: '#C0EDC0', color: '#4F815E' },
      },
    ]);
  });
});

describe('findValueIndex()', () => {
  it('no value', () => {
    const indexValue = findValueIndex(valuesNo);
    expect(indexValue).toStrictEqual(-1);
  });

  it('only value', () => {
    const indexValue = findValueIndex(valuesYes);
    expect(indexValue).toStrictEqual(0);
  });

  it('empty', () => {
    const indexValue = findValueIndex([]);
    expect(indexValue).toStrictEqual(-1);
  });
});
describe('checkLastTag()', () => {
  it('tags with value', () => {
    const rawString = 'wtf-cvp003 : eth0 (10.236.41.13) type: cool source: 10.236.41.11 type: coo';
    const lastTag = checkLastTag(rawString, tagOptions);
    expect(lastTag).toStrictEqual('type');
  });

  it('tag with no value', () => {
    const rawString = 'wtf-cvp001 : eth0 (10.236.41.11) type:';
    const lastTag = checkLastTag(rawString, tagOptions);
    expect(lastTag).toStrictEqual('type');
  });

  it('duplicate tags names', () => {
    const rawString =
      'wtf-cvp003 : eth0 (10.236.41.13) type: cool source: 10.236.41.11 source: 10.236.41.12';
    const lastTag = checkLastTag(rawString, tagOptions);
    expect(lastTag).toStrictEqual('source');
  });

  it('no tag', () => {
    const rawString = '    Ice-cream\nChocolate\t     ';
    const lastTag = checkLastTag(rawString, tagOptions);
    expect(lastTag).toStrictEqual(undefined);
  });

  it('empty input', () => {
    const rawString = ' ';
    const lastTag = checkLastTag(rawString, tagOptions);
    expect(lastTag).toStrictEqual(undefined);
  });
});
describe('getLastTagValue()', () => {
  it('no tag', () => {
    const rawString = 'wtf-cvp003 : eth0 (10.236.41.13)';
    const lastTag = checkLastTag(rawString, tagOptions);
    const tagValue = getLastTagValue(rawString, lastTag);
    expect(tagValue).toStrictEqual(undefined);
  });

  it('multiple tags', () => {
    const rawString =
      'wtf-cvp003 : eth0 (10.236.41.13) type: cool source: 10.236.41.11 source: 10.236.41.12';
    const lastTag = checkLastTag(rawString, tagOptions);
    const tagValue = getLastTagValue(rawString, lastTag);
    expect(tagValue).toStrictEqual('10.236.41.12');
  });
  it('multiple tags with whitespace', () => {
    const rawString = 'wtf-cvp003 : eth0 (10.236.41.13) type: cool source: 10.236.41.12  ';
    const lastTag = checkLastTag(rawString, tagOptions);
    const tagValue = getLastTagValue(rawString, lastTag);
    expect(tagValue).toStrictEqual('10.236.41.12  ');
  });

  it('multiple the same tags', () => {
    const rawString = 'wtf-cvp003 : eth0 (10.236.41.13) type: cool type: unknown';
    const lastTag = checkLastTag(rawString, tagOptions);
    const tagValue = getLastTagValue(rawString, lastTag);
    expect(tagValue).toStrictEqual('unknown');
  });
});
describe('getStartedValue()', () => {
  it('no input', () => {
    const rawString = '';
    const startedValue = getStartedValue(rawString, tagOptions[0].value);
    expect(startedValue).toStrictEqual(undefined);
  });

  it('started', () => {
    const rawString = 'wtf-cvp003 : eth0 (10.236.41.13) typ';
    const startedValue = getStartedValue(rawString, tagOptions[0].value);
    expect(startedValue).toStrictEqual('wtf-cvp003 : eth0 (10.236.41.13) ');
  });
  it('not started', () => {
    const rawString = 'wtf-cvp003 : eth0 (10.236.41.13) type: cool source: 10.236.41.12  ';
    const startedValue = getStartedValue(rawString, tagOptions[0].value);
    expect(startedValue).toStrictEqual(undefined);
  });
});

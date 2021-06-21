import * as Utils from './DateUtils';

describe('Test utils functions', () => {
  it('Convert to datejs', () => {
    expect(Utils.convertToJsDate({ year: 2020, month: 11, day: 15 })).toBeInstanceOf(Date);
  });

  it('Convert to internal Date type', () => {
    const dateobj = Utils.convertToDateTypeObject(new Date());
    expect(dateobj.day).toEqual(expect.any(Number));
    expect(dateobj.month).toEqual(expect.any(Number));
    expect(dateobj.year).toEqual(expect.any(Number));
  });

  it('Convert to internal Time type', () => {
    const timeobj = Utils.convertToTimeTypeObject(new Date());
    expect(timeobj.hours).toEqual(expect.any(Number));
    expect(timeobj.minutes).toEqual(expect.any(Number));
  });

  it('Is date valid', () => {
    expect(Utils.isValidDate({ year: 2020, month: 53, day: 72 })).toBe(false);
  });

  it('Is time valid', () => {
    expect(Utils.isValidTime({ hours: 23, minutes: 22 })).toBe(true);
  });

  it('Get timestamp from date/time type', () => {
    const date = { year: 2000, month: 3, day: 12 };
    const time = { hours: 12, minutes: 34 };
    expect(Utils.convertToTimeStamp(date, time)).toEqual(expect.any(Number));
  });
});

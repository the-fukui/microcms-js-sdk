import { isObject, isString } from '../../src/utils/isCheckValue';

const objectMock = {
  text: 'text',
};

describe('utils.ts isObject test', () => {
  test('isObject is return true', () => {
    expect(isObject(objectMock)).toBe(true);
  });

  test('isObject is return true', () => {
    expect(isObject({})).toBe(true);
  });

  test('isObject is return false', () => {
    expect(isObject(3)).toBe(false);
  });

  test('isString is return true', () => {
    expect(isString('test')).toBe(true);
  });

  test('isString is return true', () => {
    expect(isString(3)).toBe(false);
  });
});

describe('utils.ts isString test', () => {
  test('isString is return true', () => {
    expect(isString('test')).toBe(true);
  });

  test('isString is return false', () => {
    expect(isString(3)).toBe(false);
  });
});

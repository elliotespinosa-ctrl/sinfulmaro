/**
 * Tests for object utilities
 */

const {
  deepClone,
  getProperty,
  setProperty,
  deepMerge,
  pick,
} = require('../src/utils/objectUtils');

describe('Object Utilities', () => {
  describe('deepClone', () => {
    test('clones simple objects', () => {
      const obj = { a: 1, b: 2 };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
    });

    test('clones nested objects', () => {
      const obj = { a: { b: { c: 1 } } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      cloned.a.b.c = 2;
      expect(obj.a.b.c).toBe(1);
    });

    test('clones arrays', () => {
      const arr = [1, [2, [3]]];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
    });

    test('clones dates', () => {
      const date = new Date('2024-01-01');
      const cloned = deepClone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    test('handles primitives', () => {
      expect(deepClone(null)).toBe(null);
      expect(deepClone(42)).toBe(42);
      expect(deepClone('string')).toBe('string');
    });
  });

  describe('getProperty', () => {
    const obj = {
      user: {
        name: 'John',
        address: {
          city: 'New York',
        },
      },
    };

    test('gets nested property', () => {
      expect(getProperty(obj, 'user.name')).toBe('John');
      expect(getProperty(obj, 'user.address.city')).toBe('New York');
    });

    test('returns default for non-existent property', () => {
      expect(getProperty(obj, 'user.age', 25)).toBe(25);
      expect(getProperty(obj, 'missing.path', 'default')).toBe('default');
    });

    test('handles null/undefined objects', () => {
      expect(getProperty(null, 'path', 'default')).toBe('default');
      expect(getProperty(undefined, 'path', 'default')).toBe('default');
    });
  });

  describe('setProperty', () => {
    test('sets nested property', () => {
      const obj = {};
      setProperty(obj, 'user.name', 'John');
      expect(obj.user.name).toBe('John');
    });

    test('creates nested objects', () => {
      const obj = {};
      setProperty(obj, 'a.b.c.d', 'value');
      expect(obj.a.b.c.d).toBe('value');
    });

    test('overwrites existing values', () => {
      const obj = { user: { name: 'John' } };
      setProperty(obj, 'user.name', 'Jane');
      expect(obj.user.name).toBe('Jane');
    });
  });

  describe('deepMerge', () => {
    test('merges objects deeply', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { b: { d: 3 }, e: 4 };
      const result = deepMerge(obj1, obj2);
      expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });

    test('merges arrays', () => {
      const obj1 = { arr: [1, 2] };
      const obj2 = { arr: [3, 4] };
      const result = deepMerge(obj1, obj2);
      expect(result.arr).toEqual([1, 2, 3, 4]);
    });

    test('handles multiple objects', () => {
      const result = deepMerge({ a: 1 }, { b: 2 }, { c: 3 });
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });
  });

  describe('pick', () => {
    test('picks specified properties', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    test('ignores non-existent properties', () => {
      const obj = { a: 1, b: 2 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1 });
    });

    test('handles empty keys array', () => {
      expect(pick({ a: 1 }, [])).toEqual({});
    });
  });
});

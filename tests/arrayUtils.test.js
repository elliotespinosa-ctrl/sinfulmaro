/**
 * Tests for array utilities
 */

const {
  unique,
  chunk,
  flatten,
  shuffle,
  groupBy,
} = require('../src/utils/arrayUtils');

describe('Array Utilities', () => {
  describe('unique', () => {
    test('removes duplicates from array', () => {
      expect(unique([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
      expect(unique(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    test('handles empty array', () => {
      expect(unique([])).toEqual([]);
    });

    test('handles array with no duplicates', () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('handles non-array input', () => {
      expect(unique(null)).toEqual([]);
      expect(unique('string')).toEqual([]);
    });
  });

  describe('chunk', () => {
    test('chunks array into specified size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4], 2)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    test('handles chunk size larger than array', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });

    test('handles empty array', () => {
      expect(chunk([], 2)).toEqual([]);
    });

    test('handles invalid size', () => {
      expect(chunk([1, 2, 3], 0)).toEqual([]);
      expect(chunk([1, 2, 3], -1)).toEqual([]);
    });
  });

  describe('flatten', () => {
    test('flattens nested arrays', () => {
      expect(flatten([1, [2, 3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
      expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
    });

    test('handles non-nested arrays', () => {
      expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('handles empty array', () => {
      expect(flatten([])).toEqual([]);
    });

    test('respects depth parameter', () => {
      expect(flatten([1, [2, [3]]], 1)).toEqual([1, 2, [3]]);
    });
  });

  describe('shuffle', () => {
    test('returns array with same elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);
      expect(shuffled.sort()).toEqual(arr.sort());
    });

    test('does not modify original array', () => {
      const arr = [1, 2, 3];
      const original = [...arr];
      shuffle(arr);
      expect(arr).toEqual(original);
    });

    test('handles empty array', () => {
      expect(shuffle([])).toEqual([]);
    });
  });

  describe('groupBy', () => {
    test('groups array elements by key function', () => {
      const arr = [
        { type: 'fruit', name: 'apple' },
        { type: 'vegetable', name: 'carrot' },
        { type: 'fruit', name: 'banana' },
      ];
      const grouped = groupBy(arr, (item) => item.type);
      expect(grouped.fruit).toHaveLength(2);
      expect(grouped.vegetable).toHaveLength(1);
    });

    test('handles empty array', () => {
      expect(groupBy([], (x) => x)).toEqual({});
    });

    test('handles non-function key', () => {
      expect(groupBy([1, 2, 3], null)).toEqual({});
    });
  });
});

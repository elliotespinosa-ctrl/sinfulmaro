/**
 * Tests for string utilities
 */

const {
  capitalize,
  reverse,
  isPalindrome,
  truncate,
  countOccurrences,
} = require('../src/utils/stringUtils');

describe('String Utilities', () => {
  describe('capitalize', () => {
    test('capitalizes first letter of each word', () => {
      expect(capitalize('hello world')).toBe('Hello World');
      expect(capitalize('the quick brown fox')).toBe('The Quick Brown Fox');
    });

    test('handles single word', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    test('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    test('handles non-string input', () => {
      expect(capitalize(null)).toBe('');
      expect(capitalize(undefined)).toBe('');
      expect(capitalize(123)).toBe('');
    });
  });

  describe('reverse', () => {
    test('reverses a string', () => {
      expect(reverse('hello')).toBe('olleh');
      expect(reverse('world')).toBe('dlrow');
    });

    test('handles empty string', () => {
      expect(reverse('')).toBe('');
    });

    test('handles palindromes', () => {
      expect(reverse('racecar')).toBe('racecar');
    });
  });

  describe('isPalindrome', () => {
    test('identifies palindromes', () => {
      expect(isPalindrome('racecar')).toBe(true);
      expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
    });

    test('identifies non-palindromes', () => {
      expect(isPalindrome('hello')).toBe(false);
      expect(isPalindrome('world')).toBe(false);
    });

    test('handles empty string', () => {
      expect(isPalindrome('')).toBe(true);
    });
  });

  describe('truncate', () => {
    test('truncates long strings', () => {
      const longString = 'This is a very long string that needs truncation';
      expect(truncate(longString, 20)).toBe('This is a very lo...');
    });

    test('does not truncate short strings', () => {
      expect(truncate('Short', 20)).toBe('Short');
    });

    test('uses default max length', () => {
      const longString = 'a'.repeat(100);
      const result = truncate(longString);
      expect(result.length).toBe(50);
    });
  });

  describe('countOccurrences', () => {
    test('counts non-overlapping occurrences correctly', () => {
      expect(countOccurrences('hello world hello', 'hello')).toBe(2);
      // In 'aaa', 'aa' appears once (positions 0-1), not twice (overlapping at 1-2)
      expect(countOccurrences('aaa', 'aa')).toBe(1);
      expect(countOccurrences('aaaa', 'aa')).toBe(2); // positions 0-1 and 2-3
    });

    test('returns 0 for no matches', () => {
      expect(countOccurrences('hello', 'world')).toBe(0);
    });

    test('handles empty strings', () => {
      expect(countOccurrences('', 'test')).toBe(0);
      expect(countOccurrences('test', '')).toBe(0);
    });
  });
});

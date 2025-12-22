/**
 * Tests for validation utilities
 */

const {
  isValidEmail,
  isValidURL,
  isValidUSPhone,
  isValidCreditCard,
  isEmpty,
  validatePassword,
} = require('../src/utils/validators');

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    test('validates correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    test('rejects invalid emails', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('missing@domain')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
    });

    test('handles non-string input', () => {
      expect(isValidEmail(null)).toBe(false);
      expect(isValidEmail(123)).toBe(false);
    });
  });

  describe('isValidURL', () => {
    test('validates correct URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://localhost:3000')).toBe(true);
      expect(isValidURL('ftp://files.example.com')).toBe(true);
    });

    test('rejects invalid URLs', () => {
      expect(isValidURL('not-a-url')).toBe(false);
      expect(isValidURL('http://')).toBe(false);
    });
  });

  describe('isValidUSPhone', () => {
    test('validates correct US phone numbers', () => {
      expect(isValidUSPhone('123-456-7890')).toBe(true);
      expect(isValidUSPhone('(123) 456-7890')).toBe(true);
      expect(isValidUSPhone('1234567890')).toBe(true);
    });

    test('rejects invalid phone numbers', () => {
      expect(isValidUSPhone('123')).toBe(false);
      expect(isValidUSPhone('abc-def-ghij')).toBe(false);
    });
  });

  describe('isValidCreditCard', () => {
    test('validates correct card numbers using Luhn', () => {
      expect(isValidCreditCard('4532015112830366')).toBe(true);
      expect(isValidCreditCard('6011111111111117')).toBe(true);
    });

    test('rejects invalid card numbers', () => {
      expect(isValidCreditCard('1234567890123456')).toBe(false);
      expect(isValidCreditCard('abc')).toBe(false);
    });

    test('handles spaces in card numbers', () => {
      expect(isValidCreditCard('4532 0151 1283 0366')).toBe(true);
    });
  });

  describe('isEmpty', () => {
    test('identifies empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    test('identifies non-empty values', () => {
      expect(isEmpty('text')).toBe(false);
      expect(isEmpty([1, 2])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
      expect(isEmpty(0)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('validates strong passwords', () => {
      const result = validatePassword('SecureP@ss123');
      expect(result.isValid).toBe(true);
      expect(result.strength).toBe('strong');
      expect(result.issues).toHaveLength(0);
    });

    test('identifies weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.strength).toBe('weak');
      expect(result.issues.length).toBeGreaterThan(0);
    });

    test('provides specific issues', () => {
      const result = validatePassword('short');
      expect(result.issues).toContain('Must be at least 8 characters');
    });

    test('handles non-string input', () => {
      const result = validatePassword(123);
      expect(result.isValid).toBe(false);
      expect(result.strength).toBe('invalid');
    });
  });
});

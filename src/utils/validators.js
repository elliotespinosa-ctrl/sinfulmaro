/**
 * Data validation utilities
 * Demonstrates validation logic, regex patterns, and type checking
 */

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email);
};

/**
 * Validates a URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates a phone number (basic US format)
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidPhone = (phone) => {
  const phoneRegex = /^\+?1?\s*\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
  return typeof phone === 'string' && phoneRegex.test(phone);
};

/**
 * Validates a credit card number using Luhn algorithm
 * @param {string} cardNumber - The card number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidCreditCard = (cardNumber) => {
  if (typeof cardNumber !== 'string') return false;
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cleaned)) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param {*} value - The value to check
 * @returns {boolean} - True if empty, false otherwise
 */
const isEmpty = (value) => {
  if (value == null) return true;
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
};

/**
 * Validates password strength
 * @param {string} password - The password to validate
 * @returns {Object} - Object with isValid and strength properties
 */
const validatePassword = (password) => {
  if (typeof password !== 'string') {
    return { isValid: false, strength: 'invalid', issues: ['Not a string'] };
  }

  const issues = [];
  let strength = 0;

  if (password.length < 8) {
    issues.push('Must be at least 8 characters');
  } else {
    strength += 1;
  }

  if (!/[a-z]/.test(password)) {
    issues.push('Must contain lowercase letter');
  } else {
    strength += 1;
  }

  if (!/[A-Z]/.test(password)) {
    issues.push('Must contain uppercase letter');
  } else {
    strength += 1;
  }

  if (!/[0-9]/.test(password)) {
    issues.push('Must contain number');
  } else {
    strength += 1;
  }

  if (!/[!@#$%^&*]/.test(password)) {
    issues.push('Must contain special character');
  } else {
    strength += 1;
  }

  const strengthLabel =
    strength <= 2 ? 'weak' : strength <= 3 ? 'medium' : 'strong';

  return {
    isValid: issues.length === 0,
    strength: strengthLabel,
    issues,
  };
};

module.exports = {
  isValidEmail,
  isValidURL,
  isValidPhone,
  isValidCreditCard,
  isEmpty,
  validatePassword,
};

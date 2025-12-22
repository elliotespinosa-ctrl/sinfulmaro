/**
 * String manipulation utilities
 * Demonstrates string processing, regex, and text transformation
 */

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - The input string
 * @returns {string} - The capitalized string
 */
const capitalize = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Reverses a string
 * @param {string} str - The input string
 * @returns {string} - The reversed string
 */
const reverse = (str) => {
  if (typeof str !== 'string') return '';
  return str.split('').reverse().join('');
};

/**
 * Checks if a string is a palindrome
 * @param {string} str - The input string
 * @returns {boolean} - True if palindrome, false otherwise
 */
const isPalindrome = (str) => {
  if (typeof str !== 'string') return false;
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === reverse(cleaned);
};

/**
 * Truncates a string to a specified length and adds ellipsis
 * @param {string} str - The input string
 * @param {number} maxLength - Maximum length
 * @returns {string} - The truncated string
 */
const truncate = (str, maxLength = 50) => {
  if (typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
};

/**
 * Counts the occurrences of a substring in a string
 * @param {string} str - The input string
 * @param {string} substring - The substring to count
 * @returns {number} - The count of occurrences
 */
const countOccurrences = (str, substring) => {
  if (typeof str !== 'string' || typeof substring !== 'string') return 0;
  if (substring.length === 0) return 0;
  let count = 0;
  let position = 0;
  while ((position = str.indexOf(substring, position)) !== -1) {
    count++;
    position += substring.length;
  }
  return count;
};

module.exports = {
  capitalize,
  reverse,
  isPalindrome,
  truncate,
  countOccurrences,
};

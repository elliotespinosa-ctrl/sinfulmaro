/**
 * Array manipulation utilities
 * Demonstrates array operations, functional programming, and data processing
 */

/**
 * Removes duplicate values from an array
 * @param {Array} arr - The input array
 * @returns {Array} - Array with unique values
 */
const unique = (arr) => {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr)];
};

/**
 * Chunks an array into smaller arrays of specified size
 * @param {Array} arr - The input array
 * @param {number} size - The chunk size
 * @returns {Array} - Array of chunks
 */
const chunk = (arr, size = 1) => {
  if (!Array.isArray(arr) || size < 1) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

/**
 * Flattens a nested array to a specified depth
 * @param {Array} arr - The input array
 * @param {number} depth - The depth to flatten (default: 1)
 * @returns {Array} - The flattened array
 */
const flatten = (arr, depth = 1) => {
  if (!Array.isArray(arr)) return [];
  if (depth < 1) return arr;
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val);
  }, []);
};

/**
 * Shuffles an array randomly
 * @param {Array} arr - The input array
 * @returns {Array} - The shuffled array
 */
const shuffle = (arr) => {
  if (!Array.isArray(arr)) return [];
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * Groups array elements by a key function
 * @param {Array} arr - The input array
 * @param {Function} keyFn - Function to determine group key
 * @returns {Object} - Object with grouped elements
 */
const groupBy = (arr, keyFn) => {
  if (!Array.isArray(arr) || typeof keyFn !== 'function') return {};
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};

module.exports = {
  unique,
  chunk,
  flatten,
  shuffle,
  groupBy,
};

/**
 * Object manipulation utilities
 * Demonstrates object operations, deep cloning, and property access
 */

/**
 * Deep clones an object
 * @param {*} obj - The object to clone
 * @returns {*} - The cloned object
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (obj instanceof Object) {
    const clonedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * Gets a nested property value using dot notation
 * @param {Object} obj - The object
 * @param {string} path - The property path (e.g., 'user.address.city')
 * @param {*} defaultValue - Default value if path doesn't exist
 * @returns {*} - The property value or default
 */
const getProperty = (obj, path, defaultValue = undefined) => {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
};

/**
 * Sets a nested property value using dot notation
 * @param {Object} obj - The object
 * @param {string} path - The property path
 * @param {*} value - The value to set
 * @returns {Object} - The modified object
 */
const setProperty = (obj, path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;

  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
  return obj;
};

/**
 * Merges multiple objects deeply
 * @param {...Object} objects - Objects to merge
 * @returns {Object} - The merged object
 */
const deepMerge = (...objects) => {
  const isObject = (obj) => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const prevVal = prev[key];
      const objVal = obj[key];

      if (Array.isArray(prevVal) && Array.isArray(objVal)) {
        prev[key] = prevVal.concat(objVal);
      } else if (isObject(prevVal) && isObject(objVal)) {
        prev[key] = deepMerge(prevVal, objVal);
      } else {
        prev[key] = objVal;
      }
    });

    return prev;
  }, {});
};

/**
 * Picks specified properties from an object
 * @param {Object} obj - The source object
 * @param {Array<string>} keys - Keys to pick
 * @returns {Object} - Object with only picked properties
 */
const pick = (obj, keys) => {
  if (!obj || typeof obj !== 'object') return {};
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

module.exports = {
  deepClone,
  getProperty,
  setProperty,
  deepMerge,
  pick,
};

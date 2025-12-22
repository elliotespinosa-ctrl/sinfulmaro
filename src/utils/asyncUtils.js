/**
 * Asynchronous operation utilities
 * Demonstrates promises, async/await, and async control flow
 */

/**
 * Delays execution for a specified time
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Promise that resolves after delay
 */
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Retries an async function a specified number of times
 * @param {Function} fn - Async function to retry
 * @param {number} retries - Number of retry attempts
 * @param {number} delayMs - Delay between retries in milliseconds
 * @returns {Promise} - Promise that resolves with result or rejects
 */
const retry = async (fn, retries = 3, delayMs = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    await delay(delayMs);
    return retry(fn, retries - 1, delayMs);
  }
};

/**
 * Executes promises in parallel with a concurrency limit
 * @param {Array} tasks - Array of async functions
 * @param {number} limit - Maximum concurrent executions
 * @returns {Promise<Array>} - Promise that resolves with all results
 */
const parallelLimit = async (tasks, limit = 2) => {
  const results = [];
  const executing = [];

  for (const [index, task] of tasks.entries()) {
    const promise = Promise.resolve().then(() => task());
    results[index] = promise;

    if (limit <= tasks.length) {
      const execute = promise.then(() => {
        executing.splice(executing.indexOf(execute), 1);
      });
      executing.push(execute);

      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.all(results);
};

/**
 * Creates a timeout wrapper for a promise
 * @param {Promise} promise - The promise to wrap
 * @param {number} ms - Timeout in milliseconds
 * @returns {Promise} - Promise that rejects on timeout
 */
const timeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout exceeded')), ms)
    ),
  ]);
};

/**
 * Debounces an async function
 * @param {Function} fn - Function to debounce
 * @param {number} ms - Debounce delay in milliseconds
 * @returns {Function} - Debounced function
 */
const debounce = (fn, ms = 300) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    return new Promise((resolve) => {
      timeoutId = setTimeout(() => resolve(fn.apply(this, args)), ms);
    });
  };
};

module.exports = {
  delay,
  retry,
  parallelLimit,
  timeout,
  debounce,
};

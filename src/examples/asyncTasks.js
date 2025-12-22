/**
 * Example: Async Task Queue
 * Demonstrates async utilities for handling concurrent operations
 */

const { delay, retry, parallelLimit } = require('../utils');

/**
 * Simulates an API call that might fail
 */
async function simulateAPICall(id, shouldFail = false) {
  await delay(Math.random() * 100);

  if (shouldFail && Math.random() < 0.3) {
    throw new Error(`API call ${id} failed`);
  }

  return { id, data: `Result for task ${id}`, timestamp: Date.now() };
}

/**
 * Process multiple tasks with retry logic
 */
async function processTasksWithRetry() {
  console.log('🔄 Processing tasks with retry logic...\n');

  const tasks = [1, 2, 3, 4, 5];
  const results = [];

  for (const taskId of tasks) {
    try {
      const result = await retry(() => simulateAPICall(taskId, true), 3, 100);
      results.push(result);
      console.log(`✅ Task ${taskId} completed: ${result.data}`);
    } catch (error) {
      console.log(`❌ Task ${taskId} failed after retries`);
    }
  }

  return results;
}

/**
 * Process tasks with concurrency limit
 */
async function processTasksConcurrently() {
  console.log('\n🚀 Processing tasks concurrently (limit: 2)...\n');

  const taskFunctions = Array.from({ length: 6 }, (_, i) => async () => {
    console.log(`  ▶ Starting task ${i + 1}`);
    const result = await simulateAPICall(i + 1, false);
    console.log(`  ✅ Completed task ${i + 1}`);
    return result;
  });

  const results = await parallelLimit(taskFunctions, 2);
  return results;
}

/**
 * Run the async examples
 */
async function runAsyncExamples() {
  console.log('⚡ Async Task Queue Example\n');
  console.log('='.repeat(60));

  const start = Date.now();

  // Example 1: Retry logic
  await processTasksWithRetry();

  // Example 2: Concurrent processing
  await processTasksConcurrently();

  const duration = Date.now() - start;
  console.log('\n='.repeat(60));
  console.log(`\n⏱️  Total execution time: ${duration}ms`);
}

// Run if executed directly
if (require.main === module) {
  runAsyncExamples().catch(console.error);
}

module.exports = { processTasksWithRetry, processTasksConcurrently };

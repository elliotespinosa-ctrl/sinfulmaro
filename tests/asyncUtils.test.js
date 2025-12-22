/**
 * Tests for async utilities
 */

const { delay, retry, timeout } = require('../src/utils/asyncUtils');

describe('Async Utilities', () => {
  describe('delay', () => {
    test('delays execution', async () => {
      const start = Date.now();
      await delay(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(90);
    });
  });

  describe('retry', () => {
    test('succeeds on first try', async () => {
      const fn = jest.fn().mockResolvedValue('success');
      const result = await retry(fn, 3);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('retries on failure and succeeds', async () => {
      const fn = jest
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success');
      const result = await retry(fn, 3, 10);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test('throws after max retries', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('fail'));
      await expect(retry(fn, 2, 10)).rejects.toThrow('fail');
      expect(fn).toHaveBeenCalledTimes(3);
    });
  });

  describe('timeout', () => {
    test('resolves when promise completes in time', async () => {
      const promise = delay(50).then(() => 'success');
      const result = await timeout(promise, 100);
      expect(result).toBe('success');
    });

    test('rejects when promise times out', async () => {
      const promise = delay(200).then(() => 'success');
      await expect(timeout(promise, 50)).rejects.toThrow('Timeout exceeded');
    });
  });
});

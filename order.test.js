const Order = require('./order');

describe('Order', () => {
  let order;

  beforeEach(() => {
    order = new Order(1, ['item1', 'item2'], 'John Doe');
  });

  test('should create an order with correct initial values', () => {
    expect(order.id).toBe(1);
    expect(order.items).toEqual(['item1', 'item2']);
    expect(order.customer).toBe('John Doe');
    expect(order.status).toBe('pending');
    expect(order.cancelledAt).toBeNull();
    expect(order.cancellationReason).toBeNull();
  });

  test('should cancel an order successfully', () => {
    const result = order.cancel('Customer request');
    expect(result).toBe(true);
    expect(order.status).toBe('cancelled');
    expect(order.cancellationReason).toBe('Customer request');
    expect(order.cancelledAt).toBeInstanceOf(Date);
  });

  test('should cancel an order without a reason', () => {
    const result = order.cancel();
    expect(result).toBe(true);
    expect(order.status).toBe('cancelled');
    expect(order.cancellationReason).toBeNull();
  });

  test('should return false when cancelling an already cancelled order', () => {
    order.cancel('First cancellation');
    const result = order.cancel('Second cancellation');
    expect(result).toBe(false);
    expect(order.cancellationReason).toBe('First cancellation'); // Should keep original reason
  });

  test('should throw error when cancelling a completed order', () => {
    order.status = 'completed';
    expect(() => order.cancel()).toThrow('Cannot cancel an order that has been completed or shipped');
  });

  test('should throw error when cancelling a shipped order', () => {
    order.status = 'shipped';
    expect(() => order.cancel()).toThrow('Cannot cancel an order that has been completed or shipped');
  });

  test('should correctly identify cancelled orders', () => {
    expect(order.isCancelled()).toBe(false);
    order.cancel();
    expect(order.isCancelled()).toBe(true);
  });

  test('should return correct order details', () => {
    const details = order.getDetails();
    expect(details).toHaveProperty('id');
    expect(details).toHaveProperty('items');
    expect(details).toHaveProperty('customer');
    expect(details).toHaveProperty('status');
    expect(details).toHaveProperty('createdAt');
    expect(details).toHaveProperty('cancelledAt');
    expect(details).toHaveProperty('cancellationReason');
  });
});

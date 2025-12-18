const OrderManager = require('./orderManager');

describe('OrderManager', () => {
  let manager;

  beforeEach(() => {
    manager = new OrderManager();
  });

  test('should create a new order', () => {
    const order = manager.createOrder(['item1'], 'John Doe');
    expect(order.id).toBe(1);
    expect(order.items).toEqual(['item1']);
    expect(order.customer).toBe('John Doe');
  });

  test('should create multiple orders with incrementing IDs', () => {
    const order1 = manager.createOrder(['item1'], 'John Doe');
    const order2 = manager.createOrder(['item2'], 'Jane Smith');
    expect(order1.id).toBe(1);
    expect(order2.id).toBe(2);
  });

  test('should cancel an order successfully', () => {
    manager.createOrder(['item1'], 'John Doe');
    const result = manager.cancelOrder(1, 'Customer request');
    expect(result).toBe(true);
    const order = manager.getOrder(1);
    expect(order.isCancelled()).toBe(true);
  });

  test('should throw error when cancelling non-existent order', () => {
    expect(() => manager.cancelOrder(999)).toThrow('Order with ID 999 not found');
  });

  test('should get an order by ID', () => {
    const createdOrder = manager.createOrder(['item1'], 'John Doe');
    const retrievedOrder = manager.getOrder(1);
    expect(retrievedOrder).toBe(createdOrder);
  });

  test('should return undefined for non-existent order ID', () => {
    const order = manager.getOrder(999);
    expect(order).toBeUndefined();
  });

  test('should get all orders', () => {
    manager.createOrder(['item1'], 'John Doe');
    manager.createOrder(['item2'], 'Jane Smith');
    const orders = manager.getAllOrders();
    expect(orders).toHaveLength(2);
  });

  test('should get all cancelled orders', () => {
    manager.createOrder(['item1'], 'John Doe');
    manager.createOrder(['item2'], 'Jane Smith');
    manager.createOrder(['item3'], 'Bob Johnson');
    
    manager.cancelOrder(1);
    manager.cancelOrder(3);
    
    const cancelledOrders = manager.getCancelledOrders();
    expect(cancelledOrders).toHaveLength(2);
    expect(cancelledOrders[0].id).toBe(1);
    expect(cancelledOrders[1].id).toBe(3);
  });

  test('should return empty array when no orders are cancelled', () => {
    manager.createOrder(['item1'], 'John Doe');
    manager.createOrder(['item2'], 'Jane Smith');
    
    const cancelledOrders = manager.getCancelledOrders();
    expect(cancelledOrders).toHaveLength(0);
  });
});

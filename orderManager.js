const Order = require('./order');

/**
 * OrderManager class for managing orders
 */
class OrderManager {
  constructor() {
    this.orders = new Map();
    this.nextOrderId = 1;
  }

  /**
   * Create a new order
   * @param {Array} items - Items in the order
   * @param {string} customer - Customer name
   * @returns {Order}
   */
  createOrder(items, customer) {
    const orderId = this.nextOrderId++;
    const order = new Order(orderId, items, customer);
    this.orders.set(orderId, order);
    return order;
  }

  /**
   * Cancel an order by ID
   * @param {number} orderId - Order ID to cancel
   * @param {string} reason - Reason for cancellation
   * @returns {boolean} - True if cancelled successfully
   */
  cancelOrder(orderId, reason = null) {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    return order.cancel(reason);
  }

  /**
   * Get an order by ID
   * @param {number} orderId - Order ID
   * @returns {Order}
   */
  getOrder(orderId) {
    return this.orders.get(orderId);
  }

  /**
   * Get all orders
   * @returns {Array<Order>}
   */
  getAllOrders() {
    return Array.from(this.orders.values());
  }

  /**
   * Get all cancelled orders
   * @returns {Array<Order>}
   */
  getCancelledOrders() {
    return this.getAllOrders().filter(order => order.isCancelled());
  }
}

module.exports = OrderManager;

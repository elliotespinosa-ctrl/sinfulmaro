/**
 * Order class representing an order in the system
 */
class Order {
  constructor(id, items, customer) {
    this.id = id;
    this.items = items;
    this.customer = customer;
    this.status = 'pending';
    this.createdAt = new Date();
    this.cancelledAt = null;
    this.cancellationReason = null;
  }

  /**
   * Cancel the order with an optional reason
   * @param {string} reason - Reason for cancellation
   * @returns {boolean} - True if cancelled successfully, false otherwise
   */
  cancel(reason = null) {
    if (this.status === 'cancelled') {
      return false; // Already cancelled
    }

    if (this.status === 'completed' || this.status === 'shipped') {
      throw new Error('Cannot cancel an order that has been completed or shipped');
    }

    this.status = 'cancelled';
    this.cancelledAt = new Date();
    this.cancellationReason = reason;
    return true;
  }

  /**
   * Check if the order is cancelled
   * @returns {boolean}
   */
  isCancelled() {
    return this.status === 'cancelled';
  }

  /**
   * Get order details
   * @returns {object}
   */
  getDetails() {
    return {
      id: this.id,
      items: this.items,
      customer: this.customer,
      status: this.status,
      createdAt: this.createdAt,
      cancelledAt: this.cancelledAt,
      cancellationReason: this.cancellationReason
    };
  }
}

module.exports = Order;

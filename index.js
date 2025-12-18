const OrderManager = require('./orderManager');

// Example usage
const manager = new OrderManager();

// Create some orders
const order1 = manager.createOrder(['Camera', 'SD Card'], 'John Doe');
console.log('Created order:', order1.getDetails());

const order2 = manager.createOrder(['GoPro', 'Mount'], 'Jane Smith');
console.log('Created order:', order2.getDetails());

// Cancel an order
try {
  const cancelled = manager.cancelOrder(1, 'Customer requested cancellation');
  console.log('\nOrder 1 cancelled:', cancelled);
  console.log('Order 1 details:', manager.getOrder(1).getDetails());
} catch (error) {
  console.error('Error cancelling order:', error.message);
}

// Try to cancel again (should return false)
try {
  const cancelledAgain = manager.cancelOrder(1, 'Duplicate cancellation');
  console.log('\nTrying to cancel order 1 again:', cancelledAgain);
} catch (error) {
  console.error('Error:', error.message);
}

// Show all cancelled orders
console.log('\nAll cancelled orders:', manager.getCancelledOrders().map(o => o.getDetails()));

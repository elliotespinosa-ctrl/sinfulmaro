# sinfulmaro

Order management system with order cancellation functionality.

## Features

- Create orders with items and customer information
- Cancel orders with optional reason
- Track order status (pending, cancelled, completed, shipped)
- Retrieve order details and history
- Filter cancelled orders

## Installation

```bash
npm install
```

## Usage

```javascript
const OrderManager = require('./orderManager');

// Create order manager
const manager = new OrderManager();

// Create an order
const order = manager.createOrder(['Camera', 'SD Card'], 'John Doe');

// Cancel an order
manager.cancelOrder(order.id, 'Customer requested cancellation');

// Get order details
const details = order.getDetails();

// Get all cancelled orders
const cancelledOrders = manager.getCancelledOrders();
```

## Running the Example

```bash
npm start
```

## Testing

```bash
npm test
```

## API

### Order Class

- `cancel(reason)` - Cancel the order with optional reason
- `isCancelled()` - Check if order is cancelled
- `getDetails()` - Get order details

### OrderManager Class

- `createOrder(items, customer)` - Create a new order
- `cancelOrder(orderId, reason)` - Cancel an order by ID
- `getOrder(orderId)` - Get order by ID
- `getAllOrders()` - Get all orders
- `getCancelledOrders()` - Get all cancelled orders
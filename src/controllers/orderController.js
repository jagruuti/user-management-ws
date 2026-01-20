const { v4: uuidv4 } = require('uuid');
const { emitEvent } = require('../websocket/socketServer');
const orders = [
  { id: 'order-1', status: 'CREATED' }
];

// CREATE ORDER
const createOrder = (req, res) => {
  const newOrder = {
    id: uuidv4(),
    status: 'CREATED'
  };
  orders.push(newOrder);
  emitEvent('ORDER_CREATED', newOrder);
  res.status(201).json(newOrder);
};

//Update order status
const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;

emitEvent('ORDER_STATUS_CHANGED', {
    orderId: id,
    status
  });

  res.status(200).json(order);
};

module.exports = {
  createOrder,
  updateOrderStatus
};
console.log('createOrder:', typeof createOrder);
console.log('updateOrderStatus:', typeof updateOrderStatus);
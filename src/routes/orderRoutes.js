const express = require('express');
const { createOrder, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.put('/:id/status', updateOrderStatus);
console.log('updateOrderStatus:', updateOrderStatus);
module.exports = router;

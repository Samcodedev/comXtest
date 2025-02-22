const express = require('express')
const router = express.Router()
const { createOrder, getOrders, updateOrder } = require('../controller/orderController')
const validateToken = require('../middleware/validateToken')

// public route
router.use(validateToken)
router.post('/createOrder', createOrder)
router.get('/getOrders', getOrders)
router.put('/updateOrder/:orderId', updateOrder)

module.exports = router
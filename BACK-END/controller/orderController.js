const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken");
const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const { sendEmail } = require('../middleware/handleMail')


const createOrder = asyncHandler(async (req, res) => {
    const { productId, orderType, quantity, price } = req.body
    // Get userId from the authenticated user's token
    const userId = req.user.id
    if (!userId) {
        res.status(401)
        throw new Error("Unauthorized")
    }
    const product = await Product.findById(productId)
    if (!product) {
        res.status(404)
        throw new Error("Product not found")
    }  
    if(orderType !== "buy" && orderType !== "sell"){
        res.status(400)
        throw new Error("Invalid order type")
    }
    if(quantity <= 0 || price <= 0){
        res.status(400)
        throw new Error("Invalid quantity or price")
    }
    if(orderType === "buy" && price > product.price){
        res.status(400)
        throw new Error("Buy price cannot be greater than the product price")
    }
    if(orderType === "sell" && price < product.price){
        res.status(400)
        throw new Error("Sell price cannot be less than the product price")
    }


    if (!productId || !orderType || !quantity || !price) {
        res.status(400)
        throw new Error("All fields are required")
    }

    const order = await Order.create({
        userId,
        productId,
        orderType,
        quantity,
        price,
        status: "open" // default value, but explicitly setting it
    })

    await sendEmail(
        userId,
        'orderConfirmation',
        {
            orderId: order._id,
            amount: order.price,
            status: order.status
        }
    )

    res.status(201).json(order)
})

const getOrders = asyncHandler(async (req, res) => {
    const userId = req.user.id
    if(!userId){
        res.status(401)
        throw new Error("Unauthorized")
    }
    const orders = await Order.find({ userId })
    if(!orders){
        res.status(404)
        throw new Error("No orders found")
    }
    res.status(200).json(orders)
})

const updateOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const { status } = req.body
    const order = await Order.findById(orderId)
    if(!order){
        res.status(404)
        throw new Error("Order not found")
    }
    if(status !== "open" && status !== "closed" && status !== "cancelled"){
        res.status(400)
        throw new Error("Invalid status")
    }
    order.status = status
    await order.save()
    res.status(200).json({ message: "Order updated successfully" })
})




module.exports = { createOrder, getOrders, updateOrder }
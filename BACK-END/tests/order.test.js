const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app') // Your express app
const { User } = require('../models/userModel')
const { Order } = require('../models/orderModel')
const jwt = require('jsonwebtoken')

describe('Order API Tests', () => {
    let token
    let testUser
    let testOrder

    // Setup before running tests
    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(process.env.MONGODB_URI_TEST)
        
        // Create a test individual user
        testUser = await User.create({
            accountType: "individual",
            email: "test@example.com",
            password: "Password123!",
            firstName: "Test",
            lastName: "User",
            phoneNumber: "+1234567890",
            isVerified: true
        })

        // Generate test token
        token = jwt.sign(
            { userId: testUser._id, accountType: testUser.accountType },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15d' }
        )
    })

    // Cleanup after tests
    afterAll(async () => {
        await Order.deleteMany({})
        await User.deleteMany({})
        await mongoose.connection.close()
    })

    // Test Order Creation
    describe('POST /api/orders/create', () => {
        it('should create a new order for verified user', async () => {
            const orderData = {
                orderType: "buy",
                productName: "Test Product",
                quantity: 100,
                price: 50.00,
                total: 5000.00
            }

            const response = await request(app)
                .post('/api/orders/create')
                .set('Authorization', `Bearer ${token}`)
                .send(orderData)

            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('message', 'Order created successfully')
            expect(response.body.order).toHaveProperty('userId', testUser._id.toString())
            expect(response.body.order.orderType).toBe('buy')
        })

        it('should fail to create order without authentication', async () => {
            const response = await request(app)
                .post('/api/orders/create')
                .send({})

            expect(response.status).toBe(401)
        })

        it('should fail if user is not verified', async () => {
            // Create unverified user
            const unverifiedUser = await User.create({
                accountType: "individual",
                email: "unverified@example.com",
                password: "Password123!",
                firstName: "Unverified",
                lastName: "User",
                phoneNumber: "+1234567890",
                isVerified: false
            })

            const unverifiedToken = jwt.sign(
                { userId: unverifiedUser._id, accountType: unverifiedUser.accountType },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15d' }
            )

            const response = await request(app)
                .post('/api/orders/create')
                .set('Authorization', `Bearer ${unverifiedToken}`)
                .send({
                    orderType: "buy",
                    productName: "Test Product",
                    quantity: 100,
                    price: 50.00
                })

            expect(response.status).toBe(403)
            expect(response.body).toHaveProperty('error', 'Account not verified')
        })
    })

    // Test Getting Orders
    describe('GET /api/orders', () => {
        beforeEach(async () => {
            // Create test order
            testOrder = await Order.create({
                userId: testUser._id,
                orderType: "buy",
                productName: "Test Product",
                quantity: 100,
                price: 50.00,
                total: 5000.00,
                status: "pending"
            })
        })

        it('should get all orders for authenticated user', async () => {
            const response = await request(app)
                .get('/api/orders')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(Array.isArray(response.body)).toBeTruthy()
            expect(response.body.length).toBeGreaterThan(0)
        })

        it('should get a specific order by ID', async () => {
            const response = await request(app)
                .get(`/api/orders/${testOrder._id}`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('_id', testOrder._id.toString())
        })
    })

    // Test Order Updates
    describe('PUT /api/orders/:orderId', () => {
        it('should update order status', async () => {
            const response = await request(app)
                .put(`/api/orders/${testOrder._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ status: 'completed' })

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('status', 'completed')
        })

        it('should not update order with invalid status', async () => {
            const response = await request(app)
                .put(`/api/orders/${testOrder._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ status: 'invalid_status' })

            expect(response.status).toBe(400)
        })
    })

    // Test Order Deletion
    describe('DELETE /api/orders/:orderId', () => {
        it('should delete an order', async () => {
            const response = await request(app)
                .delete(`/api/orders/${testOrder._id}`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('message', 'Order deleted successfully')
        })

        it('should not delete non-existent order', async () => {
            const fakeOrderId = new mongoose.Types.ObjectId()
            const response = await request(app)
                .delete(`/api/orders/${fakeOrderId}`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(404)
        })
    })

    // Test Order Validation
    describe('Order Validation', () => {
        it('should fail with invalid order data', async () => {
            const invalidOrder = {
                orderType: "invalid_type",
                quantity: -1,
                price: "invalid_price"
            }

            const response = await request(app)
                .post('/api/orders/create')
                .set('Authorization', `Bearer ${token}`)
                .send(invalidOrder)

            expect(response.status).toBe(400)
        })

        it('should fail with insufficient balance', async () => {
            const expensiveOrder = {
                orderType: "buy",
                productName: "Expensive Product",
                quantity: 1000,
                price: 10000.00,
                total: 10000000.00
            }

            const response = await request(app)
                .post('/api/orders/create')
                .set('Authorization', `Bearer ${token}`)
                .send(expensiveOrder)

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('error', 'Insufficient balance')
        })
    })
}) 
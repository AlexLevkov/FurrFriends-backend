const orderService = require('./order.service')
const logger = require('../../services/logger.service')

module.exports = {
    getOrder,
    getOrders,
    deleteOrder,
    addOrder
}

async function getOrder(req, res) {
    try {
        const order = await orderService.getById(req.params.id)
        res.send(order)
    } catch {
        logger.error('Failed to get Order', err)
        res.status(500).send({ err: 'Failed to get order' })
    }
}


async function getOrders(req, res) {
    console.log('orders')
    try {
        const orders = await orderService.query()
        res.send(orders)
    } catch (err) {
        logger.error('Failed to get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function deleteOrder(req, res) {
    try {
        await orderService.remove(req.params.id)
        res.send({ msg: 'Deleted successfuly' })
    } catch (err) {
        logger.error({ err: 'Faild to delete order' })
        res.status(500).send({ err: 'Faild to delete order' })
    }
}


async function addOrder(req, res) {
    try {
        const order = req.body
        const orderToAdd = await orderService.add(order)
        res.send(orderToAdd)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}
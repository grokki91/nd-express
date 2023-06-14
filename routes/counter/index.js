const express = require('express')
const store = require('../../store')
const router = express.Router()
const redis = require('redis')
const pageNotFound = {message: '404 | Страница не найдена'}

const REDIS_URL = process.env.REDIS_URL || 'localhost'
const client = redis.createClient({ url: REDIS_URL})

(async () => {
    await client.connect()
})()

router.post('/counter/:id/incr', async (req, res) => {
    const {books} = store
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)

    if (idx !== - 1) {
        try {
            const count = await client.incr(id)
            books[idx].count = count
            res.json({message: `Количество просмотров - ${count}`})
        } catch (error) {
            res.json({errCode: 500, errMessage: error})
        }
    } else {
        res.status(404)
        res.json(pageNotFound)
    }
})

router.get('/counter/:id', async (req, res) => {
    const {books} = store
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)

    if (idx !== - 1) {
        try {
            res.json({message: `Количество просмотров - ${books[idx].count}`})
        } catch (error) {
            res.json({errCode: 500, errMessage: error})
        }
    } else {
        res.status(404)
        res.json(pageNotFound)
    }
})

module.exports = router
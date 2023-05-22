const express = require('express')
const store = require('../store')
const User = require('../User')
const Book = require('../Book')
const router = express.Router()
const fileMulter = require('../middleware/file')

router.get('/api/books', (req, res) => {
    const {books} = store
    res.json(books)
})

router.get('/api/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)
    res.json(books[idx])
})

router.post('/api/user/login', (req, res) => {
    const {mail} = req.body
    const login = new User(mail)
    res.status(201)
    res.json(login)
})

router.post('/api/books', (req, res) => {
    const {books} = store
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const book = new Book(title, description, authors, favorite, fileCover, fileName)
    books.push(book)
    res.status(201)
    res.json(book)
})

router.put('/api/books/:id', (req, res) => {
    const {books} = store
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id}= req.params
    const idx = books.findIndex(book => book.id === id)
    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        }
        res.json(true)
    } else {
        res.status(404)
        res.json('404 | Страница не найдена')
    }
})

router.delete('/api/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)

    if (idx !== -1) {
        books.slice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json('404 | Страница не найдена')
    }
})

router.post('/api/books/:id/download', 
    fileMulter.single('cover-img'),
    (req, res) => {
        const {id} = req.params
        const {books} = store
        const idx = books.findIndex(book => book.id === id)

        if (req.file && idx !== -1) {
            const {path} = req.file

            books[idx] = {
                ...books[idx],
                fileBook : path
            }
            res.json({path})
        }
        res.json()
})

module.exports = router
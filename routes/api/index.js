const express = require('express')
const router = express.Router()
const User = require('../../public/store/User')
// const Book = require('../../public/store/Book')
const fileMulter = require('../../middleware/file')
const Book = require('../../models')
const pageNotFound = {message: '404 | Страница не найдена'}

router.get('/api/books', async (req, res) => {
    try {
        const book = await Book.find().select('-__v')
        res.json(book)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/api/books/:id', async (req, res) => {
    const {id} = req.params
    try {
        const book = await Book.findById(id).select('-__v')
        res.json(book)
    } catch (error) {
        res.status(500).json({error: error})
    }

    // if (idx !== - 1) {
    //     res.json(books[idx])
    // } else {
    //     res.status(404)
    //     res.json(pageNotFound)
    // }
})

router.post('/api/user/login', (req, res) => {
    const {mail} = req.body
    const login = new User(mail)
    res.status(201)
    res.json(login)
})

router.post('/api/books', async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const newBook = new Book({
        title, description, authors, favorite, fileCover, fileName
    })
    try {
        await newBook.save()
        res.status(201).json(newBook)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.put('/api/books/:id', async (req, res) => {
    const {id}= req.params
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    try {
        await Book.findByIdAndUpdate(id, {
            title, description, authors, favorite, fileCover, fileName
        })
        res.redirect(`/api/books/${id}`)
    } catch (error) {
        res.status(500).json({error: error})
    }
    
    // if (idx !== -1) {
    //     books[idx] = {
    //         ...books[idx],
    //         title,
    //         description,
    //         authors,
    //         favorite,
    //         fileCover,
    //         fileName
    //     }
    //     res.json(true)
    // } else {
    //     res.status(404)
    //     res.json(pageNotFound)
    // }
})

router.delete('/api/books/:id', async (req, res) => {
    const {id} = req.params
    try {
        await Book.deleteOne({_id: id})
        res.json(true)
    } catch (error) {
        res.status(500).json({error: error})
    }
    // if (idx !== -1) {
    //     books.slice(idx, 1)
    //     res.json({message: 'Ok'})
    // } else {
    //     res.status(404)
    //     res.json(pageNotFound)
    // }
})

router.get('/api/books/:id/download', (req, res) => {
    const {id} = req.params
    const {books} = store
    const idx = books.findIndex(book => book.id === id)
    const bookPath = books[idx]?.fileBook

    if (idx !== -1 && bookPath) {
        res.download(bookPath)
    } else {
        res.json(pageNotFound)
    }
})

module.exports = router
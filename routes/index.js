const express = require('express')
const store = require('../public/store')
const Book = require('../public/store/Book')
const router = express.Router()
const fileMulter = require('../middleware/file')

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Main'
    })
})

router.get('/books', (req, res) => {
    const {books} = store
    res.render('books/index', {
        title: 'book',
        books: books
    })

})

router.get('/books/create', (req, res) => {
    res.render('books/create', {
        title: 'Create',
        book: {}
    })
})

router.post('/books/create', 
    fileMulter.single('fileBook'),
    (req, res) => {
        const path = req.file.path
        const {books} = store
        let {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
        const book = new Book(title, description, authors, favorite, fileCover, fileName, fileBook = path)
        books.push(book)
        res.redirect('/books')
})

router.get('/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)

    if (idx !== - 1) {
        books[idx].count++
        res.render('books/view', {
            title: 'book | view',
            book: books[idx]
        })
    } else {
        res.render('errors/404', {
            title: '404 | Страница не найдена'
        })
    }
})

router.get('/books/update/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)

    if (idx !== - 1) {
        res.render('books/update', {
            title: 'book | update',
            book: books[idx]
        })
    } else {
        res.render('errors/404', {
            title: '404 | Страница не найдена'
        })
    }
})

router.post('/books/update/:id', 
    fileMulter.single('fileBook'),
    (req, res) => {
        const path = req.file.path
        const {books} = store
        const {title, description, authors, favorite, fileCover, fileName, fileBook = path} = req.body
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
                fileName,
                fileBook
            }
            res.redirect(`/books/${id}`)
        }
})

module.exports = router
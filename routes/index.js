const express = require('express')
const store = require('../store')
const User = require('../User')
const Book = require('../Book')
const router = express.Router()
const fileMulter = require('../middleware/file')
const pageNotFound = {message: '404 | Страница не найдена'}

// router.get('/api/books', (req, res) => {
//     const {books} = store
//     res.json(books)
// })

// router.get('/api/books/:id', (req, res) => {
//     const {books} = store
//     const {id} = req.params
//     const idx = books.findIndex(book => book.id === id)
//     if (idx !== - 1) {
//         res.json(books[idx])
//     } else {
//         res.status(404)
//         res.json(pageNotFound)
//     }
// })

// router.post('/api/user/login', (req, res) => {
//     const {mail} = req.body
//     const login = new User(mail)
//     res.status(201)
//     res.json(login)
// })

// router.post('/api/books', 
//     fileMulter.single('cover-img'),
//     (req, res) => {
//         const {path} = req.file
//         const {books} = store
//         let {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
//         const book = new Book(title, description, authors, favorite, fileCover, fileName, fileBook = path)
//         books.push(book)
//         res.status(201)
//         res.json(book)
// })

// router.put('/api/books/:id', (req, res) => {
//     const {books} = store
//     const {title, description, authors, favorite, fileCover, fileName} = req.body
//     const {id}= req.params
//     const idx = books.findIndex(book => book.id === id)
//     if (idx !== -1) {
//         books[idx] = {
//             ...books[idx],
//             title,
//             description,
//             authors,
//             favorite,
//             fileCover,
//             fileName
//         }
//         res.json(true)
//     } else {
//         res.status(404)
//         res.json(pageNotFound)
//     }
// })

// router.delete('/api/books/:id', (req, res) => {
//     const {books} = store
//     const {id} = req.params
//     const idx = books.findIndex(book => book.id === id)

//     if (idx !== -1) {
//         books.slice(idx, 1)
//         res.json({message: 'Ok'})
//     } else {
//         res.status(404)
//         res.json(pageNotFound)
//     }
// })

// router.get('/api/books/:id/download', (req, res) => {
//     const {id} = req.params
//     const {books} = store
//     const idx = books.findIndex(book => book.id === id)
//     const bookPath = books[idx]?.fileBook

//     if (idx !== -1 && bookPath) {
//         res.download(bookPath)
//     } else {
//         res.json(pageNotFound)
//     }
// })

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Main'
    })
})

router.get('/api/books', (req, res) => {
    const {books} = store
    res.render('books/index', {
        title: 'book',
        books: books
    })

})

router.get('/api/books/create', (req, res) => {
    res.render('books/create', {
        title: 'Create',
        book: {}
    })
})

router.post('/api/books/create', 
    fileMulter.single('cover-img'),
    (req, res) => {
        const path = req?.file?.path
        const {books} = store
        let {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
        const book = new Book(title, description, authors, favorite, fileCover, fileName, fileBook = path)
        console.log('body = ', req.body);
        books.push(book)
        res.redirect('/api/books')
})

router.get('/api/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)
    if (idx !== - 1) {
        res.render('books/view', {
            title: 'book | view',
            book: books[idx]
        })
        // res.json(books[idx])
    } else {
        res.redirect('/404')
        res.status(404)
        // res.json(pageNotFound)
    }
})

router.get('/api/books/update/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)
    if (idx !== - 1) {
        res.render('books/update', {
            title: 'book | update',
            book: books[idx]
        })
    } else {
        res.redirect('/404')
    }
})

router.post('/api/books/update:id', (req, res) => {
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
        res.redirect(`/api/books/${idx}`)
    } else {
        res.status(404)
        res.json(pageNotFound)
    }
})

module.exports = router
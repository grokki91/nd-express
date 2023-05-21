const express = require('express')
const {v4: uuid} = require('uuid')
const app = express()

class User {
    constructor(mail, id = uuid()) {
        this.id = id
        this.mail = mail
    }
}

class Book {
    constructor(title ='', description = '', authors = '', favorite = '', fileCover = '', fileName = '', id = uuid()) {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
    }
}

const store = {
    books: [
        new Book('Гарри Поттер', 'Фэнтэзи', 'Дж. Роулинг', '+', '500', 'garry_potter')
    ]
}

app.use(express.json())

app.post('/api/user/login', (req, res) => {
    const {mail} = req.body
    const login = new User(mail)
    res.status(201)
    res.json(login)
})

app.get('/api/books', (req, res) => {
    const {books} = store
    res.json(books)
})

app.get('/api/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)
    res.json(books[idx])
})

app.post('/api/books', (req, res) => {
    const {books} = store
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const book = new Book(title, description, authors, favorite, fileCover, fileName)
    books.push(book)
    res.status(201)
    res.json(book)
})

app.put('/api/books/:id', (req, res) => {
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

app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000
app.listen(PORT)
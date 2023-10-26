import express, { Request, Response } from 'express'
import Book from '../models'
const router = express.Router()
import fileMulter from '../middleware/file'
import { container } from '../container'
import BooksRepository from '../Book'

router.get('/', async (req: Request, res: Response) => {
    res.render('index', {
        title: 'Main'
    })
})

router.get('/books', async (req: Request, res: Response) => {
    try {
        const books = await Book.find().select('-__v')
        res.render('books/index', {
            title: 'book',
            books: books
        })
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/books/create', async (req: Request, res: Response) => {
    res.render('books/create', {
        title: 'Create',
        book: {}
    })
})

router.post('/books/create', 
    fileMulter.single('fileBook'),
    async (req: Request, res: Response) => {
        try {
            const {title, description, authors, favorite, fileCover, fileName} = req.body
            const book = new Book({
                title, description, authors, favorite, fileCover, fileName
            })

            await book.save()
            res.redirect('/books')
        } catch (error) {
            res.status(500).json({error: error})
        }
})

router.get('/books/:id', async (req: Request, res: Response) => {
    try {
        const {id}= req.params
        const {title, description, authors, favorite, fileCover, fileName} = req.body
        const book = await Book.findByIdAndUpdate(id, {
            title, description, authors, favorite, fileCover, fileName
        })
        res.render('books/view', {
            title: 'book | view',
            book: book
        })
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/books/update/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        if (id.length !== 24) {
            return res.render('errors/404', {
                title: '404 | THIS BOOK IS NOT EXIST'
            })
        }

        const book = await Book.findById(id).exec()
        if (book) {
            return res.render('books/update', {
                title: 'book | update',
                book: book,
            })
        }

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.post('/books/update/:id', 
    fileMulter.single('fileBook'),
    async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const book = await Book.findById(id).exec()
            if (book) {
    
                let {title, description, authors, favorite, pages, fileBook} = req.body
                if (favorite) {
                    favorite = true
                }
    
                if (req.file?.mimetype === 'image/png' || req.file?.mimetype === 'image/jpeg' || req.file?.mimetype === 'image/jpg' || !req.file) {
                    fileBook = req.file ? req.file.path : ''
    
                    await Book.findByIdAndUpdate(id, {$set: {
                        title, description, authors, favorite, pages, fileBook
                    }})
    
                    return res.redirect(`/book/${id}`)
                } 
            }
        } catch (error) {
            res.status(500).json({error: error})
        }
})

router.get(':id', async (req, res, next) => {
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(req.params.id);
    res.json(book);
})

export default router
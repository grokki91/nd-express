import express, { Request, Response } from 'express'
const router = express.Router()
import Book from '../../models'
const pageNotFound = {message: '404 | Страница не найдена'}

router.get('/api/books', async (req: Request, res: Response) => {
    try {
        const book = await Book.find().select('-__v')
        res.json(book)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/api/books/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const book = await Book.findById(id).select('-__v')
        res.json(book)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// router.post('/api/user/login', (req: Request, res: Response) => {
//     const {mail} = req.body
//     const login = new User(mail)
//     res.status(201)
//     res.json(login)
// })

router.post('/api/books', async (req: Request, res: Response) => {
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

router.put('/api/books/:id', async (req: Request, res: Response) => {
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

})

router.delete('/api/books/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        await Book.deleteOne({_id: id})
        res.json(true)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// router.get('/api/books/:id/download', async (req: Request, res: Response) => {
//     const {id} = req.params
//     const books = await Book.find()
//     const idx = books.findIndex((book: any) => book.id === id)
//     const bookPath = books[idx]?.fileBook

//     if (idx !== -1 && bookPath) {
//         res.download(bookPath)
//     } else {
//         res.json(pageNotFound)
//     }
// })

export default router
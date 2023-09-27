const {v4: uuid} = require('uuid')

interface Book {
    id: string,
    title: string,
    description: string,
    authors: string,
    favorite: boolean,
    fileCover: string,
    fileName: string,
    fileBook: string
}

abstract class BooksRepository {
    createBook(book: Book[]): void {
        
    } 

    getBook(id: string): Book {
        return
    }

    getBooks(): string[] {
        return []
    }

    updateBook(id: string): void {

    }

    deleteBook(id: string): void{

    }
}

module.exports = BooksRepository
const {v4: uuid} = require('uuid')

class Book {
    constructor(title = '', description = '', authors = '', favorite = false, fileCover = '', fileName = '', fileBook = '_', count = 0, id = uuid()) {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
        this.count = count
    }
}

module.exports = Book
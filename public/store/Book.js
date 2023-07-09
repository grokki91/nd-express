class Book {
    constructor(id = '', title = '', description = '', authors = '', favorite = false, fileCover = '', fileName = '', fileBook = '', count = 0) {
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
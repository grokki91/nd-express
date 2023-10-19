import { v4 as uuid } from 'uuid';
import 'reflect-metadata'
import { injectable, inject } from "inversify";

interface IBook {
    id: string,
    title: string,
    description: string,
    authors: string,
    favorite: boolean,
    fileCover: string,
    fileName: string,
    fileBook: string
}

const TYPES = {
    IBook: Symbol.for('IBook')
}


abstract class BooksRepository {
    createBook(book: IBook): void {
        
    } 

    getBook(id: string): IBook {
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

@injectable()
export class Book implements IBook {
    public id: string
    public title: string
    public description: string 
    public authors: string
    public favorite: boolean
    public fileCover: string
    public fileName: string
    public fileBook: string

    constructor(
        title: string,
        description: string, 
        authors: string,
        favorite: boolean,
        fileCover: string,
        fileName: string,
        fileBook: string,
        id: string = uuid()
    ) {
        this.title = title
        this.description = description, 
        this.authors = authors,
        this.favorite = favorite,
        this.fileCover = fileCover,
        this.fileName = fileName,
        this.fileBook = fileBook
    }
}
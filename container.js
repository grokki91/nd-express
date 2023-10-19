import 'reflect-metadata'
// import {injectable, inject} from 'inversify'
import {Container} from 'inversify'
import BooksRepository from './Book'

const TYPES = {

}

const container = new Container()
container.bind(BooksRepository).toSelf()

export { container }
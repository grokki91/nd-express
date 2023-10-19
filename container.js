import 'reflect-metadata'
import {injectable, inject} from 'inversify'
import {Container} from 'inversify'
import BooksRepository from './Book'


const container = new Container()
container.bind(BooksRepository).toSelf()

export { container }
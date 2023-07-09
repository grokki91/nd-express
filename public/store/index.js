const Book = require("./Book")

const store = {
    books: [
        new Book('1', 'Гарри Поттер', 'Фэнтэзи', 'Дж. Роулинг', true, '500', 'garry_potter'),
        new Book('2', 'Оно', 'Ужасы', 'С. Кинг', false, '800', 'It')
    ]
}

module.exports = store
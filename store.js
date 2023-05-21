const Book = require("./Book")

const store = {
    books: [
        new Book('Гарри Поттер', 'Фэнтэзи', 'Дж. Роулинг', '+', '500', 'garry_potter'),
        new Book('Оно', 'Ужасы', 'С. Кинг', '-', '800', 'It')
    ]
}

module.exports = store
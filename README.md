## Query for MongoDB:

**add several books** <br> ```db.books.insertMany([{title: "Властелин Колец", description: "Фэнтези", authors: "Дж. Толкин"}, {title: "Дракула", description: "Ужасы", authors: "Б. Стокер"}])```

**find books by title** <br> ```db.books.find({title: "Дракула"})```

**update fields by id** <br> ```db.books.updateOne({"_id" : 1}, {$set: {description: "Война и мир", authors: "Л. Толстой"}})```
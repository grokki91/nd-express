"use strict";
var uuid = require('uuid').v4;
var Book = /** @class */ (function () {
    function Book(title, description, authors, favorite, fileCover, fileName, fileBook, id) {
        if (id === void 0) { id = uuid(); }
    }
    return Book;
}());
module.exports = Book;

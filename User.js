const {v4: uuid} = require('uuid')

class User {
    constructor(mail, id = uuid()) {
        this.id = id
        this.mail = mail
    }
}

module.exports = User
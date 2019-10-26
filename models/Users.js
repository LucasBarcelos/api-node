const BaseModel = require('./BaseModel');

class Users extends BaseModel {
    constructor() {
        super();
    }

    get(id) {
        return this.db
            .collection('users')
            .doc(id)
            .get();
    }

    post(email, password) {
        return this.db
            .collection('users')
            .where('email', '==', email)
            .where('password', '==', password)
            .get();
    }

    put(id, email, password,) {
        return this.db
            const id = request.par
            .collection('users')

            
            .where('email', '==', email)
            .where('password', '==', password)
            .put();
    }
}

module.exports = Users;
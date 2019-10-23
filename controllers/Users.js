const UsersModel = require('../models/Users');
const userModel = new UsersModel();

class Users {
    static get(request, response) {
        const id = request.params.id;
        
        userModel.get(id)
            .then(user => {
                if(!user.exists) {
                    response
                    .sendstatus(404);
                }
            
                response.json(user.data());
            })
            .catch(err => {
                response
                    .sendstatus(500);
                console.log('Error getting document', err);
            });
    }
}

module.exports = Users;
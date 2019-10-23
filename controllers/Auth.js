const UsersModel = require('../models/Users');
const userModel = new UsersModel();

const createToken = require('../utils/createToken');

class Auth {
    static post(request, response) {
        const email = request.body.email;
        const password = request.body.password;
        
        userModel.post(email, password)
        .then(users => {
            if(users.docs.length === 0) {
                return response
                .status(200) 
                .send({ 
                    error_code: 'not_found',
                    message: 'Usuário ou senha inválidos! Tente novamente!'
                });
            }
            const [{ id }] = users.docs;
            console.log(createToken({ id }));
            response.json({ token: createToken({ id }) });
        })
        .catch(err => {
            response
            .sendStatus(500);
            console.log(err)
            console.log('Error getting document', err);
        })
    }
}

module.exports = Auth;
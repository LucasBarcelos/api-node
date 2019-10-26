const cacheManager = require('cache-manager');

// Config
const { cache } = require('../config/default'); // https://medium.com/podiihq/destructuring-objects-in-javascript-4de5a3b0e4cb

// Model
const UsersModel = require('../models/Users');
const userModel = new UsersModel();

// Instância da biblioteca de cache
const memoryCache = cacheManager.caching(cache);

class Users {
    static get(request, response) {
        const id = request.params.id;
        const key = `user_${id}`;

        memoryCache.get(key, (err, result) => {
            if (result) {
                return response.json(result);
            }

            console.log('err', err);
            console.log('result', result);

            userModel.get(id)
            .then(user => {
                if(!user.exists) {
                    response
                    .sendstatus(404);
                }

                const userData = user.data();
                
                memoryCache.set(key, userData);
                response.json(userData);
            })
            .catch(err => {
                response
                    .sendstatus(500);
                console.log('Error getting document', err);
            });
        });
    }

    static update(request, response) {
        // request -> params e o body
        // logica do firebase para atualizar um usuário
    }

    static delete(request, response) {
        // request -> params e o body
        // logica do firebase para atualizar um usuário
    }
}

module.exports = Users;
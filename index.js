const express = require('express');

// Firebase
const firebase = require('firebase');
const firebaseConfig = require('./config/firebase');
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const bodyParser = require('body-parser');
const createToken = require('./utils/createToken');
const verifyToken = require('./middlewares/verifyToken');

const app = express(); // Criando nova instância do express

app.use(bodyParser.json());
app.post('/auth', (request, response, next) => {
  console.log(request.body);

  db.collection('users')
  .where('email', '==', request.body.email)
  .where('password', '==', request.body.password)
  .get()
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
});

// Criando rotas
app.get('/users/:id', verifyToken, (request, response, next) => {
    const id = request.params.id;

    db.collection('users').doc(id).get()
        .then(user => {
            if(!user.exists) {
                response
                    .sendstatus(404);
                    //.send({ message: 'No Content' });
            }

            response.json(user.data());
        })
        .catch(err => {
            response
                .sendstatus(500);
                console.log(err);
                console.log('Error getting document', err);
        });
});


app.get('/users', (request, response, next) => {
// Buscar todos os dados da coleção 'users'

var arrayUsers = [];

db.collection('users').get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      arrayUsers.push(doc.data());
    });
    response.json(arrayUsers);
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

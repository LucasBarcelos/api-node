const express = require('express');

// Firebase
const firebase = require('firebase');
const firebaseConfig = require('./config/firebase');
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const app = express(); // Criando nova instância do express

// Criando rotas
app.get('/users/:id', (request, response, next) => {
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

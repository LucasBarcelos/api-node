const express = require('express');

// Firebase
const firebase = require('firebase');
const firebaseConfig = require('./config/firebase');
//const firebaseApp = firebase.initializeApp(firebaseConfig);
//const db = firebaseApp.firestore();

const routes = require('./routers');
const bodyParser = require('body-parser');
const createToken = require('./utils/createToken');
const verifyToken = require('./middlewares/verifyToken');

const app = express(); // Criando nova instância do express

const Auth = require('./controllers/Auth');

app.use(bodyParser.json());
app.use(routes);

app.post('/auth', Auth.post);

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

const express = require('express');

const app = express(); // Criando nova instância do express 

// Criando rotas
app.get('/users', (request, response, next) => {
    console.log("Entrei na rota User!");

    response.json({success: true})
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
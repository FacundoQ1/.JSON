const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = 'mongodb+srv://lucascristianlol:45350299facu@cluster0.adjnftl.mongodb.net/?retryWrites=true&w=majority';

app.post('/guardarDatos', (req, res) => {
  const datos = req.body;

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;

    // Selecciona la colección
    const collection = client.db('basededatosdepelusa').collection('users');

    // Inserta los datos en la colección
    collection.insertOne(datos, (err, result) => {
      if (err) throw err;

      console.log('Datos guardados en MongoDB Atlas');
      client.close();

      // Envía una respuesta al cliente (puede ser personalizado según tus necesidades)
      res.json({ mensaje: 'Datos guardados en MongoDB Atlas' });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

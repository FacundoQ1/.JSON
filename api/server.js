const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Cross origin
app.use(cors({ origin: '*' }));




const uri = 'mongodb+srv://9zPelusa:45350299@pelusita.9pedvg3.mongodb.net/database-saillen';

// Endpoint para manejar la solicitud POST
app.post('/guardarDatos', async (req, res) => {
  try {
    const datos = req.body;

    // Conectar a la base de datos
    const client = new MongoClient(uri);
    await client.connect();

    // Acceder a la colección y guardar los datos
    const collection = client.db('SAILLEN').collection('produccion');
    const result = await collection.insertOne(datos);

    // Cerrar la conexión a la base de datos
    client.close();

    // Enviar una respuesta al cliente
    res.json({ mensaje: 'Datos guardados en MongoDB Atlas', id: result.insertedId });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});

app.get('/buscarUsuarios', async (req, res) => {
  try {
    const { correo } = req.query;

    // Conectar a la base de datos
    const client = new MongoClient(uri);
    await client.connect();

    // Acceder a la colección y buscar usuarios por correo electrónico
    const collection = client.db('SAILLEN').collection('produccion');
    const usuarios = await collection.find({ correo }).toArray();

    // Cerrar la conexiÃ³n a la base de datos
    client.close();

    // Enviar la lista de usuarios encontrados al cliente
    res.json({ usuarios });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});


app.listen(port,() => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

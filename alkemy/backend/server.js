const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Dotenv para las variables locales de conexión.
require('dotenv').config();

//Declaración de la instancia de express y el puerto de conexión.
const app = express();
const port = process.env.PORT || 5000;

//Middleware and bodyparser => incluido en express.
app.use(cors());
app.use(express.json());

//dotenv info
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

//Conecxión a la base de datos.
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully")
});

//Rutas de las apis.
const operacionesRouter = require('./routes/operaciones');

app.use('/operaciones', operacionesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
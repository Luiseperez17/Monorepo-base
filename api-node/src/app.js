const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require("./routes/index"); // Importa las rutas

const { Modulo, Permiso } = require("./models");

const app = express();
app.use(express.json()); // Middleware para manejar JSON

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes); // Configura las rutas en "/api"


// Manejo de errores (middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal' });
});

module.exports = app; // Exporta la app sin iniciar el servidor

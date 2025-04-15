require("dotenv").config();
const app = require("./src/app"); // Importa la configuración de Express
const sequelize = require("./src/config/db");

const PORT = process.env.PORT || 3000;

// Sincronizar la base de datos antes de iniciar el servidor
sequelize
  .sync() // Usa `.sync({ force: true })` si quieres que borre y cree tablas de nuevo
  .then(() => {
    console.log("Base de datos sincronizada");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
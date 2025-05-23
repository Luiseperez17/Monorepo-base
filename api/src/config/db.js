
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  // logging: false, // Opcional: Desactiva logs de SQL en la consola
  logging: (sql, timing) => {
    console.log(sql); // Muestra la consulta SQL
    // if (timing) console.log("Execution time:", timing); // Opcional: Muestra el tiempo de ejecución
  },
  define: {
    // Personalizar nombres de las columnas de timestamps globalmente
    createdAt: 'created_at', // Cambia "createdAt" a "created_at"
    updatedAt: 'updated_at', // Cambia "updatedAt" a "updated_at"
    deletedAt: 'deleted_at', // Cambia "deletedAt" a "deleted_at"
    paranoid: true, // Habilita deletedAt para el borrado lógico
  },
});

module.exports = sequelize;

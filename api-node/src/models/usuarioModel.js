const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tx_usuario: { type: DataTypes.STRING },
    tx_nombre: { type: DataTypes.STRING },
    tx_clave: { type: DataTypes.STRING },
    in_perfil: { type: DataTypes.INTEGER },
    in_estado: { type: DataTypes.INTEGER },
    tx_correo: { type: DataTypes.STRING },
    primera_vez: { type: DataTypes.INTEGER },
  },
  {
    tableName: "app_usuarios", // Nombre real de la tabla en MySQL
    timestamps: true, // Si la tabla tiene createdAt y updatedAt
  }
);

module.exports = Usuario;

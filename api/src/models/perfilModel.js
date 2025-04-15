const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Importa la conexión a la BD

const Perfil = sequelize.define("Perfil", {
    id_perfil: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tx_descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    in_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 // Activo por defecto
    }
}, {
    tableName: "app_perfiles", // Nombre real de la tabla en la BD
    timestamps: true // Para createdAt y updatedAt
});

module.exports = Perfil;

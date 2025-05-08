const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const app_articulos = sequelize.define(
    "app_articulos", 
    {
        codigo_sap: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.INTEGER
        },
        costo: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        maneja_lote: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "app_articulos",
        timestamps: false, // Habilita createdAt y updatedAt
    }
);


module.exports = app_articulos;

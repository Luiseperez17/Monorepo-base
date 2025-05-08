const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const app_codbarras = sequelize.define(
    "app_codbarras", 
    {
        codigo_sap: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        codigo_barras: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "app_codbarras",
        timestamps: false, // Habilita createdAt y updatedAt
    }
);


module.exports = app_codbarras;

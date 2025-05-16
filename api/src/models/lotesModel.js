const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const app_lotes = sequelize.define(
    "app_lotes", 
    {
        codigo_sap: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lote: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_vence: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        tableName: "app_lotes",
        timestamps: false, // Habilita createdAt y updatedAt
    }
);


module.exports = app_lotes;

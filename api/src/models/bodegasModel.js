const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const app_bodegas = sequelize.define(
    "app_bodegas", 
    {
        id_codigo_bodega: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tx_descrip_bodega: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "app_bodegas",
        timestamps: true, // Habilita createdAt y updatedAt
    }
);


module.exports = app_bodegas;

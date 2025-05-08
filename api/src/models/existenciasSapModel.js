const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const app_existencias_sap = sequelize.define(
    "app_existencias_sap", 
    {
        codigo_bodega: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cod_sap_articulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cod_barras_articulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lote_articulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_vence: {
            type: DataTypes.STRING,
            allowNull: true
        },
        stock: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        corrige_existencia: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_usuario_corrige: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: "app_existencias_sap",
        timestamps: false, // Habilita createdAt y updatedAt
    }
);


module.exports = app_existencias_sap;

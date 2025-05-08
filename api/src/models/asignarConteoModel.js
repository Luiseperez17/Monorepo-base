const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AsignarConteo = sequelize.define(
    "AsignarConteo", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_usuario_asignado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        codigo_bodega: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero_conteo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maneja_lote: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        estado_conteo: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fecha_asignado: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        usuario_crea: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        articulo_inicial: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        articulo_final: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        fecha_finaliza_conteo: {
            type: DataTypes.DATEONLY,
            defaultValue: null
        }
    }, {
        tableName: "app_asignar_conteo",
        timestamps: true, // Habilita createdAt y updatedAt
    }
);


module.exports = AsignarConteo;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Modulo = sequelize.define(
    "Modulo", 
    {
        _id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idPadre: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        nombreModulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombreLargoModulo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        urlModulo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        componenteModulo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        iconoModulo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        orden: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        eliminado: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        esPadre: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: "app_modulos",
        timestamps: true
    }
);


module.exports = Modulo;

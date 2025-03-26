const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Modulo = require("./moduloModel");

const Permiso = sequelize.define("Permiso", {
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idModulo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPerfil: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ver: {
        type: DataTypes.TINYINT,
        defaultValue: false
    },
    crear: {
        type: DataTypes.TINYINT,
        defaultValue: false
    },
    editar: {
        type: DataTypes.TINYINT,
        defaultValue: false
    },
    borrar: {
        type: DataTypes.TINYINT,
        defaultValue: false
    }
}, {
    tableName: "app_permisos_modulos",
    timestamps: true
});


module.exports = Permiso;

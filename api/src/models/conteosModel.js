const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const app_conteo = sequelize.define(
    "app_conteo", 
    {
        id: {
          type: DataTypes.BIGINT(15),
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: "id único",
        },
        id_conteo: {
          type: DataTypes.BIGINT(15),
          allowNull: false,
          defaultValue: 0,
          comment: "id del conteo",
        },
        linea_conteo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "Línea Conteo",
        },
        numero_conteo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "Nro Conteo (1: Primer; 2: Segundo; 3: Tercer, 4: Vencidos, 5: Diferencia)",
        },
        codigo_bodega: {
          type: DataTypes.STRING(50),
          allowNull: false,
          comment: "Código Bodega",
        },
        id_usuario_asignado: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "Código Usuario",
        },
        codigo_barras: {
          type: DataTypes.STRING(50),
          allowNull: false,
          comment: "Código Barras",
        },
        codigo_sap: {
          type: DataTypes.STRING(50),
          allowNull: false,
          comment: "Código SAP Artículo",
        },
        descripcion_articulo: {
          type: DataTypes.STRING(200),
          allowNull: true,
          defaultValue: null,
          comment: "Descripción Artículo / Msg Error",
        },
        lote_articulo: {
          type: DataTypes.STRING(50),
          allowNull: true,
          defaultValue: null,
          comment: "Lote Artículo",
        },
        fecha_vence: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          comment: "Fecha de Vencimiento",
        },
        cantidad_contada: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
          comment: "Cantidad contada",
        },
        correccion_conteo: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          comment: "Cantidad Corregida (cuando se corrige)",
        },
        id_usuario_corrige: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
          comment: "Usuario que corrige",
        },
      }, {
        tableName: "app_conteo",
        timestamps: true, // Habilita createdAt y updatedAt
    }
);


module.exports = app_conteo;

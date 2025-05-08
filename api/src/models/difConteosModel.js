const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const app_dif_pri_seg_cont = sequelize.define(
    "app_dif_pri_seg_cont", 
    {
        id: {
          type: DataTypes.BIGINT(15),
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: "id único",
        },
        id_usuario_genera: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "Código Usuario",
        },
        codigo_bodega: {
          type: DataTypes.STRING(50),
          allowNull: false,
          comment: "Código Bodega",
        },
        numero_conteo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "Nro Conteo (1: Primer; 2: Segundo; 3: Tercer, 4: Vencidos, 5: Diferencia)",
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
        cantidad_conteo_1: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
          comment: "Cantidad contada",
        },
        cantidad_conteo_2: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
          comment: "Cantidad contada",
        },
        diferencia: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
          comment: "Cantidad Diferencia",
        },
        cantidad_sap: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
          comment: "Cantidad existencias SAP",
        },
        cantidad_correccion: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: "Cantidad Corregida (cuando se corrige)",
        },
      }, {
        tableName: "app_dif_pri_seg_cont",
        timestamps: true, // Habilita createdAt y updatedAt
    }
);


module.exports = app_dif_pri_seg_cont;

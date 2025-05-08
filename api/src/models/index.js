const Modulo = require("./moduloModel");
const Permiso = require("./permisoModel");

const Lote = require("./lotesModel");
const ExistenciaSap = require("./existenciasSapModel");

// Definir relaciones
Modulo.hasMany(Permiso, { foreignKey: "idModulo", as: "permisos" });
Permiso.belongsTo(Modulo, { foreignKey: "idModulo", as: "modulo" });

// relación entre lotes y existencias
ExistenciaSap.hasMany(Lote, { foreignKey: "cod_sap_articulo", sourceKey: "cod_sap_articulo", as: "lotes" });
Lote.belongsTo(ExistenciaSap, { foreignKey: "cod_sap_articulo", targetKey: "cod_sap_articulo", as: "existencia" });

module.exports = { Modulo, Permiso, Lote, ExistenciaSap };

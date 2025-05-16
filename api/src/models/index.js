const Modulo = require("./moduloModel");
const Permiso = require("./permisoModel");

const Lote = require("./lotesModel");
const ExistenciaSap = require("./existenciasSapModel");

// Definir relaciones
Modulo.hasMany(Permiso, { foreignKey: "idModulo", as: "permisos" });
Permiso.belongsTo(Modulo, { foreignKey: "idModulo", as: "modulo" });

// relación entre lotes y existencias
ExistenciaSap.hasMany(Lote, { foreignKey: "codigo_sap", sourceKey: "codigo_sap", as: "lotes" });
Lote.belongsTo(ExistenciaSap, { foreignKey: "codigo_sap", targetKey: "codigo_sap", as: "existencia" });

module.exports = { Modulo, Permiso, Lote, ExistenciaSap };

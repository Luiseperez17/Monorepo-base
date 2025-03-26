const Modulo = require("./moduloModel");
const Permiso = require("./permisoModel");

// Definir relaciones
Modulo.hasMany(Permiso, { foreignKey: "idModulo", as: "permisos" });
Permiso.belongsTo(Modulo, { foreignKey: "idModulo", as: "modulo" });

module.exports = { Modulo, Permiso };

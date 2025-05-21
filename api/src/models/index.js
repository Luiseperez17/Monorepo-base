const Modulo = require("./moduloModel");
const Permiso = require("./permisoModel");

const Lote = require("./lotesModel");
const ExistenciaSap = require("./existenciasSapModel");
const Usuario = require("./usuarioModel");
const app_conteo = require("./conteosModel");

// Definir relaciones
Modulo.hasMany(Permiso, { foreignKey: "idModulo", as: "permisos" });
Permiso.belongsTo(Modulo, { foreignKey: "idModulo", as: "modulo" });

// relación entre lotes y existencias
ExistenciaSap.hasMany(Lote, { foreignKey: "codigo_sap", sourceKey: "codigo_sap", as: "lotes" });
Lote.belongsTo(ExistenciaSap, { foreignKey: "codigo_sap", targetKey: "codigo_sap", as: "existencia" });


// Asociación entre Usuario y AppConteo
Usuario.hasMany(app_conteo, { foreignKey: "id_usuario_asignado", as: "conteosAsignados" });
app_conteo.belongsTo(Usuario, { foreignKey: "id_usuario_asignado", as: "usuarioAsignado" });


module.exports = { Modulo, Permiso, Lote, ExistenciaSap, Usuario, app_conteo };
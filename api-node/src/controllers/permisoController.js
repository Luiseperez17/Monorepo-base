const Permiso = require("../models/permisoModel");
const Perfil = require("../models/perfilModel");

exports.get = async (req, res) => {
    try {
        const { idModulo } = req.params;
        const permisos = [];

        // Obtener todos los perfiles activos
        const perfiles = await Perfil.findAll({
            where: { in_estado: 1 }
        });

        if (perfiles.length > 0) {
            for (const perfil of perfiles) {
                let dataLinea = {};
                
                // Buscar permisos del perfil para el módulo específico
                const permisosPerfil = await Permiso.findAll({
                    where: {
                        idPerfil: perfil.id_perfil,
                        idModulo: parseInt(idModulo, 10)
                    }
                });

                if (permisosPerfil.length === 0) {
                    dataLinea = {
                        idPerfil: perfil.id_perfil,
                        idModulo: parseInt(idModulo, 10),
                        nombrePerfil: perfil.tx_descripcion,
                        ver: 0,
                        crear: 0,
                        editar: 0,
                        borrar: 0
                    };
                } else {
                    dataLinea = {
                        idPerfil: perfil.id_perfil,
                        nombrePerfil: perfil.tx_descripcion,
                        idModulo: parseInt(idModulo, 10),
                        ver: permisosPerfil[0].ver,
                        crear: permisosPerfil[0].crear,
                        editar: permisosPerfil[0].editar,
                        borrar: permisosPerfil[0].borrar
                    };
                }

                permisos.push(dataLinea);
            }
            return res.status(200).json({ mensaje: "Módulos consultados", datos: permisos });
        } else {
            return res.status(404).json({ mensaje: "No se encontraron perfiles activos", datos: [] });
        }
    } catch (error) {
        return res.status(500).json({ mensaje: `Error al consultar los módulos. Error: ${error.message}`, datos: [] });
    }
};

exports.consultarPermisos = async (req, res) => {
    try {
        const { idPerfil } = req.params; // Se obtiene el idPerfil desde los parámetros de la URL

        const permisosPerfil = await Permiso.findAll({
            where: { idPerfil: parseInt(idPerfil, 10) } // Convierte a número entero
        });

        if (permisosPerfil.length > 0) {
            return res.status(200).json({
                mensaje: "Lista de permisos del perfil",
                datos: permisosPerfil,
                continuar: 1
            });
        } else {
            return res.status(200).json({
                mensaje: "No hay permisos para el perfil",
                datos: [],
                continuar: 0
            });
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: `No se ha podido consultar los permisos del perfil. Error: ${error.message}`,
            datos: [],
            continuar: 0
        });
    }
};

exports.getPermisos = async (req, res) => {
    try {
        const { idModulo, idPerfil } = req.params;

        // Obtener permisos del perfil en el módulo
        const permisosPerfil = await Permiso.findAll({
            where: {
                idPerfil: parseInt(idPerfil, 10),
                idModulo: parseInt(idModulo, 10)
            }
        });

        if (permisosPerfil.length > 0) {
            return res.status(200).json({
                mensaje: "Lista de permisos del módulo",
                datos: permisosPerfil,
                continuar: 1
            });
        } else {
            return res.status(200).json({
                mensaje: "No hay permisos para el módulo",
                datos: [],
                continuar: 0
            });
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: `No se ha podido consultar los permisos del módulo. Error: ${error.message}`,
            datos: [],
            continuar: 0
        });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;

        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({
                mensaje: "Los datos enviados no son válidos",
                datos: []
            });
        }

        const idModulo = data[0].idModulo;

        // Eliminar permisos existentes para el módulo
        await Permiso.destroy({ where: { idModulo } });

        // Insertar los nuevos permisos
        const permisosCreados = await Permiso.bulkCreate(
            data.map(item => ({
                idPerfil: item.idPerfil,
                idModulo: item.idModulo,
                ver: item.ver,
                crear: item.crear,
                editar: item.editar,
                borrar: item.borrar,
                createdAt: new Date(),
                updatedAt: new Date()
            }))
        );

        return res.status(200).json({
            mensaje: "Módulo insertado de manera correcta",
            datos: permisosCreados
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: `No se ha podido insertar el módulo. Error: ${error.message}`,
            datos: []
        });
    }
};
const Modulo = require("../models/moduloModel");
const Permiso = require("../models/permisoModel");

// funcion para obtener los modulos principales
exports.getModulos = async (req, res) => {
    try {
        const resultado = await Modulo.findAll({
            where: {
                eliminado: 0,
                idPadre: 0
            }
        });

        return res.status(200).json({
            mensaje: "Modulos consultados",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los modulos",
            datos: [],
            error: error.message
        });
    }
};

exports.getSubModulos = async (req, res) => {
    const { id } = req.params; // Obtener el ID desde los parámetros de la URL

    try {
        const resultado = await Modulo.findAll({
            where: {
                eliminado: 0,
                idPadre: id
            }
        });

        return res.status(200).json({
            mensaje: "Módulos consultados",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los módulos",
            datos: [],
            error: error.message
        });
    }
};

// Obtener el menu 
exports.getMenu = async (req, res) => {
    const { idPerfil } = req.params; // Se obtiene el perfil desde el body
    console.log(req);
    try {
        
        let menu = [];

        // Obtener módulos principales con permisos de visualización
        const modulosDistint = await Modulo.findAll({
            attributes: ["idPadre"],
            distinct: true,
            include: [
                {
                    model: Permiso,
                    as: "permisos",
                    where: { ver: 1, idPerfil:idPerfil },
                    attributes: []
                }
            ],
            where: { eliminado: 0, estado: 1 },
            order: [["idPadre", "ASC"]]
        });
        console.log('consulta: ', JSON.stringify(modulosDistint, null, 2));

        if (modulosDistint.length === 0) {
            return res.status(200).json({
                mensaje: "No hay módulos disponibles",
                datos: []
            });
        }

        const whereIn = modulosDistint.map((modulo) => modulo.idPadre);

        // Obtener información de los módulos principales
        const infoModulos = await Modulo.findAll({
            where: { _id: whereIn }
        });

        for (const infoModulo of infoModulos) {
            // Obtener módulos internos
            const modulosInternos = await Modulo.findAll({
                attributes: [
                    "_id",
                    "idPadre",
                    "nombreModulo",
                    "urlModulo",
                    "iconoModulo",
                    "eliminado",
                    "estado",
                    "esPadre"
                ],
                include: [
                    {
                        model: Permiso,
                        as: "permisos",
                        where: { idPerfil: idPerfil, ver: 1 },
                        attributes: []
                    }
                ],
                where: {
                    idPadre: infoModulo._id,
                    estado: 1,
                    eliminado: 0
                },
                order: [["orden", "ASC"]]
            });

            menu.push({
                id: infoModulo._id,
                padre: infoModulo.nombreModulo,
                opciones: modulosInternos
            });
        }

        return res.status(200).json({
            mensaje: "Menú principal",
            datos: menu
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: `Error al consultar los módulos: ${error.message}`,
            datos: []
        });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const resultado = await Modulo.create(data);

        return res.status(201).json({
            mensaje: "Módulo insertado de manera correcta",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "No se ha podido insertar el módulo.",
            error: error.message
        });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const resultado = await Modulo.update(data, { where: { _id: id } });

        if (resultado[0] > 0) {
            return res.status(200).json({
                mensaje: "Módulo actualizado de manera correcta",
                datos: resultado
            });
        } else {
            return res.status(200).json({
                mensaje: "El módulo no se ha podido actualizar",
                datos: resultado
            });
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: "No se ha podido actualizar el módulo",
            error: error.message
        });
    }
};

exports.borrar = async (req, res) => {
    const { id } = req.body; // Se obtiene el ID del módulo desde el body

    try {
        const modulo = await Modulo.findByPk(id);

        if (!modulo) {
            return res.status(404).json({
                mensaje: "El id del módulo no está en la base de datos, por favor verifique",
                datos: []
            });
        }

        modulo.eliminado = 1;
        modulo.estado = 0;
        const resultado = await modulo.save();

        if (resultado) {
            return res.status(200).json({
                mensaje: "El módulo se ha eliminado correctamente.",
                datos: [1]
            });
        } else {
            return res.status(500).json({
                mensaje: "No se ha podido eliminar el módulo.",
                datos: [0]
            });
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error interno al intentar eliminar el módulo.",
            error: error.message
        });
    }
};
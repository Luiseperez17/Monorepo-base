const Modelo = require("../models/asignarConteoModel");
const { Op } = require("sequelize"); // Importar operadores de Sequelize
const ModelDifConteo = require("../models/difConteosModel");
const ModelDifConteoSap = require("../models/difConteoSapModel");


// funcion para obtener los modulos principales
exports.listar = async (req, res) => {
    try {
        const resultado = await Modelo.findAll({});

        return res.status(200).json({
            mensaje: "Datos consultados",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los datos",
            datos: [],
            error: error.message
        });
    }
};

exports.mostrar = async (req, res) => {
    const { id } = req.params; // Obtener el ID desde los parámetros de la URL

    try {
        const resultado = await Modelo.findAll({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            mensaje: "Datos consultados",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los datos",
            datos: [],
            error: error.message
        });
    }
};


exports.crear = async (req, res) => {
    try {
        const data = req.body;
        const resultado = await Modelo.create(data);

        return res.status(201).json({
            mensaje: "Registro insertado de manera correcta",
            datos: resultado
        });
    } catch (error) {
        console.error("Error al insertar el registro:", error); // Registrar el error completo en la consola
        return res.status(500).json({
            mensaje: "No se ha podido insertar el registro.",
            error: error.message // Devolver solo el mensaje del error al cliente
        });
    }
};

exports.actualizar = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const resultado = await Modelo.update(data, { where: { id: id } });

        if (resultado[0] > 0) {
            return res.status(200).json({
                mensaje: "Registro actualizado de manera correcta",
                datos: resultado
            });
        } else {
            return res.status(200).json({
                mensaje: "El registro no se ha podido actualizar",
                datos: resultado
            });
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: "No se ha podido actualizar el registro",
            error: error.message
        });
    }
};

exports.finalizarConteo = async (req, res) => {
    const { id } = req.params;
    const data = {
        estado_conteo: 2, // Cambiar el estado a 2 (finalizado)
        fecha_finaliza_conteo: new Date() // Asignar fecha de finalizado
    }; 

    try {
        const resultado = await Modelo.update(data, { where: { id: id } });

        if (resultado[0] > 0) {
            return res.status(200).json({
                estado: 'ok',
                mensaje: "Registro actualizado de manera correcta",
                datos: resultado
            });
        } else {
            return res.status(200).json({
                estado: 'error',
                mensaje: "El registro no se ha podido actualizar",
                datos: resultado
            });
        }
    } catch (error) {
        return res.status(500).json({
            estado: 'error',
            mensaje: "No se ha podido actualizar el registro",
            error: error.message
        });
    }
};

exports.borrar = async (req, res) => {
    const { id } = req.params; // Se obtiene el ID del registro desde la URL

    try {
        // Buscar el registro por ID
        const registro = await Modelo.findByPk(id);

        if (!registro) {
            return res.status(404).json({
                mensaje: "El id del registro no está en la base de datos, por favor verifique.",
                datos: []
            });
        }

        // Realizar el borrado lógico
        await registro.destroy();

        return res.status(200).json({
            mensaje: "El registro se ha eliminado correctamente.",
            datos: [1]
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error interno al intentar eliminar el registro.",
            error: error.message
        });
    }
};

exports.conteosUsuario = async (req, res) => {
    const { idUser } = req.params; // Obtener el ID desde los parámetros de la URL

    try {
        const resultado = await Modelo.findAll({
            where: {
                id_usuario_asignado: idUser,
                numero_conteo: { [Op.lt]: 3 }, // solo se consideran conteos 1 y 2
                estado_conteo: {[Op.lt]: 2} // se omiten conteos finalizados
            }
        });

        return res.status(200).json({
            mensaje: "Datos consultados",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los datos",
            datos: [],
            error: error.message
        });
    }
};

exports.conteosUsuarioVencidos = async (req, res) => {
    const { idUser } = req.params; // Obtener el ID desde los parámetros de la URL

    try {
        const resultado = await Modelo.findAll({
            where: {
                id_usuario_asignado: idUser,
                numero_conteo: 4,
                estado_conteo: {[Op.lt]: 2} // se omiten conteos finalizados ( < 2)
            }
        });

        return res.status(200).json({
            mensaje: "Datos consultados",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los datos",
            datos: [],
            error: error.message
        });
    }
};

// funcion que devuelve lista de diferencias de conteo por bodega (para asignar conteo 3)
exports.difConteosBodega = async (req, res) => {
    const { idBodega } = req.params; // Obtener el ID desde los parámetros de la URL

    try {
        const resultado = await ModelDifConteo.findAll({
            attributes: ['id', 'codigo_sap', 'descripcion_articulo'],
            where: {
                codigo_bodega: idBodega
            }
        });

        return res.status(200).json({
            mensaje: "Datos consultados",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los datos",
            datos: [],
            error: error.message
        });
    }
}

// funcion que devuelve lista de diferencias entre conteo y sap, por bodega (para asignar conteo diferencia sap)
exports.difSapConteosBodega = async (req, res) => {
    const { idBodega } = req.params; // Obtener el ID desde los parámetros de la URL

    try {
        const resultado = await ModelDifConteoSap.findAll({
            attributes: ['id', 'codigo_sap', 'descripcion_articulo'],
            where: {
                codigo_bodega: idBodega
            }
        });

        return res.status(200).json({
            mensaje: "Datos consultados",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los datos",
            datos: [],
            error: error.message
        });
    }
}
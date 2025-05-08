const Modelo = require("../models/bodegasModel");

// funcion para obtener el listado completo
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
        return res.status(500).json({
            mensaje: "No se ha podido insertar el registro.",
            error: error.message
        });
    }
};

exports.actualizar = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const resultado = await Modelo.update(data, { where: { _id: id } });

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

exports.borrar = async (req, res) => {
    const { id } = req.body; // Se obtiene el ID del registro desde el body

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
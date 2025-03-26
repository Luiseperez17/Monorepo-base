const Perfil = require("../models/perfilModel");

// Funcion para mostrar perfiles activos
exports.index = async (req, res) => {
    try {
        const datos = await Perfil.findAll({
            where: { in_estado: 1 } // Filtrar por estado activo
        });

        return res.status(200).json({
            mensaje: "Lista de perfiles",
            datos
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: `Error al obtener los perfiles: ${error.message}`,
            datos: []
        });
    }
};

// funcion para mostrar perfil de acuerdo al ID
exports.show = async (req, res) => {
    const { idPerfil } = req.params; // Obtener el ID de la URL

    try {
        const resultado = await Perfil.findByPk(idPerfil);

        if (!resultado) {
            return res.status(404).json({
                mensaje: "El perfil no está en la base de datos. Por favor verifique",
                datos: []
            });
        }

        return res.status(200).json({
            mensaje: "Información del perfil",
            datos: resultado
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: `Error al obtener el perfil: ${error.message}`,
            datos: []
        });
    }
};

// Funcion para crear un perfil
exports.create = async (req, res) => {
    try {
        const perfil = await Perfil.create(req.body); // Crear el perfil con los datos del request
        return res.status(201).json({
            mensaje: "Perfil creado exitosamente",
            perfil
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: `Error al crear el perfil: ${error.message}`,
            datos: []
        });
    }
};

exports.update = async (req, res) => {
    const { idPerfil } = req.params;
    const { in_estado, tx_descripcion } = req.body;

    try {
        // Buscar el perfil por ID
        const perfil = await Perfil.findByPk(idPerfil);

        if (!perfil) {
            return res.status(404).json({
                mensaje: "El perfil con el ID especificado no fue encontrado en la base de datos.",
                datos: []
            });
        }

        // Actualizar los campos necesarios
        perfil.in_estado = in_estado;
        perfil.tx_descripcion = tx_descripcion;

        // Guardar los cambios
        await perfil.save();

        return res.status(200).json({
            mensaje: "El perfil se ha actualizado correctamente.",
            datos: perfil
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: `No se ha podido actualizar el perfil: ${error.message}`,
            datos: []
        });
    }
};

exports.borrar = async (req, res) => {
    const { id_perfil } = req.body; // Se obtiene el ID del perfil desde el cuerpo de la solicitud

    try {
        // Buscar el perfil por ID
        const perfil = await Perfil.findByPk(id_perfil);

        if (!perfil) {
            return res.status(404).json({
                mensaje: "El ID de perfil no está en la base de datos, por favor verifique.",
                datos: []
            });
        }

        // Marcar el perfil como inactivo en lugar de eliminarlo físicamente
        perfil.in_estado = 2;

        // Guardar los cambios
        await perfil.save();

        return res.status(200).json({
            mensaje: "El perfil se ha inactivado correctamente.",
            datos: []
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: `No se ha podido inactivar el perfil: ${error.message}`,
            datos: []
        });
    }
};
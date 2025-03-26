const Usuario = require("../models/usuarioModel");

// Obtener todos los usuarios activos
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: { in_estado: 1 },
    });

    res.json({
      mensaje: "Lista de usuarios activos",
      datos: usuarios,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error });
  }
};

// obtener los datos de un usuario por id 
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const usuario = await Usuario.findOne({
            where: { id_usuario: idUsuario, in_estado: 1 }
        });

        if (!usuario) {
            return res.status(404).json({
                mensaje: "El usuario no está en la base de datos. Por favor verifique",
                datos: []
            });
        }

        res.json({
            mensaje: "Información del usuario",
            datos: usuario
        });

    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
};


exports.confirmarUsuario = async (req, res) => {
    try {
        const { correo } = req.body;

        if (!correo) {
            return res.status(400).json({
                mensaje: "No se envió correo",
                data: [],
                continuar: 0
            });
        }

        const usuario = await Usuario.findOne({
            where: { tx_correo: correo }
        });

        if (!usuario) {
            return res.status(404).json({
                mensaje: "No existe usuario con este correo",
                data: [],
                continuar: 0
            });
        }

        res.json({
            mensaje: "Usuario encontrado exitosamente",
            data: {
                id_usuario: usuario.id_usuario,
                tx_correo: usuario.tx_correo
            },
            continuar: 1
        });

    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
};

exports.actualizarContrasena = async (req, res) => {
    try {
        const { id } = req.params;
        const { tx_clave, primera_vez } = req.body;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "El usuario no se ha encontrado.",
                datos: []
            });
        }

        usuario.tx_clave = tx_clave;
        usuario.primera_vez = primera_vez;

        const resultado = await usuario.save();

        if (resultado) {
            res.json({
                mensaje: "La contraseña se ha actualizado correctamente.",
                datos: [1]
            });
        } else {
            res.status(500).json({
                mensaje: "No se ha podido actualizar la contraseña.",
                datos: [0]
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor.",
            error: error.message
        });
    }
};

exports.create = async (req, res) => {
    try {
        const user = await Usuario.create(req.body);
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear el usuario.",
            error: error.message
        });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await usuario.update(req.body);
        res.status(200).json({ usuario });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el usuario.",
            error: error.message
        });
    }
};

exports.borrar = async (req, res) => {
    const { id_usuario } = req.body; // Se obtiene el ID desde el body

    try {
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({
                mensaje: "El id de usuario no está en la base de datos, por favor verifique",
                datos: []
            });
        }

        usuario.in_estado = 3; // Inactivar el usuario
        const resultado = await usuario.save();

        if (resultado) {
            return res.status(200).json({
                mensaje: "El usuario se ha inactivado correctamente.",
                datos: [1]
            });
        } else {
            return res.status(500).json({
                mensaje: "No se ha podido inactivar el usuario.",
                datos: [0]
            });
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error interno al intentar inactivar el usuario.",
            error: error.message
        });
    }
};
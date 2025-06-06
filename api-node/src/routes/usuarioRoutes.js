const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuarioController");

// Endpoints para usuarios 
router.get("/usuarios", UsuarioController.obtenerUsuarios);
router.get("/usuarios/:idUsuario", UsuarioController.obtenerUsuarioPorId);
router.post("/usuarios/confirmacion", UsuarioController.confirmarUsuario);
router.post("/usuarios/contrasena/:id", UsuarioController.actualizarContrasena);
router.post("/usuarios", UsuarioController.create);
router.put("/usuarios/:id", UsuarioController.update);
router.delete("/usuarios", UsuarioController.borrar);

module.exports = router;

const express = require("express");
const router = express.Router();
const permisoController = require("../controllers/permisoController");


//Endpoints para permisos
router.get("/permisos/:idModulo/:idPerfil", permisoController.get);
router.get("/permisos/getpermisos/:idModulo/:idPerfil", permisoController.getPermisos);
router.get("/permisos/:idPerfil", permisoController.consultarPermisos);
router.post("/permisos", permisoController.create);


module.exports = router;

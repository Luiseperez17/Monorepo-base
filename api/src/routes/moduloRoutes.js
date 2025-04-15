const express = require("express");
const router = express.Router();
const moduloController = require("../controllers/moduloController");


//Endpoints para modulos
router.get("/modulos",moduloController.getModulos);
router.get("/modulos/:id",moduloController.getSubModulos);
router.get("/modulos/menu/:idPerfil",moduloController.getMenu);
router.post("/modulos",moduloController.create);
router.put("/modulos/:id",moduloController.update);
router.delete("/modulos",moduloController.borrar);


module.exports = router;

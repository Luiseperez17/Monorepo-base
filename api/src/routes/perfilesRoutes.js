const express = require("express");
const router = express.Router();
const perfilController = require("../controllers/perfilController");


//Endpoints para perfiles
router.get("/perfiles",perfilController.index);
router.get("/perfiles/:idPerfil",perfilController.show);
router.post("/perfiles",perfilController.create);
router.put("/perfiles/:idPerfil",perfilController.update);
router.delete("/perfiles",perfilController.borrar);


module.exports = router;

const express = require("express");
const servicelayerRoutes = require("./serviceLayerRouter");
const usuarioRoutes = require("./usuarioRoutes");
const moduloRoutes = require("./moduloRoutes");
const perfilRoutes = require("./perfilesRoutes");
const permisoRoutes = require("./permisosRoutes");
const userRoutes = require("./user");

const router = express.Router();

router.use("/", servicelayerRoutes);
router.use("/", usuarioRoutes);
router.use("/", moduloRoutes);
router.use("/", perfilRoutes);
router.use("/", permisoRoutes);
router.use("/", userRoutes);

module.exports = router;

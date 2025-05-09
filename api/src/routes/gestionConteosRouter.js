const express = require("express");
const router = express.Router();
const asignarConteoController = require("../controllers/asignarConteoController");
const bodegasController = require("../controllers/bodegasController");
const conteosController = require("../controllers/conteosController");


//Endpoints para asignación de conteo
router.get("/asignar-conteo/list",asignarConteoController.listar);
router.get("/asignar-conteo/show/:id",asignarConteoController.mostrar);
router.post("/asignar-conteo/create/",asignarConteoController.crear);
router.put("/asignar-conteo/update/:id",asignarConteoController.actualizar);
router.delete("/asignar-conteo/delete/:id",asignarConteoController.borrar);
router.get("/asignar-conteo/asignados/:idUser",asignarConteoController.conteosUsuario);
router.get("/asignar-conteo/asignados-vencidos/:idUser",asignarConteoController.conteosUsuarioVencidos);
router.get("/asignar-conteo/dif/:idBodega",asignarConteoController.difConteosBodega);
router.get("/asignar-conteo/dif-sap/:idBodega",asignarConteoController.difSapConteosBodega);

//Endpoints para gestion de bodegas
router.get("/bodegas/list",bodegasController.listar);
router.get("/bodegas/show/:id",bodegasController.mostrar);
router.post("/bodegas/create/",bodegasController.crear);
router.put("/bodegas/update/:id",bodegasController.actualizar);
router.delete("/bodegas/delete/:id",bodegasController.borrar);

//Endpoints para gestion de conteos
router.get("/conteos/list",conteosController.listar);
router.get("/conteos/show/:id",conteosController.mostrar);
router.post("/conteos/create/",conteosController.crear);
router.put("/conteos/update/:id",conteosController.actualizar);
router.delete("/conteos/delete/:id",conteosController.borrar);
router.get("/conteos/linea/:idConteo",conteosController.getLineaConteo);
router.get("/conteos/articulo/:idConteo/:codigoBarras",conteosController.getArticulo);
router.get("/conteos/tercer-conteo/:idBodega/:idUsuario",conteosController.difConteosBodega);
router.get("/conteos/dif-sap/:idBodega/:idUsuario",conteosController.difConteosBodegaSAP);


module.exports = router;

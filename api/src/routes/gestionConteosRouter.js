const express = require("express");
const router = express.Router();
const asignarConteoController = require("../controllers/asignarConteoController");
const bodegasController = require("../controllers/bodegasController");
const conteosController = require("../controllers/conteosController");
const informesController = require("../controllers/informesController");


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
router.get("/asignar-conteo/finalizar/:id",asignarConteoController.finalizarConteo);

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
router.get("/conteos/articulo/lote/:bodega/:numConteo/:codigoSap/:lote",conteosController.getConteosArticuloLote);
router.get("/conteos/tercer-conteo/:idBodega/:idUsuario",conteosController.difConteosBodega);
router.get("/conteos/dif-sap/:idBodega/:idUsuario",conteosController.difConteosBodegaSAP);


//Endpoints para gestion de informes de conteos 
router.get("/informes/comparar/:bodega/:conteo1/:conteo2",informesController.compararConteos);
router.get("/informes/comparar-sap/:bodega/:conteo",informesController.compararConteosSap);
router.get("/informes/tercer-conteo/:bodega",informesController.generarTercerConteo);
router.get("/informes/get-tercer-conteo/:bodega",informesController.consultarTercerConteo);
router.get("/informes/diferencias-sap/:bodega/:conteo",informesController.generarDiferenciasSap);
router.get("/informes/get-diferencias-sap/:bodega/:conteo",informesController.consultarDiferenciasSap);


// router.get("/informes/pruebas/:tabla",informesController.truncarTabla);

module.exports = router;

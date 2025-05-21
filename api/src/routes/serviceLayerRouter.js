const express = require('express');
const router = express.Router();
const serviceLayerController = require('../controllers/serviceLayerController');

// Ruta para obtener los lotes filtrados por código de producto y tienda
router.get('/sl/lotesAll', serviceLayerController.getLotesAll);
router.get('/sl/lotesFiltro/:codigoProducto/:tiendaId', serviceLayerController.getLotesProductoTienda);

// Rutas para bodegas 
router.get('/sl/bodegasAll', serviceLayerController.getBodegasAll);

// Rutas para productos 
router.get('/sl/productosAll', serviceLayerController.getProductosAll);

// consultar todos los codigos de barras 
router.get('/sl/codigosBarrasAll', serviceLayerController.getCodigosBarrasAll);

// consultar las existencias por bodega
router.get('/sl/existenciasBodega/:codigoBodega', serviceLayerController.getExistenciasBodega);


// route para pruebas 
router.get("/sl/pruebas",serviceLayerController.pruebas);

module.exports = router;
const express = require('express');
const router = express.Router();
const serviceLayerController = require('../controllers/serviceLayerController');

// Ruta para obtener los lotes filtrados por código de producto y tienda
router.get('/lotesAll', serviceLayerController.getAllLotes);
router.get('/lotesFiltro/:codigoProducto/:tiendaId', serviceLayerController.getLotesProductoTienda);

// Rutas para bodegas 
router.get('/bodegasAll', serviceLayerController.getBodegasAll);

// Rutas para productos 
router.get('/productosAll', serviceLayerController.getProductosAll);


module.exports = router;
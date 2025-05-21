const slService = require('../services/slService');


const getLotesAll = async (req, res) => {

    try {
        const datos = await slService.getLotesAll();
        return res.status(200).json({
            estado: 'ok',
            mensaje: 'Lotes consultados correctamente',
            datos: datos
        });
    } catch (error) {
        return res.status(500).json({
            estado: 'error',
            message: 'Error al consultar los lotes',
            error: error.message
        });
    }
};
const getLotesProductoTienda = async (req, res) => {
    const { codigoProducto, tiendaId } = req.params;

    try {
        const datos = await slService.getLotesByProductoAndTienda(codigoProducto, tiendaId);
        return res.status(200).json({
            estado: 'ok',
            mensaje: 'Lotes consultados correctamente',
            datos: datos
        });
    } catch (error) {
        return res.status(500).json({
            estado: 'error',
            message: 'Error al consultar los lotes del producto',
            error: error.message
        });
    }
};

const getBodegasAll = async (req, res) => {

    try {
        const datos = await slService.getBodegasAll();
        return res.status(200).json({
            estado: 'ok',
            mensaje: 'Lotes consultados correctamente',
            datos: datos
        });
    } catch (error) {
        return res.status(500).json({
            estado: 'error',
            message: 'Error al consultar las bodegas',
            error: error.message
        });
    }
};

const getProductosAll = async (req, res) => {

    try {
        const datos = await slService.getProductosAll();
        res.status(200).json({
            estado: 'ok',
            mensaje: 'Productos consultados correctamente',
            datos: datos
        });
    } catch (error) {
        res.status(500).json({
            estado: 'error',
            message: 'Error al consultar las bodegas',
            error: error.message
        });
    }
};

// consultar todos los codigos de barras 
const getCodigosBarrasAll = async (req, res) => {
    try {
        const datos = await slService.getCodigosBarrasAll();
        res.status(200).json({
            estado: 'ok',
            mensaje: 'Codigos de barras consultados correctamente',
            datos: datos
        });
    } catch (error) {
        res.status(500).json({
            estado: 'error',
            message: 'Error al consultar los codigos de barras',
            error: error.message
        });
    }
};

// consultar las existencias por bodega
const getExistenciasBodega = async (req, res) => {

    const { codigoBodega } = req.params;

    try {
        const datos = await slService.getAllProductosPorBodega(codigoBodega);
        res.status(200).json({
            estado: 'ok',
            mensaje: 'Existencias consultadas correctamente',
            datos: datos
        });
    } catch (error) {
        res.status(500).json({
            estado: 'error',
            message: 'Error al consultar las existencias',
            error: error.message
        });
    }
};


// funcion para pruebas
const pruebas = async (req, res) => {

    try {
        const datos = await slService.getExistenciasTangaraPorBodega();
        res.status(200).json({
            estado: 'ok',
            mensaje: 'Query consultadas correctamente',
            datos: datos
        });
    } catch (error) {
        res.status(500).json({
            estado: 'error',
            message: 'Error al consultar el query',
            error: error.message
        });
    }
};

module.exports = {
    getLotesAll,
    getLotesProductoTienda,
    getBodegasAll,
    getProductosAll,
    getCodigosBarrasAll,
    getExistenciasBodega,
    pruebas
};

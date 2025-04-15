const slService = require('../services/slService');


const getAllLotes = async (req, res) => {

    try {
        const lote = await slService.getAll();
        res.status(200).json(lote);
    } catch (error) {
        res.status(500).json({
        message: 'Error al consultar los lotes',
        error: error.message
        });
    }
};
const getLotesProductoTienda = async (req, res) => {
    const { codigoProducto, tiendaId } = req.params;

    try {
        const lotes = await slService.getLotesByProductoAndTienda(codigoProducto, tiendaId);
        res.status(200).json(lotes);
    } catch (error) {
        res.status(500).json({
        message: 'Error al consultar los lotes del producto',
        error: error.message
        });
    }
};

const getBodegasAll = async (req, res) => {

    try {
        const lotes = await slService.getBodegasAll();
        res.status(200).json(lotes);
    } catch (error) {
        res.status(500).json({
        message: 'Error al consultar las bodegas',
        error: error.message
        });
    }
};

const getProductosAll = async (req, res) => {

    try {
        const lotes = await slService.getProductosAll();
        res.status(200).json(lotes);
    } catch (error) {
        res.status(500).json({
        message: 'Error al consultar las bodegas',
        error: error.message
        });
    }
};

module.exports = {
    getAllLotes,
    getLotesProductoTienda,
    getBodegasAll,
    getProductosAll
};

const conteoModel = require("../models/conteosModel");
const Usuario = require("../models/usuarioModel");
const { Op } = require("sequelize"); // Importar operadores de Sequelize
const codBarrasModel = require("../models/codBarrasModel");
const articuloModel = require("../models/articuloModel");
const lotesModel = require("../models/lotesModel");
const existenciasSapModel = require("../models/existenciasSapModel");
const conteoAsignadoModel = require("../models/asignarConteoModel");
const ModelDifConteo = require("../models/difConteosModel");
const ModelDifConteoSap = require("../models/difConteoSapModel");

// funcion para obtener el listado completo
exports.listar = async (req, res) => {
    try {
        const resultado = await conteoModel.findAll({});

        return res.status(200).json({
            mensaje: "Datos consultados",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los datos",
            datos: [],
            error: error.message
        });
    }
};

exports.mostrar = async (req, res) => {
    const { id } = req.params; // Obtener el ID desde los parámetros de la URL

    try {
        const resultado = await conteoModel.findAll({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            mensaje: "Datos consultados",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los datos",
            datos: [],
            error: error.message
        });
    }
};


exports.crear = async (req, res) => {
    try {
        const data = req.body;
        const resultado = await conteoModel.create(data);

        return res.status(201).json({
            estado: 'ok',
            mensaje: "Registro insertado de manera correcta",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            estado: 'error',
            mensaje: "No se ha podido insertar el registro.",
            error: error.message
        });
    }
};

exports.actualizar = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const resultado = await conteoModel.update(data, { where: { id: id } });

        if (resultado[0] > 0) {
            return res.status(200).json({
                estado: 'ok',
                mensaje: "Registro actualizado de manera correcta",
                datos: resultado
            });
        } else {
            return res.status(200).json({
                estado: 'error',
                mensaje: "El registro no se ha podido actualizar",
                datos: resultado
            });
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: "No se ha podido actualizar el registro",
            error: error.message
        });
    }
};

exports.borrar = async (req, res) => {
    const { id } = req.body; // Se obtiene el ID del registro desde el body

    try {
        // Buscar el registro por ID
        const registro = await conteoModel.findByPk(id);

        if (!registro) {
            return res.status(404).json({
                mensaje: "El id del registro no está en la base de datos, por favor verifique.",
                datos: []
            });
        }

        // Realizar el borrado lógico
        await registro.destroy();

        return res.status(200).json({
            estado: 'ok',
            mensaje: "El registro se ha eliminado correctamente.",
            datos: [1]
        });
    } catch (error) {
        return res.status(500).json({
            estado: 'error',
            mensaje: "Error interno al intentar eliminar el registro.",
            error: error.message
        });
    }
};

// funcion para comparar conteos seleccionados
exports.compararConteos = async (req, res) => {

    const { bodega, conteo1, conteo2 } = req.params; // Obtener los parámetros de la URL

    try {

        // Obtener los artículos y lotes de los conteos seleccionados
        // Realizar la consulta personalizada usando sequelize.query
        const query = `
            SELECT 
                c1.numero_conteo AS numconteo1, 
                c2.numero_conteo AS numconteo2, 
                c1.codigo_bodega, 
                c1.codigo_barras, 
                c1.codigo_sap, 
                c1.descripcion_articulo,
                c1.lote_articulo, 
                SUM(c1.cantidad_contada) AS cantidad1, 
                SUM(c2.cantidad_contada) AS cantidad2,
                (SUM(c1.cantidad_contada) - SUM(c2.cantidad_contada)) AS diferencia,
                IF(c2.cantidad_contada IS NOT NULL, 'si', 'no') AS contado
            FROM app_conteo AS c1
            LEFT JOIN app_conteo AS c2 
                ON c1.codigo_bodega = c2.codigo_bodega 
                AND c1.codigo_sap = c2.codigo_sap 
                AND c1.lote_articulo = c2.lote_articulo 
                AND c2.numero_conteo = :conteo2
            WHERE c1.codigo_bodega = :bodega AND c1.numero_conteo = :conteo1
            GROUP BY codigo_bodega, codigo_sap, lote_articulo
            ORDER BY codigo_sap limit 100
        `;

        const conteos = await conteoModel.sequelize.query(query, {
            replacements: { bodega, conteo1, conteo2 },
            type: conteoModel.sequelize.QueryTypes.SELECT
        });

        if (conteos.length === 0) {
            return res.status(404).json({
                estado: 'error',
                mensaje: "No se encontraron artículos para los conteos seleccionados.",
                datos: []
            });
        }

        return res.status(200).json({
            estado: 'ok',
            mensaje: "Informe generado correctamente",
            datos: conteos
        });
    } catch (error) {
        return res.status(500).json({
            estado: 'error',
            mensaje: "Error al generar el informe",
            error: error.message
        });
    }
}




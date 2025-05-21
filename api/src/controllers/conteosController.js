const Modelo = require("../models/conteosModel");
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
        const resultado = await Modelo.findAll({});

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
        const resultado = await Modelo.findAll({
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
        const resultado = await Modelo.create(data);

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
        const resultado = await Modelo.update(data, { where: { id: id } });

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
        const registro = await Modelo.findByPk(id);

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

exports.getLineaConteo = async (req, res) => {
    const { idConteo } = req.params; // Obtener el ID desde los parámetros de la URL

    try {
        const resultado = await Modelo.count({
            where: {
                id_conteo: idConteo
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

exports.getArticulo = async (req, res) => {
    const { idConteo, codigoBarras } = req.params; // Obtener el ID desde los parámetros de la URL

    try {

        // primero vamos a consultar el conteo asignado para obtener la bodega
        const conteoAsignado = await conteoAsignadoModel.findByPk(idConteo);

        // luego debemos obtener el codigo sap del articulo 
        let codigo_sap = await getCodSap(codigoBarras);
        if (codigo_sap === null) {
            return res.status(404).json({
                mensaje: "El código de barras no existe",
                datos: []
            });
        }

        // ahora vamos a consultar la info del articulo 
        const articulo = await articuloModel.findAll({
            where: {
                codigo_sap: codigo_sap
            }
        });

        let articuloPlano = articulo[0].get({ plain: true });

        // ahora vamos a consultar los lotes del articulo (solo si maneja lote) 
        if (articulo[0]['maneja_lote'] === 'Y') {
            let fechaActual = new Date();
            // restar 4 años a la fecha actual 
            let fechaMenos4anios = fechaActual.setFullYear(fechaActual.getFullYear() - 4);

            const lotes = await existenciasSapModel.findAll({
                attributes: ['codigo_bodega', 'codigo_sap', 'lote_articulo', 'fecha_vence', 'stock'],
                where: {
                    codigo_sap: codigo_sap,
                    codigo_bodega: conteoAsignado.codigo_bodega
                },
                order: [['stock', 'DESC'],['lote_articulo', 'ASC']],
            });
            const lotesPlano = lotes.map((lote) => lote.get({ plain: true }));

            articuloPlano['lotes'] = lotesPlano;
            
        } else {

            articuloPlano['lotes'] = []; // si no maneja lote, asignamos un array vacio
            
        }

        // por ultimo vamos a si el articulo ya fue contado 
        // solo si no maneja lote, si no debemos esperar a que el usuario seleccione el lote 
        if (articulo[0]['maneja_lote'] === 'Y') {
            
            articuloPlano['conteos'] = []; // si maneja lote, no se consultan los conteos, se debe esperar a que el usuario seleccione el lote
        } else {

            const articuloContado = await Modelo.findAll({
                where: {
                    numero_conteo: conteoAsignado.numero_conteo,
                    codigo_bodega: conteoAsignado.codigo_bodega,
                    codigo_barras: codigoBarras
                },
                order: [['id', 'DESC']],
                include: [
                    {
                        model: Usuario,
                        as: 'usuarioAsignado', // Asegúrate que el alias coincida con la asociación definida en el modelo
                        attributes: ['tx_nombre']
                    }
                ]
            });

            articuloPlano['conteos'] = articuloContado.length > 0 ? articuloContado : [];
        }

        const resultado = await articuloPlano; // asignar el resultado a la variable resultado

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

getCodSap = async (codBarras) => { 
    try {
        const resultado = await codBarrasModel.findAll({
            attributes: ['codigo_sap'],
            where: {
            [Op.or]: [
                { codigo_barras: codBarras },
                { codigo_sap: codBarras }
            ]
            }
        });

        if (resultado.length === 0) {
            return null; // No se encontró el código de barras
        }

        return resultado[0]['codigo_sap'];
    } catch (error) {
        return null;
    }
}

exports.getConteosArticuloLote = async (req, res) => {
    const { bodega, numConteo, codigoSap, lote } = req.params; // Obtener el ID desde los parámetros de la URL

    try {

        // primero vamos a consultar si existen conteos para el articulo y lote
        const articuloContado = await Modelo.findAll({
            // attributes: ['usuarioAsignado.tx_nombre'],
            where: {
            codigo_bodega: bodega,
            numero_conteo: numConteo,
            codigo_sap: codigoSap,
            lote_articulo: lote
            },
            order: [['id', 'DESC']],
            include: [
                {
                    model: Usuario,
                    as: 'usuarioAsignado', // Asegúrate que el alias coincida con la asociación definida en el modelo
                    attributes: ['tx_nombre']
                }
            ]
        });

        const resultado = await articuloContado; // asignar el resultado a la variable resultado

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

// funcion que devuelve lista de diferencias de conteo por bodega y usuario para corregir
exports.difConteosBodega = async (req, res) => {
    const { idBodega, idUsuario } = req.params; // Obtener el ID desde los parámetros de la URL

    try {

        // primero vamos a consultar si el usuario tiene tercer conteo asignado
        const conteoAsignado = await conteoAsignadoModel.findOne({
            where: {
                id_usuario_asignado: idUsuario,
                codigo_bodega: idBodega,
                numero_conteo: 3,
                estado_conteo: 0,
            }

        });

        if (conteoAsignado) {

            let idArticuloInicial = await getIdDiferencia(conteoAsignado.articulo_inicial);
            let idArticuloFinal = await getIdDiferencia(conteoAsignado.articulo_final);

            const resultado = await ModelDifConteo.findAll({
                attributes: [
                    'id', 
                    'id_usuario_genera', 
                    'codigo_bodega', 
                    'numero_conteo', 
                    'codigo_barras', 
                    'codigo_sap', 
                    'descripcion_articulo',
                    'lote_articulo',
                    'fecha_vence',
                    'cantidad_conteo_1',
                    'cantidad_conteo_2',
                    'diferencia',
                    'cantidad_sap',
                    'cantidad_correccion',
                ],

                where: {
                    codigo_bodega: idBodega,
                    id: {
                        [Op.gte]: idArticuloInicial,
                        [Op.lte]: idArticuloFinal
                    }
                }
            });
    
            return res.status(200).json({
                estado: 'ok',
                mensaje: "Datos consultados",
                datos: resultado
            });
            
        } else {
            return res.status(200).json({
                estado: 'error',
                mensaje: "El usuario no tiene asignado un tercer conteo",
                datos: []
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los datos",
            datos: [],
            error: error.message
        });
    }
}

// retorna el id de la linea de diferencia segun el codigo sap 
getIdDiferencia = async (codigo_sap) => {
    
    try {
        const resultado = await ModelDifConteo.findAll({
            attributes: ['id'],
            where: {
                codigo_sap: codigo_sap
            }
        });

        if (resultado.length === 0) {
            return null; // No se encontró el código de barras
        }

        return resultado[0]['id'];
    } catch (error) {
        return null;
    }
}


// funcion que devuelve lista de diferencias de conteo por bodega y usuario para corregir
exports.difConteosBodegaSAP = async (req, res) => {
    const { idBodega, idUsuario } = req.params; // Obtener el ID desde los parámetros de la URL

    try {

        // primero vamos a consultar si el usuario tiene tercer conteo asignado
        const conteoAsignado = await conteoAsignadoModel.findOne({
            where: {
                id_usuario_asignado: idUsuario,
                codigo_bodega: idBodega,
                numero_conteo: 5,
                estado_conteo: 0,
            }

        });

        if (conteoAsignado) {

            let idArticuloInicial = await getIdDiferenciaSAP(conteoAsignado.articulo_inicial);
            let idArticuloFinal = await getIdDiferenciaSAP(conteoAsignado.articulo_final);

            const resultado = await ModelDifConteoSap.findAll({
                attributes: [
                    'id', 
                    'id_usuario_genera', 
                    'codigo_bodega', 
                    'numero_conteo', 
                    'codigo_barras', 
                    'codigo_sap', 
                    'descripcion_articulo',
                    'lote_articulo',
                    'fecha_vence',
                    'cantidad_sap',
                    'cantidad_conteo',
                    'diferencia',
                    'costo_articulo',
                    'costo_diferencia',
                    'cantidad_correccion',
                ],

                where: {
                    codigo_bodega: idBodega,
                    id: {
                        [Op.gte]: idArticuloInicial,
                        [Op.lte]: idArticuloFinal
                    }
                }
            });
    
            return res.status(200).json({
                mensaje: "Datos consultados",
                datos: resultado
            });
            
        } else {
            return res.status(200).json({
                mensaje: "El usuario no tiene asignado un tercer conteo",
                datos: []
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al consultar los datos",
            datos: [],
            error: error.message
        });
    }
}

// retorna el id de la linea de diferencia segun el codigo sap 
getIdDiferenciaSAP = async (codigo_sap) => {
    
    try {
        const resultado = await ModelDifConteoSap.findAll({
            attributes: ['id'],
            where: {
                codigo_sap: codigo_sap
            }
        });

        if (resultado.length === 0) {
            return null; // No se encontró el código de barras
        }

        return resultado[0]['id'];
    } catch (error) {
        return null;
    }
}

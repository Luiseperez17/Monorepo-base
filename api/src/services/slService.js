const axios = require('axios');
const https = require('https');

// SAP Service Layer Configuration
const SAP_BASE_URL = process.env.ENV === 'prod' ? process.env.RUTA_SAP : process.env.RUTA_SAP_DEV;
const SAP_USER = process.env.ENV === 'prod' ? process.env.USER_SAP : process.env.USER_SAP_DEV;
const SAP_PASSWORD = process.env.ENV === 'prod' ? process.env.CLAVE_SAP : process.env.CLAVE_SAP_DEV;
const SAP_COMPANY_DB = process.env.ENV === 'prod' ? process.env.COMPANYDB_SAP : process.env.COMPANYDB_SAP_DEV;
const VALIDAR_SSL  = process.env.ENV === 'prod' ? true : false; // Validar SSL en producción

const httpsAgent = new https.Agent({
    rejectUnauthorized: false // Ignorar certificados no válidos
});


// Function to login to SAP Service Layer
async function loginToServiceLayer() {
    try {
        const response = await axios.post(
            `${SAP_BASE_URL}/Login`, 
            {
                UserName: SAP_USER,
                Password: SAP_PASSWORD,
                CompanyDB: SAP_COMPANY_DB,
            },
            {
                httpsAgent: httpsAgent
            }
        );
        return response.data.SessionId;
    } catch (error) {
        console.error('Error logging in to SAP Service Layer:', error.message);
        throw error;
    }
}


async function getSap(endpoint, params = {}, prefer, pagination = false) {
    try {
        const sessionId = await loginToServiceLayer(); // invocar el login para obtener el sessionId
        console.log("ingresa a servicios get sap");
        const response = await axios.get(
            `${SAP_BASE_URL}${endpoint}`,
            {
                params: params,
                headers: {
                    'Cookie': `B1SESSION=${sessionId}`,
                    'Prefer': prefer // Prefer header for OData queries
                },
                httpsAgent: httpsAgent // Agregar el agente HTTPS aquí
            }
        );
        
        if (pagination) {
            return {
                value: response.data.value, 
                nextLink: response.data['odata.nextLink'] || null // Manejo de paginación
            };
        } else {
            return response.data.value; // Assuming the data is in the 'value' field
        }
        } catch (error) {
        console.error( error.response ? error.response.data : error.message);
        throw error;
        }
}

//consultar todos los lotes
async function getLotesAll() {
  try {
    console.log("getLotesAll");

    const endpoint  = 'BatchNumberDetails';
    const params    = {}; // No se necesitan parámetros para esta consulta (filtros)
    const prefer    = 'odata.maxpagesize=1000'; // No se necesita preferencia para esta consulta (filas por defecto)
    
    const response = await getSap(endpoint, params, prefer)
    return response;
  } catch (error) {
    console.error( error.response ? error.response.data : error.message);
    throw error;
  }
}

// Función para obtener lotes por código de producto y tienda
async function getLotesByProductoAndTienda(codigoProducto, tiendaId) {
  try {
    console.log("getLotesByProductoAndTienda");

    const endpoint  = 'BatchNumberDetails';
    const params    = {
        $filter: `ItemCode eq '${codigoProducto}' and WarehouseCode eq '${tiendaId}'`  // Filtro por código de producto y tienda
    };
    const prefer    = ''; // No se necesita preferencia para esta consulta (cantidad de filas por defecto)
    
    const response = await getSap(endpoint, params, prefer)
    return response;
  } catch (error) {
    console.error('Error al consultar los lotes:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para manejarlo en otro lugar
  }
}

// Función para obtener todas las bodegas
async function getBodegasAll() {
    try {
        console.log("getBodegasAll");
    
        const endpoint  = 'Warehouses';
        const params    = {
            $select: 'WarehouseCode,WarehouseName' // Seleccionar solo los campos necesarios
        };
        const prefer    = ''; // No se necesita preferencia para esta consulta (cantidad de filas por defecto)
        
        const response = await getSap(endpoint, params, prefer)
        return response;
    } catch (error) {
        console.error('Error al consultar las bodegas:', error.response ? error.response.data : error.message);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
  }

  // Función para obtener todos los productos existentes
async function getProductosAll() {
    try {
        console.log("getProductosAll");

        const endpoint = 'Items'; // Endpoint para obtener todos los productos
        let params    = {
            $select: 'ItemCode,ItemName,AvgStdPrice' // Seleccionar solo los campos necesarios
        };
        const prefer    = 'odata.maxpagesize=1000'; //cantidad de rigistros
        const pagination = true; // Habilitar paginación para obtener todos los productos
        let productos = []; // Lista para almacenar todos los productos
        let nextLink = null; // Variable para manejar la paginación
        // const response = await getSap(endpoint || endpoint, params, prefer);
        do {
            // Realiza la solicitud al endpoint
            const response = await getSap(nextLink || endpoint, params, prefer, pagination);

            // limpiamos params ya que en nextLink ya viene el endpoint con los filtros
            params = {};
            
            // Concatena los productos obtenidos en la respuesta
            productos = productos.concat(response.value);

            // Verifica si hay más páginas disponibles
            nextLink = response['nextLink'] ? response['nextLink'].replace() : null;
        } while (nextLink); // Continúa mientras haya un enlace a la siguiente página

        return productos; // Devuelve la lista completa de productos
        // return response; // Devuelve la lista completa de productos
    } catch (error) {
        console.error('Error al consultar todos los productos:', error.response ? error.response.data : error.message);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

// servicio para consultar los codigos de barras existentes en SAP 
async function getCodigosBarrasAll() {
    try {
        console.log("getCodigosBarrasAll");

        const endpoint = 'BarCodes'; // Endpoint para obtener todos los productos
        let params    = {
            $select: 'ItemNo,Barcode', // Seleccionar solo los campos necesarios
        };
        const prefer    = 'odata.maxpagesize=1000'; //cantidad de rigistros
        const pagination = true; // Habilitar paginación para obtener todos los productos
        let productos = []; // Lista para almacenar todos los productos
        let nextLink = null; // Variable para manejar la paginación
        // const response = await getSap(endpoint || endpoint, params, prefer);
        do {
            // Realiza la solicitud al endpoint
            const response = await getSap(nextLink || endpoint, params, prefer, pagination);

            // limpiamos params ya que en nextLink ya viene el endpoint con los filtros
            params = {};
            
            // Concatena los productos obtenidos en la respuesta
            productos = productos.concat(response.value);

            // Verifica si hay más páginas disponibles
            nextLink = response['nextLink'] ? response['nextLink'].replace() : null;
        } while (nextLink); // Continúa mientras haya un enlace a la siguiente página

        return productos; // Devuelve la lista completa de productos
        // return response; // Devuelve la lista completa de productos
    } catch (error) {
        console.error('Error al consultar todos los productos:', error.response ? error.response.data : error.message);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

// servicio para consultar las existencias de los productos en SAP por bodega 
async function getAllProductosPorBodega(warehouseCode) {
  try {
    const endpoint = '$crossjoin(Items,Items/ItemWarehouseInfoCollection)';
    const prefer = 'odata.maxpagesize=1000';
    
    let params = {
      $expand: 'Items($select=ItemCode,ItemName,BarCode),Items/ItemWarehouseInfoCollection($select=WarehouseCode,InStock,Committed,Ordered)',
      $filter: `Items/ItemCode eq Items/ItemWarehouseInfoCollection/ItemCode and ` +
               `Items/ItemWarehouseInfoCollection/WarehouseCode eq '${warehouseCode}'`
    };

    let productos = [];
    let nextLink = null;
    let pageCount = 0;
    const pagination = true; // Habilitar paginación para obtener todos los productos

    do {
        pageCount++;
        console.log(`Obteniendo página ${pageCount}...`);
        
        const response = await getSap(nextLink || endpoint, params, prefer, pagination);
        //   return response;

         // limpiamos params ya que en nextLink ya viene el endpoint con los filtros
        params = {};
        
        // Concatena los productos obtenidos en la respuesta
        productos = productos.concat(response.value);

        // Verifica si hay más páginas disponibles
        nextLink = response['nextLink'] ? response['nextLink'].replace() : null;

      
    } while (nextLink);

    console.log(`Obtenidos ${productos.length} productos de ${pageCount} páginas`);
    return productos;
    
  } catch (error) {
    console.error('Error en getAllProductosPorBodega:', {
      warehouseCode,
      error: error.response?.data || error.message
    });
    throw error;
  }
}


// servicio para consultar al API de Tangara, para traer las existencias de los productos por bodega
async function getExistenciasTangaraPorBodega(whsCode = 'BOD') {
  try {
    console.log("getExistenciasTangaraPorBodega");

    const url = 'http://147.93.45.148:5002/select';
    const auth = {
      username: 'Tangara',
      password: 'T4ng4r4D3vS4S'
    };
    const data = {
      script: `select top 1000 "ItemCode", "WhsCode", "BatchNum", "Quantity", "ExpDate" from SILVERAGRO.OIBT where "WhsCode" = '${whsCode}' order by "ItemCode" `,
      motor: "HANA"
    };

    const response = await axios.post(url, data, {
      auth: auth,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al consultar existencias en Tangara:', error.response ? error.response.data : error.message);
    throw error;
  }
}


// Exporta la función para que pueda ser utilizada en otros archivos
module.exports = {
    getLotesAll,
    getLotesByProductoAndTienda,
    getBodegasAll,
    getProductosAll,
    getCodigosBarrasAll,
    getAllProductosPorBodega,
    getExistenciasTangaraPorBodega
};
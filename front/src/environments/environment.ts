//ARCHIVO DE CONFIGURACIÓN PARA DESARROLLO
export const environment = {
  production: true,
  demo:false,
  // urlApi:'https://api.mts.xyroapps.com.co/api/',//API PARA PRODUCCIÓN DEMO
  urlApi:'http://127.0.0.1:8000/api/', // api para las pruebas de 145
  dbName:'baseLocal',//BASE DATOS PRODUCCIÓN
  dbVersion:1,//VERSIÓN BASE DATOS PRODUCCIÓN
  urlApiDemo:'http://127.0.0.1:8000/api/',//API PARA DEMO
  // urlApiDemo:'http://127.0.0.1:8000/api/',//API PARA DEMO LOCAL
  dbNameDemo:'baseLocal_DEMO',//BASE DATOS DEMO
  dbVersionDemo:1,//VERSIÓN BASE DATOS DEMO
  versionApp:'',//VERSIÓN DE LA APP
  llaveEncriptacion:'1dbc65c9-832d-11ee-b77e-002b67b4',//LLAVE PARA ENCRIPTAR LO QUE NECESITEMOS POR AES-256
  registros:10, //cantidad de registros en el buscador
  registrosModal:5, //se utiliza para el paginador del modal
  clientIdRappi: 'oTzZGGuuphl2XbAiq4MiP1yQmQrZ4jSS',
  clientSecret: 'BFbunyL1LFv7cgO7YeytPSZ9TCzX1YUBvVptsXFQS0L_stBTki63LPgrI9HG1nUz',
  // urlComprobantes: "https://api.mts.xyroapps.com.co/app/Assets/Pedidos/",
  urlComprobantes: "https://api145.mts.xyroapps.com.co/app/Assets/Pedidos/",
  tokenMensajeWhatsapp:"1dbc65c9-832d-11ee-b77e-002b67b5",
  // urlComprobantes: "https://demoapi.mts.xyroapps.com.co/app/Assets/Pedidos/"
  urlDemoPos:"https://demoapi.xyroposadmin.com/api/",
  urlPos:"https://api.xyroposadmin.com/api/",
  urlAppPedidosdemo:"https://demoapiapppetus.xyroapps.com.co/",
  urlAppPedidos:"https://apiapppetus.xyroapps.com.co/",
  tokenPedido:"b7t9yU4iO0pZ1aX5sD4fG8h7j6k5l4m3n2o1p9qW6rE4y",
  consultaSLD:"",
  consultaSLDemo:"http://localhost:3000/api/",
  versionAngular:"18.2.11",
  urlImagenes:'https://api145.mts.xyroapps.com.co/',
  urlImagenesdemo:'https://demoapi.mts.xyroapps.com.co/',
};
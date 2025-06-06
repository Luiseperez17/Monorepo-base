//ARCHIVO DE CONFIGURACIÓN PARA PRODUCCIÓN
export const environment = {
  production: true,
  demo:false,
  // urlApi:'https://api.mts.xyroapps.com.co/api/',//API PARA PRODUCCIÓN
  urlApi:'http://127.0.0.1:8000/api/',//API PARA PRODUCCIÓN pruebas 145
  dbName:'MTS_SILVERAGRO',//BASE DATOS PRODUCCIÓN
  dbVersion:2,//VERSIÓN BASE DATOS PRODUCCIÓN
  versionApp:'0.3.2',//VERSIÓN DE LA APP
  llaveEncriptacion:'1dbc65c9-832d-11ee-b77e-002b67b4',//LLAVE PARA ENCRIPTAR LO QUE NECESITEMOS POR AES-256
  registros:10, //cantidad de registros en el buscador
  registrosModal:5, //se utiliza para el paginador del modal
  versionAngular:"18.2.11",
};

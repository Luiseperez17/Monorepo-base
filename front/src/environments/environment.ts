//ARCHIVO DE CONFIGURACIÓN PARA DESARROLLO
export const environment = {
  production: true,
  demo:true,
  // urlApi:'https://api.mts.xyroapps.com.co/api/',//API PARA PRODUCCIÓN DEMO
  urlApi:'http://localhost:3000/api/',
  dbName:'baseLocal',//BASE DATOS indexDB
  dbVersion:1,//VERSIÓN BASE DATOS indexDB
  versionApp:'',//VERSIÓN DE LA APP
  llaveEncriptacion:'1dbc65c9-832d-11ee-b77e-002b67b4',//LLAVE PARA ENCRIPTAR LO QUE NECESITEMOS POR AES-256
  registros:10, //cantidad de registros en el buscador
  registrosModal:5, //se utiliza para el paginador del modal
  versionAngular:"18.2.11",
};

export interface Respuesta<T> {
  status: string;
  datos: T; // La propiedad 'datos' es un array de usuarios
}

export interface Usuario {
  id_usuario: number;
  tx_nombre: string;
}

export interface Bodega {
  id_codigo_bodega: string;
  tx_descrip_bodega: string;
}
  
export interface AsignaConteo {
  id: number;
  id_usuario_asignado: number;
  codigo_bodega: string;
  numero_conteo: number;
  estado_conteo: number;
  fecha_asignado: string;
  articulo_inicial: string;
  articulo_final: string;
  usuario_crea: number;
}
export interface Conteo  {
    id: number | null; // id (oculto)
    id_conteo: number | null; // Código Conteo (deshabilitado)
    linea_conteo: number; // linea de lectura del conteo
    numero_conteo: number; // Número Conteo
    codigo_bodega: string; // Bodega
    id_usuario_asignado: number; // Usuario Asignado al conteo
    codigo_barras: string; // Codigo de barras del Artículo
    codigo_sap: string; // Codigo SAP del artículo
    descripcion_articulo: string; // Descripcion Artículo
    lote_articulo: string; // Lote
    fecha_vence: string | Date; // Fecha Vencimiento
    cantidad_contada: number | null; // Cantidad contada
    correccion_conteo: number | null; // Fecha Vencimiento
    id_usuario_corrige: number | null; // Fecha Vencimiento
  };
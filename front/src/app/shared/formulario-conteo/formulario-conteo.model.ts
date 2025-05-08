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
    existencias_sap: number; // Cantidad en SAP
    primer_conteo: number | null; // Cantidad contada
    segundo_conteo: number | null; // Cantidad contada
    diff_pri_seg_conteo: number; // Diferencia entre primer y segundo conteo
    tercer_conteo: number | null; // Cantidad contada
    correccion_conteo: number | null; // Fecha Vencimiento
    id_usuario_corrige: number | null; // Fecha Vencimiento
  };
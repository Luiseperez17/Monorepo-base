CREATE VIEW informeDocumentos AS select 
`app_facturas`.*, `app_facturas`.`tx_estado` as 
`estadoFactura`, `T1`.`tx_nombre` as 
`nom_transportador`, `T2`.`tx_nombre` as 
`nom_despachador`, `T3`.`nombre_vehiculo` as 
`nom_vehiculo`, `D`.`tx_estado` as 
`nom_estado`, `D`.`tx_comprobante` as 
`nom_comprobante`, `T4`.`id_alistamiento`, `T4`.`tx_estado` as 
`estado_historial`, `T4`.`tx_observac`, `T4`.`fe_fechahora`, `T4`.`id_usuario` as 
`usuario_historial` 
from `app_facturas` 
left join `app_usuarios` as `T1` on `app_facturas`.`tx_transportador` = `T1`.`id_usuario` 
left join `app_usuarios` as `T2` on `app_facturas`.`tx_despachador` = `T2`.`id_usuario` 
left join `app_vehiculos` as `T3` on `app_facturas`.`tx_vehiculo` = `T3`.`id_vehiculo` 
left join `app_alistamiento_historial` as `T4` on `app_facturas`.`id_factura` = `T4`.`id_alistamiento` 
left join `app_despachos` as `D` on `app_facturas`.`in_docentry` = `D`.`in_docentry`
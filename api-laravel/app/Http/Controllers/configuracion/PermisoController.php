<?php

namespace App\Http\Controllers\configuracion;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;

use App\Models\configuracion\PermisoModel;
use App\Models\configuracion\PerfilModel;

use App\Http\Controllers\Controller;

class PermisoController extends Controller
{
    // Funcion para obtener permisos y acciones de acuerdo al modulo y el perfil
    public function get(Request $request) {
        try {
            $permisos = [];
            $perfiles = PerfilModel::where('in_estado', 1)->get();
            // var_dump($perfiles['tx_descripcion']);die();
            if ($perfiles->count() > 0) {
                foreach ($perfiles as $perfil) {
                    $dataLinea = [];
                    $query= PermisoModel::where('idPerfil', $perfil->id_perfil)
                                              ->where('idModulo', (int)$request->idModulo);
                                            //   $sql = $query->toSql(); echo $sql;
                                              $permisosPerfil = $query->get();
                    if ($permisosPerfil->count() == 0) {
                        $dataLinea = [
                            'idPerfil' => $perfil->id_perfil,
                            'idModulo' =>  $request->idModulo,
                            'nombrePerfil' => $perfil->tx_descripcion,
                            'ver' => 0,
                            'crear' => 0,
                            'editar' => 0,
                            'borrar' => 0
                        ];
                    } else {
                        $dataLinea = [
                            'idPerfil' => $perfil->id_perfil,
                            'nombrePerfil' => $perfil->tx_descripcion,
                            'idModulo' =>  $request->idModulo,
                            'ver' => $permisosPerfil[0]->ver,
                            'crear' => $permisosPerfil[0]->crear,
                            'editar' => $permisosPerfil[0]->editar,
                            'borrar' => $permisosPerfil[0]->borrar
                        ];
                    }
                    array_push($permisos, $dataLinea);
                }
                return response()->json(['mensaje' => 'Modulos consultados', 'datos' => $permisos], 200);
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => 'Error al consultar los modulos Error: ' . $e->getMessage(), 'datos' => []], 500);
        }
    }

    // Funcion para obtener todos los permisos de un modulo
    public function getPermisos(Request $request) {
        try {
            $permisosPerfil = PermisoModel::where('idPerfil', (int)$request->idPerfil)
                                     ->where('idModulo', (int)$request->idModulo)
                                     ->get();
            if ($permisosPerfil->count() > 0) {
                return response()->json(['mensaje' => 'Lista de permisos del módulo', 'datos' => $permisosPerfil, 'continuar' => 1], 200);
            } else {
                return response()->json(['mensaje' => 'No hay permisos para el módulo', 'datos' => [], 'continuar' => 0], 200);
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => 'No se ha podido consultar los permisos del módulo. Error: ' . $e->getMessage(), 'datos' => [], 'continuar' => 0], 500);
        }
    }

    // Funcion para mostrar los permisos de un perfil
    public function consultarPermisos(Request $request) {
        try {
            $permisosPerfil = PermisoModel::where('idPerfil', (int)$request->idPerfil)
                                     ->get();
            if ($permisosPerfil->count() > 0) {
                return response()->json(['mensaje' => 'Lista de permisos del perfil', 'datos' => $permisosPerfil, 'continuar' => 1], 200);
            } else {
                return response()->json(['mensaje' => 'No hay permisos para el perfil', 'datos' => [], 'continuar' => 0], 200);
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => 'No se ha podido consultar los permisos del perfil. Error: ' . $e->getMessage(), 'datos' => [], 'continuar' => 0], 500);
        }
    }

    // Funcion para crear los permisos de un modulo 
    public function create(Request $request) {
        try {
            $data = $request->all();
            // var_dump($data);die();

            // Eliminar los permisos existentes para el módulo
            $borradoPermisos = PermisoModel::where('idModulo', $data[0]['idModulo'])->delete();

            // Insertar los nuevos permisos
            $cont = 0;
            foreach($data as $elemento ) {
                $elemento['created_at'] = now();
                $elemento['updated_at'] = now();
                $resultado = PermisoModel::insert($elemento);
                $cont++;
            }

            if ( $cont ==count($data)) {
                return response()->json(['mensaje' => 'Módulo insertado de manera correcta', 'datos' => $resultado], 200);
            } else {
                return response()->json(['mensaje' => 'El módulo no se ha podido insertar', 'datos' => $resultado], 200);
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => 'No se ha podido insertar el módulo. Error: ' . $e->getMessage(), 'datos' => []], 500);
        }
    }
}

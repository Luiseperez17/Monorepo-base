<?php

namespace App\Http\Controllers\configuracion;

use Illuminate\Http\Request;

use App\Models\configuracion\ModuloModel;

use App\Http\Controllers\Controller;

class ModuloController extends Controller
{
    // Funcion para obtener modulos
    public function get()
    {
        try {
            $resultado = ModuloModel::where(['eliminado' => 0, 'idPadre' => 0])->get();
            return response()->json(['mensaje' => 'Modulos consultados', 'datos' => $resultado]);
        } catch (\Exception $error) {
            return response()->json(['mensaje' => 'Error al consultar los modulos', 'datos' => [],], 500);
        }
    }

    // Funcion para obtener los submodulos de acuerdo al id del modulo principal
    public function getModulos($id)
    {
        try {
            $resultado = ModuloModel::where(['eliminado' => 0, 'idPadre' => $id])->get();
            return response()->json(['mensaje' => 'Modulos consultados', 'datos' => $resultado]);
        } catch (\Exception $error) {
            return response()->json(['mensaje' => 'Error al consultar los modulos', 'datos' => []], 500);
        }
    }

    // Funcion para obtener el menu
    public function getMenu(Request $request)
    {
        try {
            $menu = [];
            $query = ModuloModel::select('idPadre')
            ->distinct()
            ->join('app_permisos_modulos as r', 'r.idModulo', '=', 'app_modulos._id')
            ->where('r.ver', 1)
            ->where('r.idPerfil', $request->idPerfil)
            ->where('app_modulos.eliminado', 0)
            ->where('app_modulos.estado', 1)
            ->orderBy('app_modulos.idPadre', 'ASC');
            // $sql = $query->toSql(); dd($sql);
            $modulosDistint = $query->get();

            $whereIn = [];

            if ($modulosDistint->isNotEmpty()) {
                foreach ($modulosDistint as $element) {
                    $whereIn[] = $element->idPadre;
                }

                // Traigo la información del módulo con el where in
                $infoModulos = ModuloModel::whereIn('_id', $whereIn)->get();

                foreach ($infoModulos as $infoModulo) {
                    // Traigo los módulos internos
                    $mopdulosInternos = ModuloModel::select('app_modulos._id', 'idPadre', 'nombreModulo', 'urlModulo', 'iconoModulo', 'eliminado', 'estado', 'esPadre')
                                            ->join('app_permisos_modulos as r', 'r.idModulo', '=', 'app_modulos._id')
                                            ->where('r.idPerfil', $request->idPerfil)
                                            ->where('app_modulos.idPadre', $infoModulo->_id)
                                            ->where('app_modulos.estado', 1)
                                            ->where('app_modulos.eliminado', 0)
                                            ->where('r.ver', 1)
                                            ->orderBy('app_modulos.orden', 'ASC')
                                            ->get();

                    $menuArmado = [
                        'id' => $infoModulo->_id,
                        'padre' => $infoModulo->nombreModulo,
                        'opciones' => $mopdulosInternos
                    ];
                    $menu[] = $menuArmado;
                }

                return response()->json(['mensaje' => 'Menu principal', 'datos' => $menu], 200);
            } else {
                return response()->json(['mensaje' => 'No hay módulos disponibles', 'datos' => []], 200);
            }
        } catch (\Exception $error) {
            return response()->json(['mensaje' => 'Error al consultar los módulos: ' . $error->getMessage(), 'datos' => []], 500);
        }
    }

    // Funcion para crear un nuevo modulo
    public function create(Request $request)
    {
        try {
            $data = $request->all();
            $data['created_at'] = now();
            $data['updated_at'] = now();
            $resultado = ModuloModel::insert($data);
            if ($resultado) {
                return response()->json(['mensaje' => 'Módulo insertado de manera correcta', 'datos' => $resultado]);
            } else {
                return response()->json(['mensaje' => 'El módulo no se ha podido insertar', 'datos' => $resultado]);
            }
        } catch (\Exception $error) {
            return response()->json(['mensaje' => 'No se ha podido insertar el módulo. Error: ' . $error->getMessage(), 'datos' => []], 500);
        }
    }

    // Funcion para actualizar un modulo
    public function update(Request $request, $id)
    {
        try {
            $data = $request->all();
            $resultado = ModuloModel::where('_id', $id)->update($data);

            if ($resultado > 0) {
                return response()->json([
                    'mensaje' => 'Módulo actualizado de manera correcta',
                    'datos' => $resultado,
                ], 200);
            } else {
                return response()->json([
                    'mensaje' => 'El módulo no se ha podido actualizar',
                    'datos' => $resultado,
                ], 200);
            }
        } catch (\Exception $error) {
            return response()->json([
                'mensaje' => 'No se ha podido actualizar el módulo',
                'datos' => [],
            ], 500);
        }
    }

    // Funcion para eliminar un modulo
    public function delete(Request $request){
        $modulo = ModuloModel::find($request->_id);

        if ($modulo) {
            $modulo->eliminado = 1;
            $modulo->estado = 0;
            $resultado = $modulo->save();

            if($resultado){
                return response()->json([
                    "mensaje"=>"El modulo se ha eliminado correctamente.",
                    "datos"=>[1]
                ]);
            } else {
                return response()->json([
                    "mensaje"=>"No se ha podido eliminar el modulo.",
                    "datos"=>[0]
                ]);
            }
        } else {
            // Maneja el caso en el que el módulo no sea encontrado
            return response()->json([
                "mensaje"=>"El id del modulo no está en la base de datos, por favor verifique",
                "datos"=>[]
            ], 404); // Devuelve un código de estado 404 para indicar que el recurso no fue encontrado
        }
    }
}

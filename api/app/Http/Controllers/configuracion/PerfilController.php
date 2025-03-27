<?php

namespace App\Http\Controllers\configuracion;

use Illuminate\Http\Request;

use App\Models\configuracion\PerfilModel;

use App\Http\Controllers\Controller;

class PerfilController extends Controller
{
    // Funcion para mostrar perfiles activos
    public function index()
    {
        $datos =  PerfilModel::where('in_estado',1)
                            ->get();
        return response()->json([
            "mensaje"=>"Lista de perfiles",
            "datos"=>$datos
        ]);   
    }

    // funcion para mostrar perfil de acuerdo al ID
    public function show(string $id){
        try {
            $resultado = PerfilModel::findOrFail($id); // Cambia "usuarios" al nombre real de tu modelo        
            return response()->json([
                "mensaje" => "Información del perfil",
                "datos" => $resultado]);    
            } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                "mensaje" => "El perfil no está en la base de datos. Por favor verifique",
                "datos" => []
            ]);
        }
    }

    // Funcion para crear un perfil
    public function create(Request $request){
        $perfil = PerfilModel::create($request->all());
        return response()->json(['perfil' => $perfil], 201);
    }

    // Funcion para actualizar un perfil
    public function update(Request $request, $id_perfil) {
        $estado = $request->input('in_estado');
        $descripcion = $request->input('tx_descripcion');
        //var_dump($estado);die();
        $perfil = PerfilModel::find($id_perfil);
        if (!$perfil) {
            return response()->json([
                "mensaje" => "El perfil con el ID especificado no fue encontrada en la base de datos.",
                "datos" => []
            ], 404);
        }
    
        $perfil->in_estado = $estado;
        $perfil->tx_descripcion = $descripcion;
        $resultado = $perfil->save();
        if ($resultado) {
            return response()->json([
                "mensaje" => "El perfil se ha actualizado correctamente.",
                "datos" => []
            ]);
        } else {
            return response()->json([
                "mensaje" => "No se ha podido actualizar El perfil.",
                "datos" => []
            ], 500);
        }
    }

    // Funcion para eliminar un perfil
    public function delete(Request $request){
        $perfil = PerfilModel::find($request->id_perfil);
        if ($perfil) {
            $perfil->in_estado = 2;
            $resultado = $perfil->save();
            if($resultado){
                return response()->json([
                    "mensaje"=>"El perfil se ha inactivado correctamente.",
                    "datos"=>array()
                ]);
            }
            else{
                return response()->json([
                    "mensaje"=>"No se ha podido inactivar el perfil.",
                    "datos"=>array()
                ]);
            }
            
        } else {
            // Maneja el caso en el que el producto no sea encontrado
            return response()->json([
                "mensaje"=>"El id de perfil no está en la base de datos, por favor verifique",
                "datos"=>array()
            ]);
        }
    }

}

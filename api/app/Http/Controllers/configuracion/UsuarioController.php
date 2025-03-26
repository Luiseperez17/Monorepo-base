<?php

namespace App\Http\Controllers\configuracion;

use Illuminate\Http\Request;

use App\Models\configuracion\UsuarioModel;

use App\Http\Controllers\Controller;

class UsuarioController extends Controller
{
    //Funcion para mostrar usuarios activos
    public function index(){
        $datos =  UsuarioModel::where('in_estado', 1)
                                ->get();
        return response()->json([
            "mensaje"=>"Lista de usuarios activos",
            "datos"=>$datos
        ]);
    }

    // Funcion para mostrar todos los usuarios
    public function indexEstados(){
        $datos =  UsuarioModel::where('in_estado', 1)
                                ->where('in_estado',2)
                                ->get();
        return response()->json([
            "mensaje"=>"Lista de usuarios activos e inactivos",
            "datos"=>$datos
        ]);
    }

    //Funcion para buscar usuario por el ID
    public function show(string $id){
        try {
            $resultado = UsuarioModel::where('in_estado', 1)
                                    ->findOrFail($id);
            return response()->json([
                "mensaje" => "Información del usuario",
                "datos" => $resultado]);
            } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                "mensaje" => "El usuario no está en la base de datos. Por favor verifique",
                "datos" => []
            ]);
        }
    }

    //Funcion para crear usuario
    public function create(Request $request){
        $user = UsuarioModel::create($request->all());
        return response()->json(['user' => $user], 201);
     }

    //Funcion para actualizar información del usuario
    public function update(Request $request, $id){
        $usuario = UsuarioModel::find($id);
        if(!$usuario){return response()->json(['message' => 'Usuario no encontrado'], 404);}
        $usuario->update($request->all());
        return response()->json(['usuario' => $usuario], 200);
    }

    // Funcion para eliminar/cambiar estado de un usuario
    public function delete(Request $request){
        $usuario = UsuarioModel::find($request->id_usuario);
        if ($usuario) {
            $usuario->in_estado = 3;
            $resultado = $usuario->save();
            if($resultado){
                return response()->json([
                    "mensaje"=>"El usuario se ha inactivado correctamente.",
                    "datos"=>array(1)
                ]);
            }
            else{
                return response()->json([
                    "mensaje"=>"No se ha podido inactivar el usuario.",
                    "datos"=>array(0)
                ]);
            }

        } else {
            // Maneja el caso en el que el producto no sea encontrado
            return response()->json([
                "mensaje"=>"El id de usuario no está en la base de datos, por favor verifique",
                "datos"=>array()
            ]);
        }
    }

    // Funcion para mostrar usuarios de perfil despachador
    public function mostrarDespachador(){
        $despachador = UsuarioModel::where('in_perfil', 7)
                                    ->where('in_estado',1)
                                    ->get();
        return response()->json([
            "mensaje" => "Lista de usuarios con perfil igual a 7",
            "datos" => $despachador
        ]);
    }

    // Funcion para mostrar usuarios de perfil despachador por tienda
    public function mostrarDespachadorTienda(string $tienda){
        $despachador = UsuarioModel::where('in_perfil', 7)
                                    ->where('in_estado',1)
                                    ->where('tx_almacen',$tienda)
                                    ->get();
        return response()->json([
            "mensaje" => "Lista de usuarios con perfil igual a 7",
            "datos" => $despachador
        ]);
    }

    // funcion para mostrar usuarios de perfil transportador
    public function mostrarTransportador(){
        $transportador = UsuarioModel::where('in_perfil', 8)
                                    ->where('in_estado',1)
                                    ->get();
        return response()->json([
            "mensaje" => "Lista de usuarios con perfil igual a 8",
            "datos" => $transportador
        ]);
    }

    // Funcion para mostrar usuarios de perfil transportador por tienda
    public function mostrarTransportadorTienda($tienda){
        $transportador = UsuarioModel::where('in_perfil', 8)
                                    ->where('in_estado',1)
                                    ->where('tx_almacen',$tienda)
                                    ->orWhere('id_usuario',9)
                                    ->get();
        return response()->json([
            "mensaje" => "Lista de usuarios con perfil igual a 8",
            "datos" => $transportador
        ]);
    }

    // Funcion para mostrar usuario de perfil transportador por ID
    public function showTransportador(string $id){
        try {
            $resultado = UsuarioModel::where('id_usuario',$id)
                                    ->where('in_estado', 1)
                                    ->where('in_perfil', 8)
                                    ->first();
            return response()->json([
                "mensaje" => "Información del usuario",
                "datos" => $resultado]);
            } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                "mensaje" => "El usuario no está en la base de datos. Por favor verifique",
                "datos" => []
            ]);
        }
    }

    // Funcion para actualizar contraseña de usuario
    public function actualizarContrasena(Request $request, $id_usuario) {
        $password = $request->input('tx_clave');
        $primera = $request->input('primera_vez');

        //var_dump($estado);die();
        $usuario = UsuarioModel::find($id_usuario);
        if (!$usuario) {
            return response()->json([
                "mensaje" => "El usuario no se ha encontrado.",
                "datos" => []
            ], 404);
        }
        $usuario->tx_clave = $password;
        $usuario -> primera_vez = $primera;
        $resultado = $usuario->save();
        if ($resultado) {
            return response()->json([
                "mensaje" => "La contraseña se ha actualizado correctamente.",
                "datos" => [1]
            ]);
        } else {
            return response()->json([
                "mensaje" => "No se ha podido actualizar la contraseña.",
                "datos" => [0]
            ], 500);
        }
    }

    // Funcion para confirmar usuario
    public function confirmarUsuario(Request $request){
        $correo = $request->input('correo');
        if(!$correo){
            return response()->json([
                'mensaje' => 'No se envio correo',
                'data' => [],
                'continuar' => 0
            ]);
        }else{
            $usuario = UsuarioModel::where('tx_correo', $correo)->first();
            if(!$usuario){
                return response()->json([
                    'mensaje' => 'No existe usuario con este correo',
                    'data' => [],
                    'continuar' => 0
                ]);
            }else{
                return response()->json([
                    'mensaje' => 'Usuario encontrado exitosamente',
                    'data' => [
                        'id_usuario' => $usuario->id_usuario,
                        'tx_correo' => $usuario->tx_correo
                    ],
                    'continuar' => 1
                ]);
            }
        }
    }
}

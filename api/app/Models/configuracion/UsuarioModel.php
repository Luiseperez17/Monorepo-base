<?php

namespace App\Models\configuracion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioModel extends Model
{
    use HasFactory;
    protected $table        = "app_usuarios";
    protected $primaryKey   = 'id_usuario';
    protected $fillable     = ['tx_usuario',
                                'tx_nombre',
                                'tx_clave',
                                'in_perfil',
                                'in_estado',
                                'tx_correo',
                                'primera_vez'];
    public $timestamps = true;
}

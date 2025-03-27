<?php

namespace App\Models\configuracion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermisoModel extends Model
{
    use HasFactory;
    protected $table        = "app_permisos_modulos";
    protected $primaryKey   = '_id';
    protected $fillable     = ['idModulo','idPerfil','ver','crear','editar','borrar'];
    public $timestamps = true;
}

<?php

namespace App\Models\configuracion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModuloModel extends Model
{
    use HasFactory;
    protected $table        = "app_modulos";
    protected $primaryKey   = '_id';
    protected $fillable     = ['idPadre','nombreModulo','nombreLargoModulo','urlModulo','componenteModulo','iconoModulo','orden','estado','eliminado','esPadre'];
    public $timestamps = true;
}

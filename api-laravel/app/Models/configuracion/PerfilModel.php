<?php

namespace App\Models\configuracion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerfilModel extends Model
{
    use HasFactory;
    protected $table        = "app_perfiles";
    protected $primaryKey   = 'id_perfil';
    protected $fillable     = ['tx_descripcion'];
    public $timestamps = true;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public env = environment;
  public urlApi     =  this.env.urlApi;

  constructor(private http:HttpClient,) { }

  // Consulto
  getUsuarios():any{
    return this.http.get(this.urlApi+"usuarios");
  }

  getUsuariosid(idUsuario:any):any{
    return this.http.get(this.urlApi+"usuarios/"+idUsuario);
  }

  getPerfiles():any{
    return this.http.get(this.urlApi+"perfiles");
  }
  //Creo
  create(tx_usuario:any, tx_nombre:any, in_perfil:any, tx_correo:any):any{
    const data = {tx_usuario:tx_usuario, tx_nombre:tx_nombre, in_perfil:in_perfil, tx_correo:tx_correo};
    return this.http.post(this.urlApi+"usuarios", data);
  }
  //Actualizo
  update(id_usuario:any,tx_usuario:any, tx_nombre:any, in_perfil:any, tx_correo:any, ){
    const data = {tx_usuario:tx_usuario, tx_nombre:tx_nombre, in_perfil:in_perfil, tx_correo:tx_correo,};
    return this.http.put(this.urlApi+"usuarios/"+id_usuario, data);
  }
  //crear contraseña, tener en cuenta para cuando es primera vez
  crearPass(id_usuario:any,tx_clave:any,primera_vez:any){
    const data = {tx_clave:tx_clave,primera_vez:primera_vez};
    return this.http.post(this.urlApi+"usuarios/contrasena/"+id_usuario, data);
  }
  delete(idUsuario:any):any{
    const data= {id_usuario:idUsuario}
    return this.http.request('delete', `${this.urlApi}usuarios`, { body: data });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordarContrasenaService {


  public env = environment;
  public urlApi     = this.env.urlApi;

  public rutaCambioContrasena = "https://recordar.xyroapps.com.co/api/change-password/";

  constructor(private http:HttpClient,) { }


  consultoEmail(Email:any):any{
    const body = { correo:Email };
    return this.http.post(this.urlApi+"usuarios/confirmacion", body);
  }

  //crear contraseña, tener en cuenta para cuando es primera vez
  crearPass(id_usuario:any,tx_clave:any,primera_vez:any){
    const data = {tx_clave:tx_clave,primera_vez:primera_vez};
    return this.http.post(this.urlApi+"usuarios/contrasena/"+id_usuario, data);
  }

  changePassword(email: string, newPassword: string){
    const body = { email, newPassword };
    return this.http.post(this.rutaCambioContrasena, body);
  }

}

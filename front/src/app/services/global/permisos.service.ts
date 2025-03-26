import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  //autenticación para recibir respuesta del API
  public token:any = sessionStorage.getItem('token');
  public headers:any = {
    'Authorization':`Bearer ${this.token}`
  };
  public env = environment;
  public urlApi     = this.env.urlApi;
  constructor(private http:HttpClient) { }

  getPermisos(idModulo:number,idPerfil:number):any{
    return this.http.get(this.env.urlApi+`permisos/getpermisos/${idModulo}/${idPerfil}`,{headers:this.headers});
  }
}

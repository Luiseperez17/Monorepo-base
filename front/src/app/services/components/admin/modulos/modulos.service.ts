import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, interval, Subscription,Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {
  //autenticación para recibir respuesta del API
  public token:any = sessionStorage.getItem('token');
  public headers:any = {
    'Authorization':`Bearer ${this.token}`
  };


  public env = environment;
  public urlApi     = this.env.urlApi;

  constructor(private http:HttpClient) { }

  get():any{
    return this.http.get(this.urlApi+"modulos");
  }
  getModulosPorPadre(idPadre:number):any{
    return this.http.get(this.urlApi+`modulos/${idPadre}`);
  }
  getMenu(id:any):any{
    return this.http.get(this.urlApi+`modulos/menu/${id}`);
  }
  getOne(id:any):any{
    return this.http.get(this.urlApi+`modulos/${id}`);
  }
  create(data:any):any{
    return this.http.post(this.urlApi+"modulos",data);
  }
  update(id:any,data:any):any{
    return this.http.put(this.urlApi+`modulos/${id}`,data);
  }
  delete(id: any): any {
    const data = { _id: id };
    return this.http.request('delete', `${this.urlApi}modulos`, { body: data });
  }
  //permisos
  getPermisos(idModulo:number,idPerfil:number):any{
    return this.http.get(this.urlApi+`permisos/${idModulo}/${idPerfil}`);
  }
  createPermisos(data:any,):any{
    return this.http.post(this.urlApi+"permisos",data);
  }


}

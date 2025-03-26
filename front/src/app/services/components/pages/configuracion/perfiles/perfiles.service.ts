import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  public env = environment;
  public urlApi     = this.env.urlApi;
  constructor(private http:HttpClient) { }

  getEstados():any{
    return this.http.get(this.urlApi+"estados");
  }

  //consulto
  getAll():any{
    return this.http.get(this.urlApi+"perfiles");
  }
  //perfil por id
  getPerfilPorId(idPerfil: number){
    return this.http.get(this.urlApi+"perfiles/"+idPerfil);
  }
  //Creo
  create(nombrePerfil: any, estado: any): any {
    const data = {tx_descripcion:nombrePerfil, in_estado:estado };
    return this.http.post(this.urlApi + "perfiles", data);
  }
  //Actualizo
  update(idPerfil: number, nombrePerfil: string, estado: number){
    const data = {tx_descripcion: nombrePerfil,in_estado: estado};
    return this.http.put(`${this.urlApi}perfiles/${idPerfil}`, data);
  }
  //eliminar
  delete(idPerfil: any): any {
    const data = { id_perfil: idPerfil };
    return this.http.request('delete', `${this.urlApi}perfiles`, { body: data });
  }

}

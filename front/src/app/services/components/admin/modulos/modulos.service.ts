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


  private trasladoPendienteSubject = new BehaviorSubject<boolean>(false); // Estado de traslados pendientes
  private trasladoSubscription: Subscription | undefined;
  public env = environment;
  public urlApi     = (this.env.demo) ? this.env.urlApiDemo : this.env.urlApi;

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

  getMisTraslados(almacen: any): any {
    return this.http.get(this.urlApi + "wms/trasladosmercancia/bodega/origen/" + almacen);
  }

  // Método para iniciar la verificación periódica de traslados
  iniciarVerificacionTraslados(almacen: string): void {
    // Ejecuta la consulta cada 30 segundos
    this.trasladoSubscription = interval(300000) // Intervalo de 5 minutos
      .pipe(
        switchMap(() => this.getMisTraslados(almacen)) // Realiza la consulta
      )
      .subscribe(
        (response: any) => {
          // Si hay traslados pendientes, emitimos `true`
          if (response && response.datos.length > 0) {
            this.trasladoPendienteSubject.next(response);
          } else {
            this.trasladoPendienteSubject.next(false);
          }
        },
        (error) => {
          console.error('Error al verificar traslados:', error);
        }
      );
  }

  // Método para detener la verificación de traslados
  detenerVerificacionTraslados(): void {
    if (this.trasladoSubscription) {
      this.trasladoSubscription.unsubscribe();
    }
  }

  // Observable para obtener el estado de traslados pendientes
  getTrasladosPendientes$() {
    return this.trasladoPendienteSubject.asObservable();
  }


}

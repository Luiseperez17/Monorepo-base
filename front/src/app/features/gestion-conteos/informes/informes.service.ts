import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class InformesService {
  private apiUrl = `${environment.urlApi}`; // URL base del backend

  constructor(private http: HttpClient) {}

  // Consultar lista de bodegas
  obtenerListaBodegas(): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/bodegas/list`);
  }

  // Método para consultar lineaConteo
  consultarLineaConteo(idConteo: number | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/conteos/linea/${idConteo}`);
  }

  consultarArticuloPorCodigo(idConteo: number | null, codigoBarras: string): Observable<any> {
    const url = `${this.apiUrl}/conteos/articulo/${idConteo}/${codigoBarras}`;
    return this.http.get<any>(url);
  }

  // guardar conteo 
  guardarConteo(conteo: any): Observable<any> {
    const url = `${this.apiUrl}/informes/create`;
    return this.http.post<any>(url, conteo);
  }

  // actualizar conteo 
  actualizarConteo(conteo: any): Observable<any> {
    const url = `${this.apiUrl}/informes/update/${conteo.id}`;
    return this.http.put<any>(url, conteo);
  }

  // consultar conteos de un articulo y lote 
  consultarConteosArticuloLote(bodega: string, numConteo: number | null, codigoSap: string, lote: string): Observable<any> {
    const url = `${this.apiUrl}/conteos/articulo/lote/${bodega}/${numConteo}/${codigoSap}/${lote}`;
    return this.http.get<any>(url);
  }

  // consultar lista de usuarios
  obtenerListaUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios`);
  }

  // consutlar la lista de conteos por bodega
  consultarConteosPorBodega(bodega: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/conteos/list/${bodega}`);
  }

  //servicio para comparar conteos
  compararConteos(conteo1: number, conteo2: number, codBodega: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}informes/comparar/${codBodega}/${conteo1}/${conteo2}`);
  }
  
}
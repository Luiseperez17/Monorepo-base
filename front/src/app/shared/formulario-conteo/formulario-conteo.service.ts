import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class FormularioConteoService {
  private apiUrl = `${environment.urlApi}conteos`; // URL base del backend

  constructor(private http: HttpClient) {}

  // Método para consultar lineaConteo
  consultarLineaConteo(idConteo: number | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/linea/${idConteo}`);
  }

  consultarArticuloPorCodigo(idConteo: number | null, codigoBarras: string): Observable<any> {
    const url = `${this.apiUrl}/articulo/${idConteo}/${codigoBarras}`;
    return this.http.get<any>(url);
  }

  // guardar conteo 
  guardarConteo(conteo: any): Observable<any> {
    const url = `${this.apiUrl}/create`;
    return this.http.post<any>(url, conteo);
  }

  // actualizar conteo 
  actualizarConteo(conteo: any): Observable<any> {
    const url = `${this.apiUrl}/update/${conteo.id}`;
    return this.http.put<any>(url, conteo);
  }

  // consultar conteos de un articulo y lote 
  consultarConteosArticuloLote(bodega: string, numConteo: number | null, codigoSap: string, lote: string): Observable<any> {
    const url = `${this.apiUrl}/articulo/lote/${bodega}/${numConteo}/${codigoSap}/${lote}`;
    return this.http.get<any>(url);
  }
}
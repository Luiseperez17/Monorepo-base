import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class AsignarConteoService {
  private apiUrl = `${environment.urlApi}asignar-conteo`; // URL base del backend

  constructor(private http: HttpClient) {}

  // Obtener la lista de regitros
  obtenerListaConteos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list`);
  }

  // Crear un nuevo registro
  asignarConteo(conteo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, conteo);
  }

  // Actualizar los datos de un registro
  actualizarConteo(id: number, conteo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, conteo);
  }

  // Eliminar un registro (borrado lógico)
  eliminarConteo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  // Consultar lista de bodegas
  obtenerListaBodegas(): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/bodegas/list`);
  }

  // Consultar lista de diferencias de conteos 1 y 2
  obtenerConteosDiferencias(idBodga: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dif/${idBodga}`);
  }

  // Consultar lista de diferencias de conteos con SAP
  obtenerConteosDiferenciasSap(idBodga: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dif-sap/${idBodga}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConteoDiferenciasService {

  private apiUrl = `${environment.urlApi}conteos`; // URL base del backend

  constructor(private http: HttpClient) {}


  // Consultar lista de diferencias de conteos 1 y 2
  obtenerConteosDiferencias(idBodga: string, idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tercer-conteo/${idBodga}/${idUsuario}`);
  }

  // Consultar lista de diferencias de conteos con SAP
  obtenerConteosDiferenciasSap(idBodga: string, idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dif-sap/${idBodga}/${idUsuario}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class SincronizacionService {
    private apiUrl = `${environment.urlApi}sl`; // URL base del backend

    constructor(private http: HttpClient) {}

    // sincronizar articulos
    sincronizarArticulos(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/productosAll`);
    }
    
    // sincronizar bodegas
    sincronizarBodegas(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/bodegasAll`);
    }

    // sincronizar lotes
    SincronizarLotes(): Observable<any> {
        const url = `${this.apiUrl}/lotesAll`;
        return this.http.get<any>(url);
    }

    // sincronizar codigos barras
    SincronizarCodigosBarras(): Observable<any> {
        const url = `${this.apiUrl}/codigosBarrasAll`;
        return this.http.get<any>(url);
    }

    // sincronizar existencias
    SincronizarExistencias(codBodega: string): Observable<any> {
        const url = `${this.apiUrl}/existenciasBodega/${codBodega}`;
        return this.http.get<any>(url);
    }

    // Consultar lista de bodegas
    obtenerListaBodegas(): Observable<any> {
        return this.http.get<any>(`${environment.urlApi}/bodegas/list`);
    }
    
}
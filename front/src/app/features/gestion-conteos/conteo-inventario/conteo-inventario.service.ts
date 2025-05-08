import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class ConteoInventarioService {
  private apiUrl = `${environment.urlApi}asignar-conteo`; // URL base del backend

  constructor(private http: HttpClient) {}

  // Consultar conteos asignados al usuario
  obtenerConteosAsignados(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/asignados/${idUsuario}`);
  }
  
  // Consultar conteos de vencidos, asignados al usuario 
  obtenerConteosAsignadosVencidos(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/asignados-vencidos/${idUsuario}`);
  }
}
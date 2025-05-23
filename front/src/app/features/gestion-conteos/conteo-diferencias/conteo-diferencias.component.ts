import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BannerCabeceraComponent } from 'src/app/core/layout/banner-cabecera/banner-cabecera.component';
import { ConteoDiferenciasService } from './conteo-diferencias.service';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { Bodega, Respuesta } from '../asignar-conteo/asignar-conteo.model';
import { AsignarConteoService } from '../asignar-conteo/asignar-conteo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conteo-diferencias',
  standalone: true,
  imports: [FormsModule, BannerCabeceraComponent, CommonModule],
  templateUrl: './conteo-diferencias.component.html',
  styleUrl: './conteo-diferencias.component.css'
})
export class ConteoDiferenciasComponent {

  public user = JSON.parse(localStorage.getItem("dataUsuario") || "{}"); // Obtener el usuario del localStorage
  public conteoAsignado: any = {}; // Lista de conteos asignados
  public conteosDiferencias: any[] = []; // Lista de diferencias de conteos
  public conteosDiferenciasSap: any[] = []; // Lista de diferencias de conteos con SAP
  public listaBodegas: Bodega[] = []; // Lista de conteos asignados
  public bodegaSeleccionada: string = ''; // Bodega seleccionada por el usuario
  public paginaActual: number = 1;
  public filasPorPagina: number = 10; // Cantidad de filas por página
  public terminoBusqueda: string = ''; // Término de búsqueda

  constructor(
    private conteoDifService: ConteoDiferenciasService,
    private funciones: FuncionesService, // Inyectar el servicio de funciones
    private asignarConteoService: AsignarConteoService // Inyectar el servicio de conteo diferencias
  ) {}

  ngOnInit(): void {
    
    this.consultarBodegas(); // Consultar bodegas al inicializar el componente
  }

  consultarBodegas() {
    this.asignarConteoService.obtenerListaBodegas().subscribe(
      (respuesta: Respuesta<Bodega[]>) => {
        console.log("Bodegas cargadas:", respuesta.datos);
        this.listaBodegas = respuesta.datos; // Asignar los usuarios al select
      },
      (error:any) => {
        console.error("Error al cargar los usuarios:", error);
      }
    );
  }

  ////////////////////////////////////////////////////////////////
  ////////************* PAGINACIÓN Y BUSQUEDA ***********/////////
  ////////////////////////////////////////////////////////////////
  // funcion para filtrar los datos, Buscador 
  get datosFiltrados(): any[] {
    if (!this.terminoBusqueda) return this.conteosDiferencias || [];
    const term = this.terminoBusqueda.toLowerCase();
    return (this.conteosDiferencias || []).filter(fila =>
      Object.values(fila).some(
        valor => valor && valor.toString().toLowerCase().includes(term)
      )
    );
  }
  
  // funcion para validar las filas a mostrar, desde - hasta 
  get datosPaginados(): any[] {
    const filas = Number(this.filasPorPagina) || 10;
    const inicio = (this.paginaActual - 1) * filas;
    const fin = inicio + filas;
    return this.datosFiltrados.slice(inicio, fin);
  }

  // esta funcion calcula el total de paginas segun la cantidad de registros totales y por pagina 
  public totalPaginas(): number {
    return Math.ceil(this.datosFiltrados.length / this.filasPorPagina) || 1;
  }

  // funcion para cambiar entre paginas, paginación de resultados 
  public cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas()) {
      this.paginaActual = nuevaPagina;
    }
  }

  // funcion para asegurar que el valor de filas por pagina sea un numero 
  public onFilasPorPaginaChange(event: any): void {
    this.filasPorPagina = Number(this.filasPorPagina);
    this.paginaActual = 1;
  }
  ////////////////////////////////////////////////////////////////////
  ////////************* END PAGINACIÓN Y BUSQUEDA ***********/////////
  ///////////////////////////////////////////////////////////////////

  // consultar si el usuario tiene tercer conteo asignado 
  consultarConteosAsignados(): void {

    const idUsuario = this.user.id_usuario; // Obtener el ID del usuario logueado
    if (!idUsuario) {
      console.error('No se encontró el ID del usuario logueado.');
      return;
    }

    this.conteoDifService.obtenerConteosDiferencias(this.bodegaSeleccionada, idUsuario).subscribe(
      (respuesta) => {
        console.log('Conteos asignados:', respuesta.datos);
        if (respuesta.datos.length > 0) {
          console.log('Conteos asignados:', this.conteoAsignado);
          // Si hay conteos asignados, vamos a traer la lista de diferencias
          this.conteosDiferencias = respuesta.datos; // Asignar los conteos a la variable
          
        } else {
          this.funciones.alerta('Atención!', 'No se encontraron conteos asignados para el usuario y bodega.', 'info');
          this.conteosDiferencias = []; // Limpiar la lista de diferencias
        }
      },
      (error) => {
        console.error('Error al consultar los conteos asignados:', error);
      }
    );

    // Lógica para consultar los conteos asignados al usuario logueado
  }

}

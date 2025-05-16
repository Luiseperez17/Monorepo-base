import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BannerCabeceraComponent } from 'src/app/core/layout/banner-cabecera/banner-cabecera.component';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { SincronizacionService } from './sincronizacion.service';
import { CommonModule } from '@angular/common';
import { Bodega, Respuesta } from '../gestion-conteos/asignar-conteo/asignar-conteo.model';

@Component({
  selector: 'app-sincronizacion',
  standalone: true,
  imports: [FormsModule, BannerCabeceraComponent, CommonModule],
  templateUrl: './sincronizacion.component.html',
  styleUrl: './sincronizacion.component.css'
})
export class SincronizacionComponent {

  public user = JSON.parse(localStorage.getItem("dataUsuario") || "{}"); // Obtener el usuario del localStorage

  public tablas: any = [
    { nombre: 'Artículos', estado: false, registros:0 },
    { nombre: 'Bodegas', estado: false, registros:0 },
    { nombre: 'Lotes', estado: false, registros:0 },
    { nombre: 'Codigos barras', estado: false, registros:0 },
  ]

  public existencias: any = {
    nombre: 'Existencias',
    estado: false,
    registros:0
  }

    public listaBodegas: Bodega[] = []; // Lista de conteos asignados
    public selectedBodega: any; // Almacena la bodega seleccionada

  constructor(
    private funciones: FuncionesService, // Inyectar el servicio de funciones
    private syncService: SincronizacionService // Inyectar el servicio de sincronización
  ) {}

  ngOnInit(): void {
    this.consultarBodegas(); // Cargar bodegas al inicializar el componente
  }

  consultarBodegas() {
      this.syncService.obtenerListaBodegas().subscribe(
        (respuesta: Respuesta<Bodega[]>) => {
          console.log("Bodegas cargados:", respuesta.datos);
          this.listaBodegas = respuesta.datos; // Asignar los usuarios al select
        },
        (error:any) => {
          console.error("Error al cargar los usuarios:", error);
        }
      );
  }

  sincronizarSAP() {
    
    console.log('Sincronizando con SAP...');
    // Lógica de sincronización aquí
    this.tablas.forEach((element: any, index: number) => {
      switch (element.nombre) {
      case 'Artículos':
        this.sincronizarArticulos(index);
        break;
      case 'Bodegas':
        this.sincronizarBodegas(index);
        break;
      case 'Lotes':
        this.sincronizarLotes(index);
        break;
      case 'Codigos barras':
        this.sincronizarCodigosBarras(index);
        break;
      default:
        break;
      }
    });
  }

  // sincronizar articulos 
  sincronizarArticulos(index: number) {
    console.log('Sincronizando artículos...');
    // Lógica de sincronización de artículos aquí
    this.tablas[index].estado = true;

    // consultamos el api para traer los artículos 
    this.syncService.sincronizarArticulos().subscribe(
      (respuesta) => {
        if (respuesta.datos.length > 0) {
          // Si hay artículos, puedes realizar alguna acción adicional aquí
          this.tablas[index].registros = respuesta.datos.length; // Asignar los registros sincronizados
          this.tablas[index].estado = false;
          // this.funciones.alerta('Atención!', 'Se han sincronizado los artículos.', 'success');
        } else {
          this.funciones.alerta('Atención!', 'No se encontraron artículos para sincronizar.', 'info');
        }
      },
      (error) => {
        console.error('Error al sincronizar los artículos:', error);
        this.funciones.alerta('Error!', 'Error al sincronizar los artículos.', 'error');
      }
    );
  }

  // sincronizar bodegas 
  sincronizarBodegas(index: number) {
    console.log('Sincronizando bodegas...');
    // Lógica de sincronización de bodegas aquí
    this.tablas[index].estado = true;

    // consultamos el api para traer los artículos 
    this.syncService.sincronizarBodegas().subscribe(
      (respuesta) => {
        if (respuesta.datos.length > 0) {
          // Si hay artículos, puedes realizar alguna acción adicional aquí
          this.tablas[index].registros = respuesta.datos.length; // Asignar los registros sincronizados
          this.tablas[index].estado = false;
          // this.funciones.alerta('Atención!', 'Se han sincronizado las bodegas.', 'success');
        } else {
          this.funciones.alerta('Atención!', 'No se encontraron bodegas para sincronizar.', 'info');
        }
      },
      (error) => {
        console.error('Error al sincronizar las bodegas:', error);
        this.funciones.alerta('Error!', 'Error al sincronizar las bodegas.', 'error');
      }
    );
  }

  // sincronizar lotes 
  sincronizarLotes(index: number) {
    console.log('Sincronizando lotes...');
    // Lógica de sincronización de lotes aquí
    this.tablas[index].estado = true;

    // consultamos el api para traer los artículos 
    this.syncService.SincronizarLotes().subscribe(
      (respuesta) => {
        if (respuesta.datos.length > 0) {
          // Si hay artículos, puedes realizar alguna acción adicional aquí
          this.tablas[index].registros = respuesta.datos.length; // Asignar los registros sincronizados
          this.tablas[index].estado = false;
          // this.funciones.alerta('Atención!', 'Se han sincronizado los lotes.', 'success');
        } else {
          this.funciones.alerta('Atención!', 'No se encontraron lotes para sincronizar.', 'info');
        }
      },
      (error) => {
        console.error('Error al sincronizar los lotes:', error);
        this.funciones.alerta('Error!', 'Error al sincronizar los lotes.', 'error');
      }
    );
  }

  // sincronizar codigos barras
  sincronizarCodigosBarras(index: number) {
    console.log('Sincronizando codigos barras...');
    // identificamos la tabla a sincronizar
    this.tablas[index].estado = true;

    // consultamos el api para traer los artículos 
    this.syncService.SincronizarCodigosBarras().subscribe(
      (respuesta) => {
        if (respuesta.datos.length > 0) {
          // Si hay artículos, puedes realizar alguna acción adicional aquí
          this.tablas[index].registros = respuesta.datos.length; // Asignar los registros sincronizados
          this.tablas[index].estado = false;
          // this.funciones.alerta('Atención!', 'Se han sincronizado los codigos barras.', 'success');
        } else {
          this.funciones.alerta('Atención!', 'No se encontraron codigos barras para sincronizar.', 'info');
        }
      },
      (error) => {
        console.error('Error al sincronizar los codigos barras:', error);
        this.funciones.alerta('Error!', 'Error al sincronizar los codigos barras.', 'error');
      }
    );
  }

  // sincronizar existencias SAP 
  sincronizarExistencias() {
    console.log('Sincronizando existencias...');
    this.existencias.estado = true;

    if (!this.selectedBodega) {
      this.funciones.alerta('Atención!', 'Debe seleccionar una bodega para sincronizar existencias.', 'warning');
      this.existencias.estado = false;
      return;
    }

    this.syncService.SincronizarExistencias(this.selectedBodega).subscribe(
      (respuesta) => {
        if (respuesta.datos.length > 0) {
          this.existencias.registros = respuesta.datos.length;
          this.existencias.estado = false;
          // this.funciones.alerta('Atención!', 'Se han sincronizado las existencias.', 'success');
        } else {
          this.funciones.alerta('Atención!', 'No se encontraron existencias para sincronizar.', 'info');
          this.existencias.estado = false;
        }
      },
      (error) => {
        console.error('Error al sincronizar las existencias:', error);
        this.funciones.alerta('Error!', 'Error al sincronizar las existencias.', 'error');
        this.existencias.estado = false;
      }
    );

  }
  

}

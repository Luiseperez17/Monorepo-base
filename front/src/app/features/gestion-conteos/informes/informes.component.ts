import { Component } from '@angular/core';
import { BannerCabeceraComponent } from 'src/app/core/layout/banner-cabecera/banner-cabecera.component';
import { InformesService } from './informes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bodega, Respuesta } from '../asignar-conteo/asignar-conteo.model';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [BannerCabeceraComponent, CommonModule, FormsModule],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.css'
})
export class InformesComponent {

  public user = JSON.parse(localStorage.getItem("dataUsuario") || "{}"); // Obtener el usuario del localStorage
  public idUsuario: number = this.user.id; // Obtener el id del usuario

  public listBodegas: Bodega[] = []; // Lista de bodegas
  public listUsuarios: any[] = []; // Lista de bodegas
  public bodega: any = ""; // Bodega seleccionada
  public informe: any = ""; // Informe seleccionado
  public conteo: any = ""; // Conteo seleccionado
  public conteoComparar: any = ""; // Lista de conteos
  public usuarioSelect: any = ""; // Usuario seleccionado
  public columnas: any[] = []; // Lista de conteos
  public datosInforme: any[] = []; // Lista de conteos
  public mensajeTabla: string = "Las filas de color rojo son los conteos que tienen diferencia o no fueron contadas en el Conteo a Comparar."; // Mensaje para la tabla
  public paginaActual: number = 1;
  public filasPorPagina: number = 10; // Cantidad de filas por página
  public terminoBusqueda: string = ''; // Término de búsqueda


  constructor(
    private informesService: InformesService, // Inyectar el servicio de informes
    public funciones: FuncionesService // Inyectar el servicio de funciones
  ) { } // Constructor vacío

  ngOnInit(): void {
    console.log('Datos del usuario:', this.user);
    this.consultarBodegas(); // Consultar bodegas al iniciar el componente
    this.consultarUsuarios(); // Consultar usuarios al iniciar el componente
  }

  // Método para consultar la lista de bodegas
  public consultarBodegas(): void {
    this.informesService.obtenerListaBodegas().subscribe(
      (response: Respuesta<Bodega[]>) => {
        this.listBodegas = response.datos; // Asignar la respuesta a la lista de bodegas
        console.log('Lista de bodegas:', this.listBodegas);
      },
      (error: any) => {
        console.error('Error al consultar las bodegas:', error); // Manejo de errores
      }
    );
  }

  ////////////////////////////////////////////////////////////////
  ////////************* PAGINACIÓN Y BUSQUEDA ***********/////////
  ////////////////////////////////////////////////////////////////
  // funcion para filtrar los datos, Buscador 
  get datosFiltrados(): any[] {
    if (!this.terminoBusqueda) return this.datosInforme || [];
    const term = this.terminoBusqueda.toLowerCase();
    return (this.datosInforme || []).filter(fila =>
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

  // Metodo para consultar la lista de usuarios
  public consultarUsuarios(): void { 

    this.informesService.obtenerListaUsuarios().subscribe(
      (response: Respuesta<any[]>) => {
        this.listUsuarios = response.datos; // Asignar la respuesta a la lista de usuarios
        console.log('Lista de usuarios:', this.listUsuarios);
      },
      (error: any) => {
        console.error('Error al consultar los usuarios:', error); // Manejo de errores
      }
    );
  }

  //esta funcion ordena y devuelve las cabeceras de las columnas de la tabla
  public obtenerCabecerasTabla(informe: string): string[] {
    // validar el iforme para asignar las cabeceras
    switch (informe) {
      case 'comparar':
        this.columnas = [
          {field:'descripcion_articulo', header:'Articulo'}, 
          {field:'codigo_barras', header:'Código Barras'}, 
          {field:'lote_articulo', header:'Lote'}, 
          {field:'cantidad1', header:'Conteo 1'}, 
          {field:'cantidad2', header:'Conteo 2'}, 
          {field:'diferencia', header:'Diferencia'}
        ];
        break;
      case 'compararSAP':
        this.columnas = [
          {field:'descripcion_articulo', header:'Articulo'}, 
          {field:'codigo_barras', header:'Código Barras'}, 
          {field:'lote_articulo', header:'Lote'}, 
          {field:'cantidad1', header:'Conteo'}, 
          {field:'sap', header:'SAP'}, 
          {field:'diferencia', header:'Diferencia'}
        ];
        break;
      case 'tercerConteo':
        this.columnas = [
          {field:'codigo_sap', header:'Código SAP'}, 
          {field:'descripcion_articulo', header:'Articulo'}, 
          {field:'codigo_barras', header:'Código Barras'}, 
          {field:'lote_articulo', header:'Lote'}, 
          {field:'cantidad_conteo_1', header:'Primera Conteo'}, 
          {field:'cantidad_conteo_2', header:'Segundo Conteo'}, 
          {field:'cantidad_sap', header:'SAP'}, 
          {field:'diferencia', header:'Diferencia'}
        ];
        break;
      case 'diferenciaSAP':
        this.columnas = [
          {field:'codigo_sap', header:'Código SAP'}, 
          {field:'descripcion_articulo', header:'Articulo'}, 
          {field:'codigo_barras', header:'Código Barras'}, 
          {field:'lote_articulo', header:'Lote'}, 
          {field:'cantidad_sap', header:'Stock SAP'}, 
          {field:'cantidad_conteo', header:'Conteo'}, 
          {field:'diferencia', header:'Diferencia'}, 
          {field:'costo_articulo', header:'Costo'},
          {field:'costo_diferencia', header:'C. Diferencia'}
        ];
        break;
      case 'totalizado':
        return [];
        break;
      case 'infoUsuario':
        return [];
        break;
      case 'repetidos':
        return [];
        break;
      default:
        break;
    }
    return [];
  }

  public validaClase(fila:any): string {
    // Validar la clase de la fila según el valor de la diferencia
    if (fila.diferencia != 0 || fila.contado == 'no' ) {
      return 'bkerror'; // Clase para diferencia positiva
    } else {
      return ''; // Sin clase adicional
    }
  }

  public procesarInforme(generar: any): void {
   
    // console.log('Bodega seleccionada:', this.bodega);
    // console.log('Informe seleccionado:', this.informe);
    // console.log('Conteo seleccionado:', this.conteo);
    // console.log('Usuario seleccionado:', this.usuarioSelect);

    // primero vamos a validar que haya seleccionado los campos necesarios
    if (this.bodega === "") {
      this.funciones.alerta("Error", "Por favor seleccione la Bodega", "info");
      return; // Salir de la función si no se han seleccionado todos los campos
    }else if(this.informe === "") {
      this.funciones.alerta("Error", "Por favor seleccione el tipo de informe", "info");
      return; // Salir de la función si no se han seleccionado todos los campos
    } else if(this.informe != "tercerConteo" && this.conteo === "") {
      this.funciones.alerta("Error", "Por favor seleccione el conteo", "info");
      return; // Salir de la función si no se han seleccionado todos los campos
    } else if(this.informe === "comparar" && (this.conteo === "" || this.conteoComparar === "")) {
      this.funciones.alerta("Error", "Por favor seleccione los conteos a comparar", "info");
      return; // Salir de la función si no se han seleccionado todos los campos
    } else if(this.informe === "comparar" && this.conteo ===  this.conteoComparar) {
      this.funciones.alerta("Error", "Los conteos a comparar deben ser diferentes", "info");
      return; // Salir de la función si no se han seleccionado todos los campos
    } else if(this.informe === "infoUsuario" && this.usuarioSelect === "") {
      this.funciones.alerta("Error", "Debe seleccionar el usuario", "info");
      return; // Salir de la función si no se han seleccionado todos los campos
    } else {

      // Si todos los campos están seleccionados, podemos continuar
      // console.log('Todos los campos seleccionados correctamente.');
      // this.funciones.alerta("Éxito", "Campos seleccionados correctamente", "success");
      // Aquí puedes agregar la lógica para procesar el informe según la selección
      switch (this.informe) {
        case 'comparar':
          this.compararConteos(); // Llamar al método para comparar conteos
          break;
        case 'compararSAP':
          this.compararConteoSap(); // Llamar al método para comparar conteo coontra SAP
          break;
        case 'tercerConteo':
          if (generar == 1) {
            this.generarTercerConteo(); // Llamar al método para generar diferencias entre conteo 1 y 2
          } else {
            this.getTercerConteo(); // Llamar al método para consultar diferencias entre conteo 1 y 2
          }
          break;
        case 'diferenciaSAP':
          if (generar == 1) {
            this.generarDiferenciasSap(); // Llamar al método para generar diferencias entre conteo y SAP
          } else { 
          this.getDiferenciasSap(); // Llamar al método para consultar diferencias entre conteo 1 y 2
          }
          break;
        case 'totalizado':
          this.consultarTotalizado(); // mostrar informe totalizado
          break;
        case 'infoUsuario':
          this.comparaConteoUsuario(); // Llamar al método para mostrar la info de un conteo por usuario
          break;
        case 'repetidos':
          this.consultarConteosRepetidos(); // Llamar al método para mostrar informe de conteos repetidos
          break;
        default:
          break;
      }

    }

  }

  // metodo para comparar conteos
  public compararConteos(): void {
    console.log('Conteo seleccionado:', this.conteo);
    console.log('Conteo a comparar:', this.conteoComparar);

    // aqui vamos asignar los nombre de las columnas de la tabla 
    this.obtenerCabecerasTabla(this.informe);
    // Aquí vamosa consultar el servicio para traer los datos de la comparacion entre los dos conteos
    this.funciones.confirmacion("Confirmación", "¿Se van a comparar los conteos seleccionados, desea continuar?", "info", () => {
      // Aquí puedes agregar la lógica para comparar los conteos
      this.informesService.compararConteos(this.conteo, this.conteoComparar, this.bodega).subscribe(
        (respuesta: any) => {  
          if (respuesta.estado === 'ok') {
            console.log('Respuesta de la comparación:', respuesta.datos);
            // vamos a asignar el resultado 
            this.datosInforme = respuesta.datos; // Asignar la respuesta a la lista de conteos
          } else {
            this.funciones.alerta("Error", "No se pudo realizar la comparación", "error");
          }
        },
        (error: any) => {
          console.error('Error al comparar los conteos:', error); // Manejo de errores
          this.funciones.alerta("Error", "Ocurrió un error al comparar los conteos", "error");
        }
      );
    });
    
  }

  // metodo para comparar conteo contra SAP
  public compararConteoSap(): void {
    // aqui vamos asignar los nombre de las columnas de la tabla 
    this.obtenerCabecerasTabla(this.informe);
    // Aquí vamosa consultar el servicio para traer los datos de la comparacion entre los dos conteos
    this.funciones.confirmacion("Confirmación", "¿Se van a comparar los conteos seleccionados, desea continuar?", "info", () => {
      // Aquí puedes agregar la lógica para comparar los conteos
      this.informesService.compararConteoSap(this.conteo, this.bodega).subscribe(
        (respuesta: any) => {  
          if (respuesta.estado === 'ok') {
            console.log('Respuesta de la comparación:', respuesta.datos);
            // vamos a asignar el resultado 
            this.datosInforme = respuesta.datos; // Asignar la respuesta a la lista de conteos
          } else {
            this.funciones.alerta("Error", "No se pudo realizar la comparación", "error");
          }
        },
        (error: any) => {
          console.error('Error al comparar los conteos:', error); // Manejo de errores
          this.funciones.alerta("Error", "Ocurrió un error al comparar los conteos", "error");
        }
      );
    });
  }

  // metodo para generar tercer conteo
  public generarTercerConteo(): void {
    // aqui vamos asignar los nombre de las columnas de la tabla 
    this.obtenerCabecerasTabla(this.informe);
    // Aquí vamosa consultar el servicio para traer los datos de la comparacion entre los dos conteos
    this.funciones.confirmacion("Confirmación", "¿Se van a generar las diferencias para el tercer conteo, desea continuar?", "info", () => {
      // Aquí puedes agregar la lógica para comparar los conteos
      this.informesService.generarTercerConteo(this.bodega).subscribe(
        (respuesta: any) => {  
          if (respuesta.estado === 'ok') {
            console.log('Respuesta de generar tercer conteo:', respuesta.datos);
            // vamos a asignar el resultado 
            this.datosInforme = respuesta.datos; // Asignar la respuesta a la lista de conteos
          } else {
            this.funciones.alerta("Error", "No se pudo realizar la comparación", "error");
          }
        },
        (error: any) => {
          console.error('Error al comparar los conteos:', error); // Manejo de errores
          this.funciones.alerta("Error", "Ocurrió un error al comparar los conteos", "error");
        }
      );
    });
  }

  // metodo para consultar el tercer conteo (diferencias entre conteo 1 y 2)
  public getTercerConteo(): void {
    // aqui vamos asignar los nombre de las columnas de la tabla 
    this.obtenerCabecerasTabla(this.informe);
    // Aquí vamosa consultar el servicio para traer los datos de la comparacion entre los dos conteos
    this.funciones.confirmacion("Confirmación", "¿Consultar los datos para tercer conteo, desea continuar?", "info", () => {
      // Aquí puedes agregar la lógica para comparar los conteos
      this.informesService.getTercerConteo(this.bodega).subscribe(
        (respuesta: any) => {  
          if (respuesta.estado === 'ok') {
            console.log('Respuesta de consultar tercer conteo:', respuesta.datos);
            // vamos a asignar el resultado 
            this.datosInforme = respuesta.datos; // Asignar la respuesta a la lista de conteos
          } else {
            this.funciones.alerta("Error", "No se encontraron datos.", "error");
          }
        },
        (error: any) => {
          console.error('Error al comparar los conteos:', error); // Manejo de errores
          this.funciones.alerta("Error", "Ocurrió un error al consultar conteo 3", "error");
        }
      );
    });
  }

  // metodo para generar diferencias entre conteo y SAP
  public generarDiferenciasSap(): void {
    // aqui vamos asignar los nombre de las columnas de la tabla 
    this.obtenerCabecerasTabla(this.informe);
    // Aquí vamosa consultar el servicio para traer los datos de la comparacion entre los dos conteos
    this.funciones.confirmacion("Confirmación", "¿Se van a generar las diferencias entre el conteo y SAP, desea continuar?", "info", () => {
      // Aquí puedes agregar la lógica para comparar los conteos
      this.informesService.generarDiferenciasSap(this.bodega, this.conteo).subscribe(
        (respuesta: any) => {   
          if (respuesta.estado === 'ok') {
            console.log('Respuesta de generar diferencias SAP:', respuesta.datos);
            // vamos a asignar el resultado 
            this.datosInforme = respuesta.datos; // Asignar la respuesta a la lista de conteos
          } else {
            this.funciones.alerta("Error", "No se pudo generar las diferencias con SAP", "error");
          }
        },
        (error: any) => {
          console.error('Error al comparar los conteos:', error); // Manejo de errores
          this.funciones.alerta("Error", "Ocurrió un error al comparar los conteos", "error");
        }
      );
    });
  }

  // metodo para consultar el tercer conteo (diferencias entre conteo 1 y 2)
  public getDiferenciasSap(): void {
    // aqui vamos asignar los nombre de las columnas de la tabla 
    this.obtenerCabecerasTabla(this.informe);
    // Aquí vamosa consultar el servicio para traer los datos de la comparacion entre los dos conteos
    this.funciones.confirmacion("Confirmación", "¿Consultar las diferenias entre el conteo y SAP, desea continuar?", "info", () => {
      // Aquí puedes agregar la lógica para comparar los conteos
      this.informesService.getDiferenciasSap(this.bodega, this.conteo).subscribe(
        (respuesta: any) => {  
          if (respuesta.estado === 'ok') {
            console.log('Respuesta de consultar Diferencias SAP:', respuesta.datos);
            // vamos a asignar el resultado 
            this.datosInforme = respuesta.datos; // Asignar la respuesta a la lista de conteos
          } else {
            this.funciones.alerta("Error", "No se encontraron datos.", "error");
          }
        },
        (error: any) => {
          console.error('Error al consultar las diferencias:', error); // Manejo de errores
          this.funciones.alerta("Error", "Ocurrió un error al consultar diferencias sap", "error");
        }
      );
    });
  }

  // metodo para mostrar informe totalizado
  public consultarTotalizado(): void {
    console.log('Conteo seleccionado:', this.conteo);
    // Aquí puedes agregar la lógica para mostrar el informe totalizado
  }

  // metodo para mostrar la info de un conteo por usuario
  public comparaConteoUsuario(): void { 
    console.log('Conteo seleccionado:', this.conteo);
    console.log('Usuario seleccionado:', this.usuarioSelect);
    // Aquí puedes agregar la lógica para mostrar la info de un conteo por usuario
  }

  // metodo para mostrar informe de conteos repetidos
  public consultarConteosRepetidos(): void {
    console.log('Conteo seleccionado:', this.conteo);
    // Aquí puedes agregar la lógica para mostrar el informe de conteos repetidos
  }

}

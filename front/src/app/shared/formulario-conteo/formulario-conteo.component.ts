import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Conteo } from './formulario-conteo.model';
import { FormularioConteoService } from './formulario-conteo.service';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-conteo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-conteo.component.html',
  styleUrl: './formulario-conteo.component.css'
})
export class FormularioConteoComponent {
  @Output() formSubmit = new EventEmitter<any>();
  @Input() public conteoAsignado: any; // Objeto que contiene el conteo asignado
  @Input() public inputDisabled: boolean = false; // Propiedad para habilitar/deshabilitar el input de código de barras

  public user = JSON.parse(localStorage.getItem("dataUsuario") || "{}"); // Obtener el usuario del localStorage

  conteo: Conteo = {
    id: null, // id (oculto)
    id_conteo: null, // Código Conteo (deshabilitado)
    linea_conteo: 0, // linea de lectura del conteo
    numero_conteo: 0, // Número Conteo
    codigo_bodega: '', // Bodega
    id_usuario_asignado: 0, // Usuario Asignado al conteo
    codigo_barras: '', // Codigo de barras del Artículo
    codigo_sap: '', // Codigo SAP del artículo
    descripcion_articulo: '', // Descripcion Artículo
    lote_articulo: '', // Lote
    fecha_vence: '', // Fecha Vencimiento
    cantidad_contada: null, // Cantidad contada
    correccion_conteo: null, // Fecha Vencimiento
    id_usuario_corrige: null, // Fecha Vencimiento
  };

  public cantidadContada: number = 0; // Variable para almacenar la cantidad contada

  public lotes: any[] = []; // Lista de lotes

  public listaConteos: any[] = []; // Lista de conteos

  constructor(
    private conteoService: FormularioConteoService, 
    private funciones: FuncionesService // Inyectar el servicio de funciones
  ) {}

  ngOnChanges(): void {
    if (this.conteoAsignado) {
      this.conteo = { ...this.conteoAsignado }; // Copiar los valores de conteoAsignado a conteo
      this.getLineaConteo(); // Invocar la función al cargar el componente
    }
    console.log('Datos recibidos en el formulario:', this.conteoAsignado);
  }

  ngOnInit(): void {
    // this.getLineaConteo(); // Invocar la función al cargar el componente
  }

  getLineaConteo(): void {
    
    this.conteoService.consultarLineaConteo(this.conteo.id_conteo).subscribe(
      (respuesta:any) => {
        if (respuesta.datos > 0) {
          console.log('linea mayor a cero:', respuesta.datos);
          this.conteo.linea_conteo = respuesta.datos + 1; // Asignar la línea de conteo al objeto conteo
        } else {
          this.conteo.linea_conteo = 1; // Si no hay datos, asignar la primera línea
          console.log('no es mayor a cero:', respuesta.datos);
        }
      },
      (error:any) => {
        console.error('Error al consultar los conteos asignados:', error);
      }
    );
  }

  consultarArticulo(): void {
    const codigoBarras = this.conteo.codigo_barras;
  
    if (!codigoBarras) {
      console.warn('El código de barras está vacío.');
      return;
    }
  
    this.conteoService.consultarArticuloPorCodigo(this.conteo.id_conteo, codigoBarras).subscribe(
      (respuesta) => {
        if (respuesta.datos) {
          let articulo = respuesta.datos; // Obtener el primer artículo de la respuesta
          // Asignar los datos del artículo al modelo `conteo`
          this.conteo.descripcion_articulo = articulo.codigo_sap + '-' + articulo.descripcion;
          this.conteo.codigo_sap = articulo.codigo_sap; // Asignar el código SAP al conteo
          
          // llenar select lotes 
          this.lotes = articulo.lotes; // Asignar los lotes a la variable `lotes`

          this.listaConteos = articulo.conteos; // Asignar los datos a la lista de conteos

        } else {
          console.warn('No se encontró el artículo con el código de barras proporcionado.');
        }
      },
      (error) => {
        console.error('Error al consultar el artículo:', error);
      }
    );
  }

  changeSelectLotes(cantidadInput: HTMLInputElement): void {
    cantidadInput.focus();

    // ahora vamos a tomar la fecha vencimiento del lote seleccionado
    const selectedLote = this.lotes.find(lote => lote.lote_articulo === this.conteo.lote_articulo);
    this.conteo.fecha_vence = selectedLote ? selectedLote.fecha_vence : ''; // Asignar la fecha de vencimiento al conteo
  }

  onSubmit() {
    
    this.conteo.cantidad_contada = this.cantidadContada; // Asignar la cantidad contada al conteo
    console.log('Conteo a enviar:', this.conteo); // Mostrar el conteo en la consola
    // this.formSubmit.emit(this.conteo);

    // validar si es actualizar o crear 
    if (this.conteo.id) { // Si el conteo tiene un ID, significa que es una actualización
      this.conteo.correccion_conteo = this.conteo.cantidad_contada; // Asignar la corrección de conteo
      this.conteo.id_usuario_corrige = this.user.id_usuario; // Asignar el ID del usuario que corrige

      // actualizar conteo 
      this.conteoService.actualizarConteo(this.conteo).subscribe(
        (respuesta) => {
          if (respuesta.estado === 'ok') {
            this.funciones.alerta('Éxito!', 'Conteo guardado correctamente.', 'success');
            this.limpiarForm(event); // Limpiar el formulario después de guardar
          } else {
            this.funciones.alerta('Error!', 'No se pudo guardar el conteo.', 'error');
          }
        },
        (error) => {
          console.error('Error al guardar el conteo:', error);
          this.funciones.alerta('Error!', 'Ocurrió un error al guardar el conteo.', 'error');
        }
      );
    } else {
      this.conteo.correccion_conteo = null; // Reiniciar la corrección de conteo
      this.conteo.id_usuario_corrige = null; // Reiniciar el ID del usuario que corrige
      
      // guardar conteo 
      this.conteoService.guardarConteo(this.conteo).subscribe(
        (respuesta) => {
          if (respuesta.estado === 'ok') {
            this.funciones.alerta('Éxito!', 'Conteo guardado correctamente.', 'success');
            this.limpiarForm(event); // Limpiar el formulario después de guardar
          } else {
            this.funciones.alerta('Error!', 'No se pudo guardar el conteo.', 'error');
          }
        },
        (error) => {
          console.error('Error al guardar el conteo:', error);
          this.funciones.alerta('Error!', 'Ocurrió un error al guardar el conteo.', 'error');
        }
      );
    } 
  }

  editarConteo(conteoEditar: any): void {
    console.log('Conteo a editar:', conteoEditar); // Mostrar el conteo a editar en la consola

    // eliminar propiedades innecesarias 
    delete conteoEditar.updated_at;
    delete conteoEditar.deleted_at;

    // asignar los datos del conteo a editar al objeto conteo 
    this.conteo = { ...conteoEditar }; // Asignar los valores del conteo a editar al objeto conteo
    this.cantidadContada = conteoEditar.cantidad_contada; // Asignar la cantidad contada al input
    this.conteo.id_usuario_corrige = this.user.id_usuario; // Asignar el ID del usuario que corrige al conteo
    
  }

  evitarEnter(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  limpiarForm(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.conteo.id = null; // Reiniciar el ID del conteo
    this.conteo.id_conteo = this.conteoAsignado.id_conteo; // Reiniciar el ID del conteo
    this.conteo.codigo_barras = ''; // Reiniciar el código de barras
    this.conteo.codigo_sap = ''; // Reiniciar el código SAP
    this.conteo.descripcion_articulo = ''; // Reiniciar la descripción del artículo
    this.conteo.lote_articulo = ''; // Reiniciar el lote del artículo
    this.conteo.fecha_vence = ''; // Reiniciar la fecha de vencimiento
    this.conteo.cantidad_contada = 0; // Reiniciar la cantidad contada

    this.lotes = []; // Reiniciar la lista de lotes
    this.listaConteos = []; // Reiniciar la lista de conteos

    this.getLineaConteo(); // Reiniciar la línea de conteo
    this.cantidadContada = 0; // Reiniciar la cantidad contada
  }

}

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
    existencias_sap:0, // Cantidad en SAP
    primer_conteo: null, // Cantidad contada
    segundo_conteo: null, // Cantidad contada
    diff_pri_seg_conteo: 0, // Diferencia entre primer y segundo conteo
    tercer_conteo: null, // Cantidad contada
    correccion_conteo: null, // Fecha Vencimiento
    id_usuario_corrige: null, // Fecha Vencimiento
  };

  public cantidadContada: number = 0; // Variable para almacenar la cantidad contada

  public lotes: any[] = []; // Lista de lotes

  constructor(
    private conteoService: FormularioConteoService, 
    private funciones: FuncionesService // Inyectar el servicio de funciones
  ) {}

  ngOnChanges(): void {
    if (this.conteoAsignado) {
      this.conteo = { ...this.conteoAsignado }; // Copiar los valores de conteoAsignado a conteo
    }
    console.log('Datos recibidos en el formulario:', this.conteoAsignado);
  }

  ngOnInit(): void {
    this.getLineaConteo(); // Invocar la función al cargar el componente
  }

  getLineaConteo(): void {
    
    this.conteoService.consultarLineaConteo(this.conteo.id_conteo).subscribe(
      (respuesta:any) => {
        if (respuesta.datos > 0) {
          this.conteo.linea_conteo = respuesta.datos + 1; // Asignar la línea de conteo al objeto conteo
        } else {
          this.conteo.linea_conteo = 1; // Si no hay datos, asignar la primera línea
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
          
          // llenar select lotes 
          this.lotes = articulo.lotes; // Asignar los lotes a la variable `lotes`

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
    
    this.conteo.primer_conteo = this.cantidadContada; // Asignar la cantidad contada al conteo
    console.log('Conteo a enviar:', this.conteo); // Mostrar el conteo en la consola
    this.formSubmit.emit(this.conteo);
  }

}

import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BannerCabeceraComponent } from 'src/app/core/layout/banner-cabecera/banner-cabecera.component';
import { FormularioConteoComponent } from 'src/app/shared/formulario-conteo/formulario-conteo.component';
import { ConteoInventarioService } from './conteo-inventario.service';
import { FuncionesService } from 'src/app/services/global/funciones.service';

@Component({
  selector: 'app-conteo-inventario',
  standalone: true,
  imports: [FormsModule, BannerCabeceraComponent, FormularioConteoComponent],
  templateUrl: './conteo-inventario.component.html',
  styleUrl: './conteo-inventario.component.css'
})
export class ConteoInventarioComponent {
  @ViewChild('formularioConteo') formularioConteo!: FormularioConteoComponent; // Referencia al componente hijo


  public user = JSON.parse(localStorage.getItem("dataUsuario") || "{}"); // Obtener el usuario del localStorage
  public conteoAsignado: any = {
    id_conteo: null,
    linea_conteo: null,
    numero_conteo: null,
    codigo_bodega: null,
    id_usuario_asignado: null,
    codigo_barras: null,
    codigo_sap: null,
    descripcion_articulo: null,
    lote_articulo: null,
    fecha_vence: null,
    cantidad_contada: null,
    correccion_conteo: null,
    id_usuario_corrige: null,
    id: null
  }; // Lista de conteos asignados


  constructor(
    private conteoService: ConteoInventarioService, 
    private funciones: FuncionesService // Inyectar el servicio de funciones
  ) {}

  ngOnInit(): void {
    this.consultarConteosAsignados(); // Consultar conteos al inicializar el componente
  }

  // Función para consultar conteos asignados al usuario logueado
  consultarConteosAsignados(): void {
    const idUsuario = this.user.id_usuario; // Obtener el ID del usuario logueado
    if (!idUsuario) {
      console.error('No se encontró el ID del usuario logueado.');
      return;
    }

    this.conteoService.obtenerConteosAsignados(idUsuario).subscribe(
      (respuesta) => {
        
        if (respuesta.datos.length > 0) {
          // Si hay conteos asignados, puedes realizar alguna acción adicional aquí
          this.conteoAsignado = respuesta.datos[0]; // Asignar los conteos a la variable
          this.conteoAsignado.id_conteo = respuesta.datos[0].id; // Asignar el ID del conteo
          this.conteoAsignado.linea_conteo = null; // Asignar la línea de conteo
          this.conteoAsignado.numero_conteo = respuesta.datos[0].numero_conteo; // Asignar el número de conteo
          this.conteoAsignado.codigo_bodega = respuesta.datos[0].codigo_bodega; // Asignar el código de bodega
          this.conteoAsignado.id_usuario_asignado = respuesta.datos[0].id_usuario_asignado; // Asignar el ID del usuario asignado
          this.conteoAsignado.codigo_barras = ''; // Inicializar el código de barras
          this.conteoAsignado.codigo_sap = ''; // Inicializar el código SAP
          this.conteoAsignado.descripcion_articulo = ''; // Inicializar la descripción del artículo
          this.conteoAsignado.lote_articulo = ''; // Inicializar el lote del artículo
          this.conteoAsignado.fecha_vence = ''; // Inicializar la fecha de vencimiento
          this.conteoAsignado.cantidad_contada = null; // Inicializar la cantidad contada
          this.conteoAsignado.correccion_conteo = null; // Inicializar la corrección de conteo
          this.conteoAsignado.id_usuario_corrige = null; // Inicializar el ID del usuario que corrige
          this.conteoAsignado.id = null; // Asignar el ID del conteo a null para que no se envíe al backend

          // ahora eliminaremos unos valores que no se necesitan 
          delete this.conteoAsignado.created_at;
          delete this.conteoAsignado.updated_at;
          delete this.conteoAsignado.deleted_at;
          delete this.conteoAsignado.articulo_inicial;
          delete this.conteoAsignado.articulo_final;
          delete this.conteoAsignado.estado_conteo;
          delete this.conteoAsignado.usuario_crea;
          delete this.conteoAsignado.fecha_asignado;
          delete this.conteoAsignado.fecha_finaliza_conteo;
          delete this.conteoAsignado.maneja_lote;
          console.log('Conteos asignados:', this.conteoAsignado);
          
        } else {
          this.funciones.alerta('Atención!', 'No se encontraron conteos asignados para el usuario.', 'info');
        }
      },
      (error) => {
        console.error('Error al consultar los conteos asignados:', error);
      }
    );
  }

  // ejecutarSubmit(): void {
  //   if (this.formularioConteo) {
  //     this.formularioConteo.onSubmit(); // Llamar al método onSubmit del componente hijo
  //   }
  // }

  handleFormSubmit(data: any) {
    console.log('Datos del formulario recibidos:', data);
    // Aquí puedes procesar los datos, enviarlos a un servicio o realizar otras acciones
  }

  finalizarConteo(): void {

    this.funciones.confirmacion('¿Está seguro de finalizar el conteo?', 'Esta acción no se puede deshacer.', 'warning', () => {
      
      this.conteoService.finalizarConteo(this.conteoAsignado.id_conteo).subscribe(
        (respuesta) => {
          if (respuesta.estado === 'ok') {
            this.funciones.alerta('Éxito!', 'Conteo finalizado correctamente.', 'success', () => {
              location.reload();
            });
          } else {
            this.funciones.alerta('Error!', 'No se pudo finalizar el conteo.', 'error');
          }
        },
        (error) => {
          console.error('Error al finalizar el conteo:', error);
          this.funciones.alerta('Error!', 'Ocurrió un error al finalizar el conteo.', 'error');
        }
      );
    });
  }

}

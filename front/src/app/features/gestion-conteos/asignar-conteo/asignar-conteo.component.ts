import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BannerCabeceraComponent } from 'src/app/core/layout/banner-cabecera/banner-cabecera.component';
import { AsignarConteoService } from './asignar-conteo.service'; // Importar el servicio
import { UsuarioService } from '../../../services/components/pages/configuracion/usuario/usuario.service';
import { Respuesta, Usuario, AsignaConteo, Bodega } from './asignar-conteo.model';
import { CommonModule } from '@angular/common';
import { FuncionesService } from 'src/app/services/global/funciones.service';

@Component({
  selector: 'app-asignar-conteo',
  standalone: true,
  imports: [FormsModule, BannerCabeceraComponent, CommonModule],
  templateUrl: './asignar-conteo.component.html',
  styleUrl: './asignar-conteo.component.css'
})
export class AsignarConteoComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem("dataUsuario") || "{}"); // Obtener el usuario del localStorage

  public conteo: any = {
    id: "",
    id_usuario_asignado: "",
    codigo_bodega: "",
    numero_conteo: "",
    estado_conteo: "",
    fecha_asignado: new Date().toISOString().slice(0, 10), // Obtener la fecha actual en formato YYYY-MM-DD
    articulo_inicial: "",
    articulo_final: "",
    usuario_crea: this.user.id_usuario, // Asignar el id del usuario que crea el conteo
  };

  public listaConteos: AsignaConteo[] = []; // Lista de conteos asignados
  public listaUsuarios: Usuario[] = []; // Lista de conteos asignados
  public listaBodegas: Bodega[] = []; // Lista de conteos asignados
  public listaDiferencias: any[] = []; // Lista de diferencias de conteos
  public listaDiferenciaArtFinal: any[] = []; // Lista de diferencias de conteos para el select articulo final

  constructor(
    private asignarConteoService: AsignarConteoService,
    private usuarioService: UsuarioService,
    private funciones:FuncionesService
  ) {} // Inyectar el servicio

  ngOnInit(): void {
    this.consultarListaConteos(); // Invocar la función al cargar el componente
    this.consultarUsuarios(); // Cargar usuarios al inicializar el componente
    this.consultarBodegas(); // Cargar bodegas al inicializar el componente
  }

  resetFormulario(): void {
    this.conteo = {
      id: "",
      id_usuario_asignado: "",
      codigo_bodega: "",
      numero_conteo: "",
      estado_conteo: "",
      fecha_asignado: new Date().toISOString().slice(0, 10), // Obtener la fecha actual en formato YYYY-MM-DD
      articulo_inicial: "",
      articulo_final: "",
      usuario_crea: this.user.id_usuario, // Asignar el id del usuario que crea el conteo
    };
  }

  setAsignarConteo() {
    if (this.conteo.id_usuario_asignado === "") {
      this.funciones.alerta('Error', 'Debes seleccionar un usuario asignado.', 'error');
      return;
      
    } else if(this.conteo.codigo_bodega === ""){
      this.funciones.alerta('Error', 'Debes seleccionar una bodega.', 'error');
      return;
      
    } else if(this.conteo.numero_conteo === ""){  
      this.funciones.alerta('Error', 'Debes seleccionar un número de conteo.', 'error');
      return;

    } else {

      this.funciones.confirmacion(
        'Confirmación', 
        '¿Estás seguro de asignar este conteo?', 
        'warning',
        () => {
          console.log('Conteo a asignar:', this.conteo); // Mostrar el conteo en la consola
          this.asignarConteoService.asignarConteo(this.conteo).subscribe(
            (respuesta) => {
              console.log('Conteo asignado correctamente:', respuesta);
              this.funciones.alerta(
                'Éxito',
                'El conteo fue asignado correctamente.',
                'success',
                () => {
                  this.consultarListaConteos(); // Actualizar la lista después de cerrar la alerta
                  this.resetFormulario(); // Limpiar el formulario después de asignar el conteo
                }
              );
            },
            (error) => {
              console.error('Error al asignar el conteo:', error);
              this.funciones.alerta('Error', 'Ocurrió un error al asignar el conteo.', 'error');
            }
          );
        }
      );
    }
  }

  consultarListaConteos() {
    this.asignarConteoService.obtenerListaConteos().subscribe(
      (respuesta) => {
        this.listaConteos = respuesta.datos;
        console.log("Lista de conteos cargada:", this.listaConteos);
      },
      (error) => {
        console.error("Error al cargar la lista de conteos:", error);
      }
    );
  }

  consultarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (respuesta: Respuesta<Usuario[]>) => {
        console.log("Usuarios cargados:", respuesta.datos);
        this.listaUsuarios = respuesta.datos; // Asignar los usuarios al select
      },
      (error:any) => {
        console.error("Error al cargar los usuarios:", error);
      }
    );
  }

  obtenerNombreUsuario(id_usuario: number): string {
    const usuario = this.listaUsuarios.find(user => user.id_usuario === id_usuario);
    return usuario ? usuario.tx_nombre : "Usuario no encontrado";
  }

  consultarBodegas() {
    this.asignarConteoService.obtenerListaBodegas().subscribe(
      (respuesta: Respuesta<Bodega[]>) => {
        console.log("Usuarios cargados:", respuesta.datos);
        this.listaBodegas = respuesta.datos; // Asignar los usuarios al select
      },
      (error:any) => {
        console.error("Error al cargar los usuarios:", error);
      }
    );
  }

  consultaListasDiferencias() {

    this.conteo.articulo_inicial = ""; // Limpiar el artículo inicial al cambiar el conteo
    this.conteo.articulo_final = ""; // Limpiar el artículo final al cambiar el conteo

    if (this.conteo.codigo_bodega) {
      if (this.conteo.numero_conteo == 3) {
        // Consultar diferencias de conteo 3
        this.consultarListaDiferenciasConteos(this.conteo.codigo_bodega);
      }
      if (this.conteo.numero_conteo == 5) {
        // consultar diferencias entre conteo y SAP
        this.consultarListaDiferenciasConteosSap(this.conteo.codigo_bodega); // Consultar diferencias de conteos con SAP
      }
      
    }
  }

  consultarListaDiferenciasConteos(idBodga: string) {
    this.asignarConteoService.obtenerConteosDiferencias(idBodga).subscribe(
      (respuesta) => {
        console.log("Lista diferencias cargados:", respuesta.datos);
        this.listaDiferencias = respuesta.datos; // Asignar las diferencias al select
      },
      (error:any) => {
        console.error("Error al cargar los datos:", error);
      }
    );
  }

  consultarListaDiferenciasConteosSap(idBodga: string) {
    this.asignarConteoService.obtenerConteosDiferenciasSap(idBodga).subscribe(
      (respuesta) => {
        console.log("Lista diferencias sap cargados:", respuesta.datos);
        this.listaDiferencias = respuesta.datos; // Asignar las diferencias al select
      },
      (error:any) => {
        console.error("Error al cargar los datos:", error);
      }
    );
  }

  listaArticuloFinal(){
    if (this.conteo.articulo_inicial) {
      // primero debemos capturar el id del articulo 
      const articuloInicial = this.listaDiferencias.find(
        (articulo) => articulo.codigo_sap === this.conteo.articulo_inicial
      );
      
      this.listaDiferenciaArtFinal = this.listaDiferencias.filter(
        (articulos) => articulos.id >= articuloInicial.id
      );
      console.log("Lista de diferencias:", this.listaDiferenciaArtFinal);
    } else {
      this.listaDiferenciaArtFinal = []; // Limpiar la lista si no hay artículo inicial
    }
  }

  editarConteo(conteo: any): void {
    console.log('Editar conteo:', conteo);

    // this.conteo.codigo_bodega = conteo.codigo_bodega; // Asignar el código de bodega al conteo
    // this.conteo.numero_conteo = conteo.numero_conteo; // Asignar el número de conteo al conteo
    this.conteo = { ...conteo }; // Cargar los datos del conteo en el formulario

    this.consultaListasDiferencias(); // Consultar las diferencias al editar un conteo

    setTimeout(() => {

      this.conteo.articulo_inicial = conteo.articulo_inicial; // Asignar el artículo inicial al conteo
      this.listaDiferenciaArtFinal = []; // Limpiar la lista de diferencias al editar un conteo
      this.listaArticuloFinal();

      setTimeout(() => {

        this.conteo.articulo_final = conteo.articulo_final; // Asignar el artículo final al conteo

      }, 300); // Esperar 300 ms para que se carguen las diferencias
    }, 300); // Esperar 300 ms para que se carguen las diferencias

  }

  actualizarConteo(): void {
    this.funciones.confirmacion(
      'Confirmación',
      '¿Estás seguro de actualizar este conteo?',
      'warning',
      () => {
        console.log('Conteo a actualizar:', this.conteo); // Mostrar el conteo en la consola
        this.asignarConteoService.actualizarConteo(this.conteo.id, this.conteo).subscribe(
          (respuesta) => {
            console.log('Conteo actualizado correctamente:', respuesta);
            this.funciones.alerta(
              'Éxito',
              'El conteo fue actualizado correctamente.',
              'success',
              () => {
                this.consultarListaConteos(); // Actualizar la lista después de cerrar la alerta
                this.resetFormulario(); // Limpiar el formulario después de actualizar
              }
            );
          },
          (error) => {
            console.error('Error al actualizar el conteo:', error);
            this.funciones.alerta('Error', 'Ocurrió un error al actualizar el conteo.', 'error');
          }
        );
      }
    );
  }

  eliminarConteo(id: number): void {
    this.funciones.confirmacion(
      '¿Estás seguro de eliminar este conteo?',
      'Confirmación',
      'warning',
      () => {
        // Acción si el usuario confirma
        this.asignarConteoService.eliminarConteo(id).subscribe(
          (respuesta) => {
            console.log('Conteo eliminado correctamente:', respuesta);
            this.funciones.alerta('El conteo fue eliminado correctamente.', 'Éxito', 'success');
            this.consultarListaConteos(); // Actualizar la lista después de eliminar
          },
          (error) => {
            console.error('Error al eliminar el conteo:', error);
            this.funciones.alerta('Ocurrió un error al eliminar el conteo.', 'Error', 'error');
          }
        );
      },
      () => {
        console.log('El usuario canceló la eliminación.');
      }
    );
  }

  getEstadoDescripcion(estado: number): string {
    switch (estado) {
      case 0:
        return 'Asignado';
      case 1:
        return 'Iniciado';
      case 2:
        return 'Finalizado';
      default:
        return 'Desconocido'; // Para manejar valores inesperados
    }
  }

  nombreConteo(numero: number): string {
    switch (numero) {
      case 1:
        return 'Primer Conteo';
      case 2:
        return 'Segundo Conteo';
      case 3:
        return 'Tercer Conteo';
      case 4:
        return 'Vencidos';
      case 5:
        return 'Conteo Diferencia SAP';
      default:
        return 'Desconocido'; // Para manejar valores inesperados
    }
  }

  cancelarEdicion(): void {
    console.log('Edición cancelada');
    this.resetFormulario(); // Restablecer el formulario al estado inicial
  }
}
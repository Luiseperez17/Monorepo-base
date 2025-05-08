import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BannerCabeceraComponent } from 'src/app/core/layout/banner-cabecera/banner-cabecera.component';
import { FormularioConteoComponent } from 'src/app/shared/formulario-conteo/formulario-conteo.component';
import { ConteoInventarioService } from './conteo-vencidos.service';
import { FuncionesService } from 'src/app/services/global/funciones.service';

@Component({
  selector: 'app-conteo-vencidos',
  standalone: true,
  imports: [FormsModule, BannerCabeceraComponent, FormularioConteoComponent],
  templateUrl: './conteo-vencidos.component.html',
  styleUrl: './conteo-vencidos.component.css'
})
export class ConteoVencidosComponent {

  public user = JSON.parse(localStorage.getItem("dataUsuario") || "{}"); // Obtener el usuario del localStorage
  public conteoAsignado: any = {}; // Lista de conteos asignados

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
  
      this.conteoService.obtenerConteosAsignadosVencidos(idUsuario).subscribe(
        (respuesta) => {
          
          if (respuesta.datos.length > 0) {
            // Si hay conteos asignados, puedes realizar alguna acción adicional aquí
            this.conteoAsignado = respuesta.datos[0]; // Asignar los conteos a la variable
            this.conteoAsignado.id_conteo = respuesta.datos[0].id; // Asignar el ID del conteo
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
  
    handleFormSubmit(data: any) {
      console.log('Datos del formulario recibidos:', data);
      // Aquí puedes procesar los datos, enviarlos a un servicio o realizar otras acciones
    }

}

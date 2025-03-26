import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/components/pages/configuracion/usuario/usuario.service';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import * as CryptoJS from 'crypto-js';

declare var $:any;
@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit{

  //declaracion de variables
  dataUsuario: any = JSON.parse(localStorage["dataUsuario"]);
  dataSesion: any;
  idUsuario: any = this.dataUsuario.id_usuario;
  EmpleadoS: any;
  Perfiles: any;
  almacen: any;
  public ActualizarUsuario:any = "Actualizar usuarios"
  public creaUsuario:boolean  = true;
  creaPerfil:any;
  idPerfil:any;
  dataUsuarios:any;
  searchResults: any[] = [];
  pageNumber =1;
  tipoalmacen: any;
  datos: any;
  public centroCostos: any;
  public listPrecio: any;
  public datoCargo: any;
  public contrasena:any = "";
  public confirmarContrasena:any= "";
  public correo:any ="";
  public nombre: any;

  constructor(public router: Router, private funciones: FuncionesService, private http: HttpClient, private sUsuario: UsuarioService) {}

  public usuario: any = {
    tx_usuario: "",
    tx_nombre: "",
    cd_sap: "",
    in_cargo: "",
    in_perfil: "",
    tx_correo: "",
    tx_cencos: "",
    tx_almacen: "",
    in_lstaprecios: "",
    in_tpo_sel_sn: "",
    in_modprdto: "",
    tx_empleado_sap:"",
  };

  ngOnInit(): void {
    if (this.funciones.haySesion()) {
      const dataUsuarioString = sessionStorage['dataUsuario'];
      if (dataUsuarioString) { // Verifica si dataUsuarioString está definido
        this.dataSesion = JSON.parse(dataUsuarioString);
        this.funciones.setLoginPage(true);
      } else {
        // Si dataUsuarioString no está definido, realiza alguna acción apropiada, como redirigir al usuario o mostrar un mensaje de error.
      }
    } else {
      this.router.navigate(['']);
    }

    this.buscarUsuario(this.idUsuario);
    this.perfiles();
  }
  consultousuarios(){
    this.sUsuario.getUsuarios().subscribe((respUsuarios: any) => {
      this.dataUsuarios = respUsuarios["datos"];
      console.log(this.dataUsuarios)
      this.searchResults = [...this.dataUsuarios];
      this.pageNumber = 1; // Restablece el número de página a 1
    });
  }

  perfiles() {
    this.sUsuario.getPerfiles().subscribe((res_perfiles: any) => {
      this.Perfiles = res_perfiles["datos"];

    });
  }

buscarUsuario(idUsuario:any){
  this.creaUsuario = false;
  this.idUsuario = idUsuario;
  this.sUsuario.getUsuariosid(this.idUsuario).subscribe((Response:any)=>{
    this.usuario={
      tx_usuario:Response["datos"].tx_usuario,
      tx_nombre:Response["datos"].tx_nombre,
      in_perfil:parseInt (Response["datos"].in_perfil,),
      tx_correo:Response["datos"].tx_correo, 
  };
  })
}
  
  actualizarUsuario() {
    this.usuario.clave = CryptoJS.MD5(this.usuario.clave || '').toString();
    
    this.funciones.confirmacion("Atención!", "Está a punto de actualizar el usuario, ¿Desea continuar?", "info", () => {
      console.log(this.usuario.clave);
      this.usuario.in_modprdto = this.usuario.in_modprdto ? 1 : 0;
      if (this.usuario.in_modprdto === 0) {
        this.usuario.in_tpo_sel_sn = 3;
      }
      
    });
  }
  
  
  

  crearUsuario() {
  if (this.usuario.tx_usuario == "") {
    this.funciones.alerta("¡Atención!", "El usuario es requerido.", "info", () => {});
  } else if (this.usuario.tx_nombre == "") {
    this.funciones.alerta("¡Atención!", "El nombre es requerido.", "info", () => {});
  } else if (this.usuario.in_perfil == "") {
    this.funciones.alerta("¡Atención!", "Seleccione un perfil para el usuario a crear.", "info", () => {});
  } else if (this.usuario.email == "") {
    this.funciones.alerta("¡Atención!", "El correo electrónico es requerido.", "info", () => {});
  }  else {
    // Resto del código...

      //verifico
      this.usuario.clave = CryptoJS.MD5(this.usuario.clave).toString();
      // const requestMethod = this.creaUsuario ? 'crear' : 'actualizar';
        this.funciones.confirmacion("Atención!", "Está a punto de Actualizar el usuario, ¿Desea continuar?", "info", () => {
          
              this.usuario.in_modprdto = this.usuario.in_modprdto == true?1:0
              if(this.usuario.in_modprdto == ""){
                this.usuario.in_tpo_sel_sn = 3;
              }
        });
    }
      
  }


  actualizarContrasena() {
    if (this.contrasena === "") {
      this.funciones.alerta("¡Atención!", "La contraseña es requerida.", "info", () => {});
      $('#modaActualiza').modal('show');
    } else if (this.confirmarContrasena === "") {
      this.funciones.alerta("¡Atención!", "La confirmación de contraseña es requerida.", "info", () => {});
      $('#modaActualiza').modal('show');
    } else if (this.contrasena !== this.confirmarContrasena) {
      this.funciones.alerta("¡Atención!", "Las contraseñas no coinciden.", "info", () => {});
      $('#modaActualiza').modal('show');
    } else {
      $('#modaActualiza').modal('show');
      this.funciones.confirmacion("¡Atención!", "Está a punto de actualizar la contraseña, ¿Desea continuar?", "info", () => {
        const claveU = CryptoJS.MD5(this.confirmarContrasena).toString();
        this.sUsuario.crearPass(this.idUsuario, claveU, 0).subscribe((response: any) => {
          if (response["datos"] == 1) {
            $('#modaActualiza').modal('hide');
            this.funciones.alerta("¡Atención!", "Contraseña actualizada correctamente.", "success", () => {});
          } else {
            this.funciones.alerta("¡Atención!", "La contraseña no fue actualizada.", "error", () => {});
          }
        });
      });
    }
  }  
  
  actualizar() {
    if (this.usuario.tx_correo === "") {
      this.funciones.alerta("¡Atención!", "El correo electrónico es requerido.", "info", () => {});
    } else if (this.usuario.tx_nombre === "") {
      this.funciones.alerta("¡Atención!", "El nombre es requerido.", "info", () => {});
    } else if (this.funciones.validaEmail(this.usuario.tx_correo)) {
      this.funciones.confirmacion("¡Atención!", "Por favor, ingrese un correo válido.", "info", () => {});
    } else {
      this.funciones.confirmacion("¡Atención!", "Está a punto de actualizar el usuario, ¿Desea continuar?", "info", () => {
        this.sUsuario.update(
          this.idUsuario,
          this.usuario.tx_usuario,
          this.usuario.tx_nombre,
          this.usuario.in_perfil,
          this.usuario.tx_correo,
        ).subscribe(
          (response: any) => {
            this.consultousuarios();
            this.funciones.alerta("¡Atención!", "El usuario se ha actualizado exitosamente.", "success", () => {});
          },
          (error: any) => {
            this.funciones.alerta("¡Error!", "Hubo un error al crear el usuario.", "error", () => {});
          }
        );
      });
    }
  }
}  
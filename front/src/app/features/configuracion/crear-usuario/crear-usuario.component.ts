import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/services/components/pages/configuracion/usuario/usuario.service';
import { PermisosService } from 'src/app/services/global/permisos.service';
declare var $:any;
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit, AfterViewInit {
  @ViewChild('selectUsuario') selectUsuario!: ElementRef;

  //Declaracion de variables
  public CrearUsuario:any = "Registrar de usuarios";
  public ActualizarUsuario:any = "Actualizar usuarios";
  public tituloModulo:any = "Usuarios";
  public Usuarios:any;
  public creaUsuario:boolean  = true;
  public idUsuario:any;
  public modalAbierto:any;
  dataSesion: any;
  public dataUsuarios:any;
  searchResults: any[] = [];
  Usuario:any;
  public Perfiles:any;
  public dataLogin:any = [];

   //pipe's
   searchText: any;
   pageNumber = 1;
   pageSize =  10;//total de registros por pagina
   totalPages = 1;
  idModulo: any;
  permisosModulo: any;

  constructor(public router:Router,
              private funciones:FuncionesService,
              private http:HttpClient,
              private sUsuario:UsuarioService,
              private permisos:PermisosService,
              private ar:ActivatedRoute){}

  public usuario:any={
      tx_usuario:"",
      tx_nombre:"",
      in_perfil:"",
      tx_correo:"",
  };



  ngOnInit(): void {
    const dataLoginString = localStorage.getItem('dataUsuario');
    if (dataLoginString !== null) {
      this.dataLogin = JSON.parse(dataLoginString);
      this.ar.paramMap.subscribe(params => {
        this.idModulo = params.get('id');
        //consulto los permisos
        this.permisos.getPermisos(this.idModulo,this.dataLogin.in_perfil).subscribe((json:any)=>{
          this.permisosModulo = json.datos[0];
        });
      });
    }else{
      // Manejar el caso donde 'session' es null
      console.error('No se encontró la sesión en sessionStorage');
    }

    //consulto Usuarios
    this.consultousuarios();
    this.perfiles();
  }

  consultousuarios(){
    this.sUsuario.getUsuarios().subscribe((respUsuarios: any) => {
      this.dataUsuarios = respUsuarios["datos"];
      this.searchResults = [...this.dataUsuarios];
      this.pageNumber = 1; // Restablece el número de página a 1
      this.calculateTotalPages();
    });
  }
  //perfiles
  perfiles(){
    this.sUsuario.getPerfiles().subscribe((res_perfiles: any)=>{
    this.Perfiles = res_perfiles["datos"];
    });
  }

  //buscador de usuario
  buscarUsuarios(searchText: string) {
    this.searchResults = this.dataUsuarios.filter((item: {[x: string]: { toString:() => string;};}) =>
      Object.keys(item).some(key => {
        const value = item[key];
        return value !== null && value !== undefined && value.toString().toLowerCase().includes(searchText.toLowerCase());
      })
    );
    this.pageNumber = 1;
    this.calculateTotalPages();
  }
  ngAfterViewInit() {
    $(this.selectUsuario.nativeElement).select2(); // Inicializar Select2 en el elemento
  }


  //paginado
  changePage(page: number){this.pageNumber = Math.max(1, Math.min(page, this.totalPages));}
  nextPage(){this.changePage(this.pageNumber + 1);}
  previousPage(){this.changePage(this.pageNumber - 1);}
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.searchResults.length / this.pageSize);
    this.changePage(this.pageNumber);
  }
  //fin paginador


  crear(){
    this.creaUsuario = true;
    this.Usuario = null;
    this.usuario={tx_usuario:"",
      tx_nombre:"",
      in_perfil:"",
      tx_correo:"", };
  }

  actualizar(idUsuario:any){
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
  // eliminar el usuario
  eliminar(idUsuario:any){
    $('#modaCrea').modal('hide');
    this.funciones.confirmacion("Atención!", "Está a punto de eliminar el usuario, ¿Desea continuar?", "info", () => {
      this.sUsuario.delete(idUsuario).subscribe((res: any) => {
        if(res.datos == 1){
          this.funciones.alerta("Atención!", "El usuario se ha eliminado correctamente", "success", () => {});
          this.consultousuarios();
        }else{
          this.funciones.alerta("Atención!",res.mensaje, "error", () => {});
        }
      });
    });
  }
  //crear contraseña
  crearContrasena(id_usuario:any,email:any){
    $('#modaCrea').modal('hide');
    const randomPassword = this.generateRandomPassword();
    const claveU = CryptoJS.MD5(randomPassword).toString();
    const primera_vez = 1;
    this.funciones.confirmacion("Atención!", "Está a punto de crear contraseña para el usuario, ¿Desea continuar?", "info", () => {
      this.sUsuario.crearPass(id_usuario,claveU,primera_vez).subscribe((res: any) => {
        if(res.datos == 1){
          this.funciones.alerta("Atención!", "La contraseña se ha creado exitosamente <br><strong> Usuario: </strong>"+email+"<br> <strong>Contraseña: </strong>"+randomPassword , "success", () => {});
        }
        else{
          this.funciones.alerta("Atención!",res.mensaje, "error", () => {});
        }
        });
    });


  }
  //contraseña
  generateRandomPassword(): string {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }

  obtenerNombrePerfil(idPerfil: any): string {
    const perfiles =  this.Perfiles;
    for (const perfil of perfiles) {
        if (perfil.id_perfil == idPerfil) {
            return perfil.tx_descripcion;
        }
    }
    return 'Perfil no encontrado';
  }

  //crear usuario
  crearUsuario(){

    if(this.usuario.tx_usuario == ""){
      this.funciones.alerta("Atención!","El usuario es requerido.","info",()=>{});
    }else if(this.usuario.tx_nombre == ""){
      this.funciones.alerta("Atención!","El nombre es requerido.","info",()=>{});
    }else if(this.usuario.in_perfil == ""){
      this.funciones.alerta("Atención!","Seleccione un perfil para el usuario a crear","info",()=>{});
    }else if(this.usuario.email == ""){
      this.funciones.alerta("Atención!","El Email es requerido.","info",()=>{});
    }else{
      this.usuario.clave = CryptoJS.MD5(this.usuario.clave).toString();
      const requestMethod = this.creaUsuario ? 'crear' : 'actualizar';
        this.funciones.confirmacion("Atención!", "Está a punto de " + (this.creaUsuario ? "crear" : "actualizar") + " el usuario, ¿Desea continuar?", "info", () => {
            if(this.creaUsuario){
              this.usuario.in_modprdto = this.usuario.in_modprdto == true?1:0
              if(this.usuario.in_modprdto == ""){
                this.usuario.in_tpo_sel_sn = 3;
              }this.sUsuario.create(this.usuario.tx_usuario,
                                      this.usuario.tx_nombre,
                                      this.usuario.in_perfil,
                                      this.usuario.tx_correo,
                                      ).subscribe(
                  (response: any) => {
                      this.consultousuarios();
                      this.funciones.alerta("Atención!", "El usuario se ha creado exitosamente.", "success", () => {});
                        $('#modaCrea').modal('hide');
                    },(error: any) => {
                        this.funciones.alerta("Error!", "Hubo un error al crear el usuario.", "error", () => {});
                    }
                );
            }else{
              this.usuario.in_modprdto = this.usuario.in_modprdto == true?1:0
              if(this.usuario.in_modprdto == ""){
                this.usuario.in_tpo_sel_sn = 0;
              }this.sUsuario.update(this.idUsuario,
                                    this.usuario.tx_usuario,
                                    this.usuario.tx_nombre,
                                    this.usuario.in_perfil,
                                    this.usuario.tx_correo,
                                    ).subscribe(
                    (response: any) => {
                        $('#modaCrea').modal('hide');
                        this.funciones.alerta("Atención!", "El usuario se ha actualizado exitosamente.", "success", () => {});
                        this.consultousuarios();
                    },(error: any) => {
                        this.funciones.alerta("Error!", "Hubo un error al actualizar el usuario.", "error", () => {});
                    }
                );
            }
        });
    }
  }
}

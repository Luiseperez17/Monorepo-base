import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { PerfilesService } from 'src/app/services/components/pages/configuracion/perfiles/perfiles.service';
import { environment } from 'src/environments/environment';
import { PermisosService } from 'src/app/services/global/permisos.service';
import { ModulosService } from 'src/app/services/components/admin/modulos/modulos.service';
declare var $:any;


@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit  {
  
  [x: string]: any;
 
  //Declaracion de variables
  public CrearUsuario:any = "Registrar Perfiles";
  public ActualizarUsuario:any = "Actualizar Perfiles";
  public tituloModulo:any = "Perfiles";
  public Usuarios:any;
  public creaPerfil:boolean  = true;
  public idPerfil:any;
  dataSesion: any;
  public dataPerfiles:any;
  totalItems!:number;
  searchResults: any;
  idModulo:any;
  permisosModulo:any;
  dataLogin:any;

  //pipe's
  searchText: any;
  pageNumber = 1;
  pageSize =  environment.registros;//total de registros por pagina
  totalPages = 1;

  constructor(public router:Router, private funciones:FuncionesService,private http:HttpClient,private sPerfil:PerfilesService,private permisos:PermisosService,private ar:ActivatedRoute,private modulosService:ModulosService){}


  public datosPerfil:any={
    tx_descripcion:"",
    in_estado:"",
  };

  public dataEstados:any =[
    {"id_estado":1,"nombre_estado":"Activo"},
    {"id_estado":2,"nombre_estado":"Inactivo"}
  ]

  ngOnInit(): void {

    // valido si hay sesion
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
    //consulto todos los perfiles
    this.consultarPerfiles();
    // this.consultarEstados();

  }
  // consultarEstados(){
  //   this.sPerfil.getEstados().subscribe((respEstados: any) => {
  //     this.dataEstados = respEstados["datos"];
  //   });
  // }

  //consulto perfiles
  consultarPerfiles(){
    this.sPerfil.getAll().subscribe((respPerfiles: any) => {
      this.dataPerfiles = respPerfiles["datos"];
      this.searchResults = [...this.dataPerfiles];
      this.pageNumber = 1; // Restablece el número de página a 1
      this.calculateTotalPages();
    });
  }
  //buscador
  buscarPerfiles(searchText: string) {
    this.searchResults = this.dataPerfiles.filter((item: {[x: string]: { toString:() => string;};}) =>
      Object.keys(item).some(key => item[key].toString().toLowerCase().includes(searchText.toLowerCase()))
    );
    this.pageNumber = 1;
    this.calculateTotalPages();
  }
  //paginado
  changePage(page: number){this.pageNumber = Math.max(1, Math.min(page, this.totalPages));}
  
  nextPage(){this.changePage(this.pageNumber + 1);}
  previousPage(){this.changePage(this.pageNumber - 1);}
  
  calculateTotalPages(){
    this.totalPages = Math.ceil(this.searchResults.length / this.pageSize);
    this.changePage(this.pageNumber);
  }
  //fin paginador
  
  //modal Crear
  crear(){
    this.creaPerfil = true;
    this.idPerfil = null;
    this.datosPerfil = { tx_descripcion: "", Estado: "" };
  }

  //actualizar
  actualizar(idperfil: any){
    this.creaPerfil = false;
    this.idPerfil = idperfil;
    this.sPerfil.getPerfilPorId(idperfil).subscribe((perfil: any) => {
        this.datosPerfil = {
            tx_descripcion: perfil["datos"].tx_descripcion,
            in_estado: perfil["datos"].in_estado 
        };
        $('#modaCrea').modal('show');
    });
  }

  //modal eliminar
  eliminar(idperfil:any){
    $('#modaCrea').modal('hide');
    this.funciones.confirmacion("Atención!","Está a punto de eliminar el perfil, ¿Desea continuar?","info",()=>{
      this.sPerfil.delete(idperfil).subscribe((perfil: any) => {
        if(perfil){
          this.consultarPerfiles();
          this.funciones.alerta("Atención!", "El perfil se ha eliminado correctamente.", "success", () => {});
        }else{
          this.consultarPerfiles();
          this.funciones.alerta("Atención!", "El perfil no pudo ser eliminada", "info", () => {});
        }
      });
    });
  }

  //crear usuario
  crearPerfil(){
    if(this.datosPerfil.tx_descripcion == ""){
        this.funciones.alerta("Atención!", "La descripción es requerida.", "info", () => {});
    }else if(this.datosPerfil.in_estado == ""){
        this.funciones.alerta("Atención!", "El estado es requerido.", "info", () => {});
    }else{
        const requestMethod = this.creaPerfil ? 'crear' : 'actualizar';
        this.funciones.confirmacion("Atención!", "Está a punto de " + (this.creaPerfil ? "crear" : "actualizar") + " el perfil, ¿Desea continuar?", "info", () => {
            // Según la petición de la API, decide si crear o actualizar el perfil
            if (this.creaPerfil) {
                // Lógica para crear un nuevo perfil
                this.sPerfil.create(this.datosPerfil.tx_descripcion, parseInt(this.datosPerfil.in_estado)).subscribe(
                  (response: any) => {
                      this.consultarPerfiles();
                      this.funciones.alerta("Atención!", "El Perfil se ha creado exitosamente.", "success", () => {});
                        $('#modaCrea').modal('hide');
                    },
                    (error: any) => {
                        console.error('Error al crear el perfil:', error);
                        this.funciones.alerta("Error!", "Hubo un error al crear el perfil.", "error", () => {});
                    }
                );
            }else{
                // Lógica para actualizar un perfil existente
                this.sPerfil.update(this.idPerfil, this.datosPerfil.tx_descripcion, parseInt(this.datosPerfil.in_estado)).subscribe(
                    (response: any) => {
                        $('#modaCrea').modal('hide');
                        this.funciones.alerta("Atención!", "El Perfil se ha actualizado exitosamente.", "success", () => {});
                        this.consultarPerfiles();
                    },
                    (error: any) => {
                        console.error('Error al actualizar el perfil:', error);
                        this.funciones.alerta("Error!", "Hubo un error al actualizar el perfil.", "error", () => {});
                    }
                );
            }
        });
    }
  }


}
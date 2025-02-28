import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { Modulos } from 'src/app/models/modulos/modulos.model';
import { ModulosService } from 'src/app/services/components/admin/modulos/modulos.service';
import { EmisorService } from 'src/app/services/global/emisor.service';
import { LoginService } from 'src/app/services/components/pages/login/login.service';
import { PermisosService } from 'src/app/services/global/permisos.service';
import { MenuComponent } from 'src/app/components/layout/menu/menu.component';
declare var $:any;//por si quiero usar jquery


@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent implements OnInit{

  @ViewChild(MenuComponent)
  menuComponent!: MenuComponent;

  public idModulo:any;
  public infoCategoria:Modulos;
  public infoCatmodulos:Modulos;
  public infoModulo:Modulos;
  public listaCategorias:any = [];
  public listaModulos:any = [];
  public listaPermisos:any = [];
  public dataLogin:any = [];
  public permisosModulo:any = [];
  constructor(private funciones:FuncionesService,private modulosService:ModulosService,private emisor:EmisorService,private loginService:LoginService,private router:Router,private ar:ActivatedRoute,private permisos:PermisosService){
    this.infoCategoria  = {_id:0,idPadre:0,esPadre:1,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
    this.infoCatmodulos  = {_id:0,idPadre:0,esPadre:0,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
    this.infoModulo     = {_id:0,idPadre:0,esPadre:0,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'layout-dashboard',orden:1,estado:1,eliminado:0}
  }




  ngOnInit(): void {

      const dataLoginString = localStorage.getItem('dataUsuario');
      // Verificar si el valor no es null antes de intentar parsearlo
      if (dataLoginString !== null) {
        // Parsear el valor como JSON
        this.dataLogin = JSON.parse(dataLoginString);
        //consulto los permisos
        //capturo el parámetro del módulo visitado
        this.ar.paramMap.subscribe(params => {
          this.idModulo = params.get('id');
          //consulto los permisos
          this.permisos.getPermisos(this.idModulo,this.dataLogin.in_perfil).subscribe((json:any)=>{
            this.permisosModulo = json.datos[0];
           // console.log(this.permisosModulo,"PERMISOS");
          });
        });
        
      } else {
        // Manejar el caso donde 'session' es null
        console.error('No se encontró la sesión en sessionStorage');
        // Puedes asignar un valor por defecto, mostrar un mensaje de error, etc.
      }
      
      
    // }
    //FIN DE TODO ESTO SE DEBE IMPLEMENTAR PARA PODER TENER PERMISOS EN EL SISTEMA


    //llamo las categorias principales de los módulos
    this.getCategorias();  
  }

  ngOnDestroy(): void {
    console.log("se destruye el componente")
  }

  getCategorias(){
    this.modulosService.get().subscribe((json:any)=>{
      this.listaCategorias = json.datos;
    });
  }

  reseteoGeneral(){
    //reseteo la información del módulo
    this.infoModulo  = {_id:0,idPadre:0,esPadre:0,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
    //reseteo la información de la categoria
    this.infoCategoria  = {_id:0,idPadre:0,esPadre:1,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
    //reseteo la información de la categoría seleccionada 
    this.infoCatmodulos = {_id:0,idPadre:0,esPadre:0,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0};
    
  }

  abreModalCrearCategorias(){
    this.reseteoGeneral();
    //asigno el padre que tendrá este módulo que voy a crear
    this.infoModulo.idPadre = this.infoCatmodulos._id;
    $("#modalCategorias").modal("show");
    if(this.infoModulo._id == 0){//si es un nuevo módulo realizo las validaciones para calcular el orden que le toca
      //valido si hay módulos
      if(this.listaModulos.length > 0){
        const ultimoModulo      = this.listaModulos.slice(-1)[0];
        const ordenUltimoModulo = ultimoModulo.orden;
        this.infoModulo.orden   = parseInt(ordenUltimoModulo) + 1;
      }
    }
  }
  //logica
  procesaCategorias(){
    //pongo el nombre de la categoría en mayúscula
    this.infoCategoria.nombreModulo = this.infoCategoria.nombreModulo.toUpperCase()
    //valido campos
    if(this.infoCategoria.nombreModulo == ''){
      this.funciones.alerta("Atención","Debe escribir un nombre a la categoría","info",()=>{});
    }
    else{
      const mensaje = (this.infoCategoria._id === 0) ? "Está a punto de crear una categoría con la información ingresada, ¿Desea continuar?" : "Está a punto de modificar la categoría seleccionada, ¿Desea continuar?" ;

      this.funciones.confirmacion("Confirmación",mensaje,"info",()=>{
        if(this.infoCategoria._id === 0){
          this.modulosService.create(this.infoCategoria).subscribe((json:any)=>{
            if(json.datos == 1){
              this.infoCategoria  = {_id:0,idPadre:0,esPadre:1,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
              this.funciones.alerta("Atención",json.mensaje,"success",()=>{});
              this.getCategorias();
              $("#modalCategorias").modal("hide");
              //emito hacia el menú principal para que se actualizen las opciones según los ajustes
              this.emisor.disparador.emit("actualizaMenuPrincipal");
            }
            else{
              this.funciones.alerta("Atención",json.mensaje,"info",()=>{});
            }
          });
        }
        else{
          this.modulosService.update(this.infoCategoria._id,this.infoCategoria).subscribe((json:any)=>{
            if(json.datos == 1){
              this.infoCategoria  = {_id:0,idPadre:0,esPadre:1,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
              this.getCategorias();
              //emito hacia el menú principal para que se actualizen las opciones según los ajustes
              this.emisor.disparador.emit("actualizaMenuPrincipal");
              this.funciones.alerta("Atención",json.mensaje,"success",()=>{});
              $("#modalCategorias").modal("hide");
            }
            else{
              this.funciones.alerta("Atención",json.mensaje,"info",()=>{});
            }
          });
          
        }
      });

    }
  }
  editaCategoria(infoCategoria:Modulos){
    this.reseteoGeneral();
    this.infoCategoria  = infoCategoria;
  }
  cerrarModalCategorias(){
    this.infoCategoria  = {_id:0,idPadre:0,esPadre:1,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
    $("#modalCategorias").modal("hide");
  }
  
  //módulos
  verModulos(categoria:Modulos){
    this.infoCatmodulos = categoria;
    //debo listar todos los módulos de la categoría
    this.modulosService.getModulosPorPadre(categoria._id).subscribe((json:any)=>{
      if(json.datos.length > 0){
        this.listaModulos = json.datos;
      }
      else{
        this.listaModulos = [];
      }
    });
  }

  borrarModulo(infoModulo:any){
    this.funciones.confirmacion("Confirmación",`Está a punto de eliminar el módulo <strong>"${infoModulo.nombreModulo}"</strong>, esta acción no se puede retroceder. ¿Desea continuar?` ,"info",()=>{
      this.modulosService.delete(infoModulo._id).subscribe((json:any)=>{
          if(json.datos == 1){
            this.funciones.alerta("Atención",json.mensaje,"success",()=>{
              this.verModulos(this.infoCatmodulos);
            });
          }
          else{
            this.funciones.alerta("Atención",json.mensaje,"info",()=>{});
          }
      });
    });
  }

  abreModalCrearmodulos(){
    this.infoModulo  = {_id:0,idPadre:0,esPadre:0,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
    //asigno el padre que tendrá este módulo que voy a crear
    this.infoModulo.idPadre = this.infoCatmodulos._id;
    $("#modalModulos").modal("show");
    if(this.infoModulo._id == 0){//si es un nuevo módulo realizo las validaciones para calcular el orden que le toca
      //valido si hay módulos
      if(this.listaModulos.length > 0){
        const ultimoModulo      = this.listaModulos.slice(-1)[0];
        const ordenUltimoModulo = ultimoModulo.orden;
        this.infoModulo.orden   = parseInt(ordenUltimoModulo) + 1;
      }
    }
  }

  cerrarModalModulos(){
    this.infoModulo  = {_id:0,idPadre:0,esPadre:0,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
    $("#modalModulos").modal("hide");
  }
  procesaModulo(){
     //valido campos
    if(this.infoModulo.nombreModulo == ''){
      this.funciones.alerta("Atención","Debe escribir el nombre del módulo","info",()=>{});
    }
    else if(this.infoModulo.nombreLargoModulo == ''){
      this.funciones.alerta("Atención","Debe escribir el nombre interno del módulo","info",()=>{});
    }
    else if(this.infoModulo.urlModulo == ''){
      this.funciones.alerta("Atención","Debe escribir la ruta que tendrá el módulo. Esto importante porque en ella está la lógica del mismo","info",()=>{});
    }
    else if(!this.infoModulo.orden){
      this.funciones.alerta("Atención","Debe escribir el orden que tendra el módulo, ponga un número para ordenarlo de forma ascendente en el menú","info",()=>{});
    }
    else{
      const mensaje = (this.infoModulo._id === 0) ? "Está a punto de crear un modulo con la información ingresada, ¿Desea continuar?" : "Está a punto de modificar el módulo seleccionado, ¿Desea continuar?" ;

      this.funciones.confirmacion("Confirmación",mensaje,"info",()=>{
        if(this.infoModulo._id === 0){
          this.modulosService.create(this.infoModulo).subscribe((json:any)=>{
            if(json.datos){
              this.funciones.alerta("Atención",json.mensaje,"success",()=>{
                this.infoModulo  = {_id:0,idPadre:0,esPadre:0,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
                this.verModulos(this.infoCatmodulos);
                $("#modalModulos").modal("hide");
              });
            }
            else{
              this.funciones.alerta("Atención",json.mensaje,"info",()=>{});
            }
          });
        }
        else{
          this.modulosService.update(this.infoModulo._id,this.infoModulo).subscribe((json:any)=>{
            if(json.datos == 1){
              //emito
              this.infoModulo  = {_id:0,idPadre:0,esPadre:0,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
              this.verModulos(this.infoCatmodulos);
              this.funciones.alerta("Atención",json.mensaje,"success",()=>{});
              $("#modalModulos").modal("hide");
            }
            else{
              this.funciones.alerta("Atención",json.mensaje,"info",()=>{});
            }
          });
          
        }
      });

    }
  }
  editarModulo(dataModulo:Modulos){
    this.infoModulo  = dataModulo;
  }

  verPermisos(dataModulo:Modulos){
    this.infoModulo  = dataModulo;
    //traigo los permisos
    this.modulosService.getPermisos(this.infoModulo._id,this.dataLogin.in_perfil).subscribe((json:any)=>{
      if(json.datos.length != ""){
        
        for(let i of json.datos){
            i.ver = i.ver == "1"?true:false
            i.crear = i.crear == "1"?true:false
            i.editar = i.editar == "1"?true:false
            i.borrar = i.borrar == "1"?true:false
        }
        this.listaPermisos = json.datos;
        
        $("#modalPermisos").modal("show");
      }
      else{
        this.listaPermisos = [];
      }
    });
  }
  leePermisosActuales(){
    this.modulosService.getPermisos(this.infoModulo._id,this.dataLogin.in_perfil).subscribe((json:any)=>{
      if(json.continuar  === 1){
        this.listaPermisos = json.datos;
      }
      else{
        this.listaPermisos = [];
      }
    });
  }

  cerrarModalPermisos(){
    this.infoModulo  = {_id:0,idPadre:0,esPadre:0,nombreModulo:'',nombreLargoModulo:'',urlModulo:'',componenteModulo:'',iconoModulo:'',orden:1,estado:1,eliminado:0}
    this.listaPermisos = [];
    $("#modalPermisos").modal("hide");
  }

  guardarPermisos(){
    const arrayModificado = this.listaPermisos.map(({ nombrePerfil, ...restoDelObjeto }: { nombrePerfil: string, [key: string]: any }) => restoDelObjeto);
    const arrayPermisos = arrayModificado.map((obj:any, index:any) => ({ ...obj }));
    this.funciones.confirmacion("Confirmación","¿Está seguro que desea agregar estos permisos al módulo?","info",()=>{
      this.modulosService.createPermisos(arrayPermisos).subscribe((json:any)=>{
        if(json.datos){
          this.funciones.alerta("Atención",json.mensaje,"success",()=>{
            this.leePermisosActuales();
            this.emisor.disparador.emit("actualizaMenuPrincipal");
            $("#modalPermisos").modal("hide");
            this.menuComponent.actualizarMenu();
          })
        }
        else{
          this.funciones.alerta("Atención",json.mensaje,"warning",()=>{
            this.leePermisosActuales();
            this.emisor.disparador.emit("actualizaMenuPrincipal");
          })
        }
        //emito para que los permisos carguen inmediatamente en la ventana visitada
      });
    })
  }
}

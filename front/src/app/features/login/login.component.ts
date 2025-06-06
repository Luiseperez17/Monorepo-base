import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { UsuarioService } from 'src/app/services/components/pages/configuracion/usuario/usuario.service';
import { IndexdbService } from 'src/app/services/global/db/indexdb.service';
import { LoginDbService } from 'src/app/services/components/pages/login/db/login-db.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { openDB } from 'idb';
import * as CryptoJS from 'crypto-js';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //declaracion de variables
  public isOnline:boolean = false;
  public version = environment.versionApp;
  public demo = environment.demo;
  public yeard = new Date().getFullYear();
  // public modo:boolean = true;
  public EmpresaGeneral:any = 0;
  ParametrosTienda:any;




  constructor(public router:Router, private funciones:FuncionesService,private http:HttpClient,private sUsuario:UsuarioService, private db:IndexdbService, private loginDb:LoginDbService){}

  public login:any={
    Usuario:"",
    password:"",
  }


  ngOnInit(): void {

    if(!localStorage.getItem('empresa')){
      $('#modalEmpresa').modal('show');
    }


    this.EmpresaGeneral= localStorage.getItem('empresa');
    localStorage.setItem('isLoginPage', 'false');
    this.funciones.setLoginPage(false);

    if(this.funciones.haySesion()){
      this.router.navigate(['home']);
    }

    this.verificaConexion();
    this.verificadorUsuarios();
    // this.verificadorRetenciones();
    // this.consultas();

  }


  consultas(){
    // this.sUsuario.getParametrosEmpresa().subscribe((restparametros: any) => {
    //   localStorage.setItem("parametros", JSON.stringify(restparametros));
    // });
    // this.sUsuario.getInfoTienda().subscribe((infoTienda:any)=>{
    //   localStorage.setItem("infoTienda", JSON.stringify(infoTienda));
    // });
    // this.sUsuario.getInfoCajas().subscribe((infoCajas: any) => {
    //   localStorage.setItem("infocajas", JSON.stringify(infoCajas));
    // });
  }

  //verificador online
  verificaConexion(){
      if(navigator.onLine) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
      setTimeout(()=>{
        this.verificaConexion();
      },1000);
    // }
  }

  //verificador de usuarios
  verificadorUsuarios() {
    //verifico si hay conexion
    if (this.isOnline) {
      this.sUsuario.getUsuarios().subscribe((usuarios: any) => {
        if (usuarios["datos"].length !== 0) {
          // Procedo a borrar la tabla de los usuarios
          this.loginDb.borrarUsuarios().then(() => {
            let contU = 0;
            //proceso de ingreso a la db
            for (let usuario of usuarios["datos"]) {
              this.loginDb.addData(usuario, 'app_usuarios');
              contU++;
            }
          });
        } else {
          this.funciones.log("No hay usuarios para insertar");
        }
      },(error:any) => {
        console.error("Error al obtener usuarios:", error);
      });
    } else {
      this.funciones.log("No fue posible borrar los usuarios para luego cargarlos de nuevo. Motivo: No hay internet");
    }
  }


  async iniciarSesion(){
    if(this.login.Usuario == ""){
      this.funciones.alerta("Atención!","El usuario es requerido.","info",()=>{});
    }else if(this.login.password == ""){
      this.funciones.alerta("Atención!","La contraseña es requerida","info",()=>{});
    }else{
      const dbName = environment.dbName;
      const dbVersion = environment.dbVersion;
      const db = await openDB(dbName, dbVersion);
      //verifico que exista la tabla usuarios
      if(db.objectStoreNames.contains('app_usuarios')){
        const transaction = db.transaction('app_usuarios', 'readonly');
        const store = transaction.objectStore('app_usuarios');
        const index = store.index('tx_usuario');
        const id_usuario = this.login.Usuario;
        //var query = index.get(key);
        const objAngular = this;
        //busco
        const user = await index.get(id_usuario);
        //verifico
        const claveU = CryptoJS.MD5(this.login.password).toString();
        console.log(' consulta user: ', user)
        // if (user && user.tx_clave == claveU) {
        if (user && user.tx_clave != '') {
          //verifico el estado del usuario
          let dataUsuario:any = JSON.stringify(user);
          if(user.in_estado == 1){//activo
            if(user.primera_vez == 1){
              this.router.navigate(['/primer-ingreso']);
              localStorage["preLogin"] = dataUsuario;
            }else{
              localStorage["dataUsuario"] = dataUsuario;
              sessionStorage['login'] = 1;
              this.funciones.alerta("Bienvenido",user.tx_nombre,"success",() => {
                //elimino el time out de los usuarios
                // clearTimeout(this.interval);
                //navego al home
                localStorage.setItem('isLoginPage', 'true');
                this.router.navigate(['home']);
              });
            }
          }
          else if(user.in_estado == 0 || user.in_estado == 2){//inactivo o anulado
            this.funciones.alerta("Atención","No puede acceder con este usuario. El usuario está inactivo o anulado. comuníquese con el área encargada.","info",function(){})
          }

        } else {
          this.funciones.alerta("Atención","El usuario y la contraseña son incorrectos. Probablemente haya escrito mal la información o es posible que la tabla de usuarios no tenga la información cargada, por favor actualicela y vuelva a intentar.","info",function(){})
        }
      }
      else{
        this.funciones.log("La tabla de usuarios no existe, probablemente hubo un problema en la instalación. Vuelva a reinstalar el software");
        this.funciones.alerta("Atención","La tabla de usuarios no existe, por favor verifique la instalación o vuelva a realizarla","info",()=>{});
      }
    }
  }

  silveragro(){
    this.router.navigate(['silveragro']);
    window.location.reload();
  }
  petus(){
    this.router.navigate(['petus']);
    window.location.reload();
  }

  recordar(){
    this.router.navigate(['/recordarContrasena']);
  }

}


// this.dataNube.getUsuarios().pipe(
//   catchError((error) => {
  //  return of();
//   }).subscribe((usuarios:any) => {

// });

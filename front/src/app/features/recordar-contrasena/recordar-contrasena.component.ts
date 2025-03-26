import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/components/pages/configuracion/usuario/usuario.service';
import { LoginDbService } from 'src/app/services/components/pages/login/db/login-db.service';
import { IndexdbService } from 'src/app/services/global/db/indexdb.service';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { environment } from 'src/environments/environment';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { openDB } from 'idb';
import * as CryptoJS from 'crypto-js';
import { RecordarContrasenaService } from 'src/app/services/components/pages/recordar/recordar-contrasena.service';


declare var $:any;


@Component({
  selector: 'app-recordar-contrasena',
  templateUrl: './recordar-contrasena.component.html',
  styleUrl: './recordar-contrasena.component.css'
})
export class RecordarContrasenaComponent implements OnInit{

  public isOnline:boolean = false;
  public version = environment.versionApp;
  public demo = environment.demo;
  public yeard = new Date().getFullYear();
  EmpresaGeneral:any;
  ParametrosTienda:any;

  constructor(public router:Router, 
              private funciones:FuncionesService,
              private http:HttpClient,
              private sUsuario:UsuarioService, 
              private db:IndexdbService, 
              private loginDb:LoginDbService,
              private recordar:RecordarContrasenaService,){}

  data={
    Usuario:"",
  }



  ngOnInit(): void {
    this.EmpresaGeneral= localStorage.getItem('empresa');
  }


  cambiarContrasena(){
    let id_usuario =0;
    if(this.data.Usuario == ""){
      this.funciones.alerta("Atención!","El correo electrónico es requerido.","info",()=>{});
    }else if(!this.validarEmail(this.data.Usuario)){
      this.funciones.alerta("Atención!", "El formato del correo electrónico es inválido.", "info", () => {});
    }else{
      this.funciones.confirmacion("Atención!", "Está a punto de cambiar la contraseña. ¿Desea continuar?", "info", () => {
        this.recordar.consultoEmail(this.data.Usuario).subscribe((res: any) => {
          if(res.continuar == 1){
            id_usuario = res.data.id_usuario;
            const randomPassword = this.generateRandomPassword();
            const claveU = CryptoJS.MD5(randomPassword).toString();
            const primera_vez = 1;
            this.funciones.confirmacion("Atención!", "Está a punto de crear contraseña para el usuario, ¿Desea continuar?", "info", () => {
              this.sUsuario.crearPass(id_usuario,claveU,primera_vez).subscribe((res: any) => {
                if(res.datos == 1){
                  this.recordar.changePassword(this.data.Usuario,randomPassword).subscribe((resEmail: any) => {
                    if(resEmail.continuar == 1){
                      this.volver();
                      this.funciones.alerta("Atención!", "La contraseña fue enviada a su email de manera exitosa." , "success", () => {});
                    }else{
                      this.funciones.alerta("Atención!","El correo electrónico no fue enviado, por favor comuniquese con soporte.","error",()=>{});
                    }
                  });
                }
                else{
                  this.funciones.alerta("Atención!",res.mensaje, "error", () => {});
                }
                });
            });
          }else{
            this.funciones.alerta("Atención!","El correo electrónico no fue encontrado.","error",()=>{});
          }
        });
      });
    }
  }
  //valido de email
  validarEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
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

  volver(){
    this.router.navigate(['/login']);
  }

}

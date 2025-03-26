import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/components/pages/configuracion/usuario/usuario.service';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-primer-ingreso',
  templateUrl: './primer-ingreso.component.html',
  styleUrls: ['./primer-ingreso.component.css']
})
export class PrimerIngresoComponent implements OnInit {

  public yeard = new Date().getFullYear();
  dataUsuario:any= JSON.parse(localStorage["preLogin"]);
  public version = environment.versionApp;
  public demo = environment.demo;
  actual:any = "";
  nueva:any = "";
  nConfirmar:any= "";
  idUsuario:any = this.dataUsuario.id_usuario;
  public EmpresaGeneral:any;

  constructor(public router:Router, private funciones:FuncionesService,private sUsuario:UsuarioService,){}

  ngOnInit(): void {
    this.EmpresaGeneral= localStorage.getItem('empresa');
  }

  

  cambioContrasena(){
    if(this.actual == ""){
      this.funciones.alerta("Atención!","La contraseña actual es requerida.","info",()=>{});
    }else if(this.nueva == ""){
      this.funciones.alerta("Atención!","La nueva contraseña es requerida.","info",()=>{}); 
    }else if(this.nConfirmar == ""){
      this.funciones.alerta("Atención!","La confirmación de la nueva contraseña es requerida.","info",()=>{}); 
    }else{
      const claveU = CryptoJS.MD5(this.actual).toString();
      if(claveU != this.dataUsuario.tx_clave){
        this.funciones.alerta("Atención!","La contraseña actual no coincide, por favor verifique e intente nuevamente.","info",()=>{}); 
      }else{
        const claven =CryptoJS.MD5(this.nConfirmar).toString();
        this.funciones.confirmacion("Atención!", "Está a punto de asignar la contraseña. ¿Desea continuar?", "info", () => {
          this.sUsuario.crearPass(this.idUsuario,claven,0).subscribe((res: any) => {
            if(res.datos == 1){
              this.funciones.alerta("Atención!","La contraseña se ha actualizado correctamente.","success",()=>{});
              this.router.navigate(['/login']);
              localStorage.removeItem("preLogin");
            }else{
              this.funciones.alerta("Atención!","La contraseña no pudo ser actualizada, por favor comuniquese con el administrador.","warning",()=>{});
            }
          });
        });
      }
    }
  }
}
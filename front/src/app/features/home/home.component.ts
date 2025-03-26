import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionesService } from 'src/app/services/global/funciones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public dataSesion:any;
  perfil:any;
  tituloModulo:any = "Bienvenido";
  EmpresaGeneral:any;

  constructor(public router:Router, private funciones:FuncionesService){}

  ngOnInit(): void {
    this.EmpresaGeneral= localStorage.getItem('empresa');
    // valido si hay sesion
    if(this.funciones.haySesion()){
      const dataUsuarioString = localStorage.getItem('dataUsuario');
      if (dataUsuarioString) {
        this.dataSesion = JSON.parse(dataUsuarioString);
        this.perfil =this.dataSesion.in_perfil;
        this.funciones.setLoginPage(true);
      }else{
        // this.router.navigate(['']);
      }
    }else{
        this.router.navigate(['']);
    }

    if(this.EmpresaGeneral == 1){
      this.tituloModulo = "Silveragro te da la Bienvenida";
    }if(this.EmpresaGeneral == 2){
      this.tituloModulo = "Petus te da la Bienvenida";
    }




  }
}

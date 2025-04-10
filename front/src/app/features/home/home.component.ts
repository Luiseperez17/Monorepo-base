import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { ModulosService } from 'src/app/services/components/admin/modulos/modulos.service';

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
  public listaModulos:any;

  constructor(public router:Router, private funciones:FuncionesService, private modulosService:ModulosService){}

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

    this.getMenu();

  }

  getMenu(){
    this.modulosService.getModulosPorPadre(80).subscribe((json:any)=>{
      this.listaModulos = json["datos"];
    });
  }

  getRouterLink(modulo: any): string[] {
    const urlSegments = modulo.urlModulo.split('/');
    return ['/', ...urlSegments, modulo._id];
  }
}

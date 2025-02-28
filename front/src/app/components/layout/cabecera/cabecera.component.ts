import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/components/layout/menu.service';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit{

  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();


  //declaracion de variables
  dataUsuario:any;
  dataSesion:any;
  public demo = environment.demo;
  versionAngular:any = environment.versionAngular;
  constructor( public router:Router, private funciones:FuncionesService, private menuService: MenuService){}
  
  public version = environment.versionApp;

  ngOnInit(): void {
    if(this.funciones.haySesion()){
      const dataUsuarioString = localStorage.getItem('dataUsuario');
      if (dataUsuarioString) {
        this.dataSesion = JSON.parse(dataUsuarioString);
        this.dataUsuario = JSON.parse(dataUsuarioString);
        this.funciones.setLoginPage(true);
      }else{
        // this.router.navigate(['']);
      }
    }else{
        this.router.navigate(['']);
    }

  }
  
  cerarSesion(){
    sessionStorage.clear();
    this.router.navigate(['login']);
    localStorage.removeItem("dataUsuario");
    localStorage.setItem('isLoginPage', 'false');
    this.funciones.setLoginPage(false);
  }

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}

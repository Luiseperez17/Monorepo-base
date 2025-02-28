import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { ModulosService } from 'src/app/services/components/admin/modulos/modulos.service';
import Swal from 'sweetalert2';
import { EMPTY, Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/components/layout/menu.service';

declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit{

  @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
  
  // declaracion de variables
  public listaModulos:any;
  dataSesion:any;
  public EmpresaGeneral:any;
  private trasladosPendientesSubscription: Subscription | undefined;
  almacen:any;
  dataTraslados!:any;

  
  constructor(public router:Router, private funciones:FuncionesService,private http:HttpClient,private modulosService:ModulosService, private menuService: MenuService){}

  ngOnInit(): void {
    this.EmpresaGeneral= localStorage.getItem('empresa');
    if(this.funciones.haySesion()){
      const dataUsuarioString = localStorage.getItem('dataUsuario');
      if (dataUsuarioString) {
        this.dataSesion = JSON.parse(dataUsuarioString);
        this.almacen = this.dataSesion.tx_almacen;
        this.funciones.setLoginPage(true);
      }else{
        // this.router.navigate(['']);
      }
    }else{
        this.router.navigate(['']);
    }


    this.modulosService.iniciarVerificacionTraslados(this.almacen);

    // Suscribirse al observable de traslados pendientes
    this.trasladosPendientesSubscription = this.modulosService.getTrasladosPendientes$().subscribe((hayTrasladosPendientes: any) => {
      if (hayTrasladosPendientes.continuar == 1) {
        this.dataTraslados = hayTrasladosPendientes.datos;
        let data = 0;
        // Recorrer los datos para verificar la condición de in_estado <= 9
        this.dataTraslados.forEach((traslado: any) => {
          if (traslado.in_estado < 6) {
            data ++;
          }
        });
        if(data > 0){
          $('#liveToasts').show();
        }
      }
    });

    this.getMenu();
  }

  getMenu(){
    this.modulosService.getMenu(this.dataSesion.in_perfil).subscribe((json:any)=>{
      this.listaModulos = json["datos"];
    });
  }

  actualizarMenu() {
    this.getMenu();
  }

  toggleMenu(menu: any): void {
    menu.isOpen = !menu.isOpen;
  }
  //los modulos que no quiero ver en el menu principal
  shouldHideOption(opt: any): boolean {
    const hiddenIds = [13, 14, 21, 22, 23, 27, 28, 31,39];
    return hiddenIds.includes(opt._id);
  }
  tutoriales(){
    this.funciones.alerta("Atención", "Próximamente disponible.", "warning", function() {});
  }
  onCloseMenu() {
    this.closeMenu.emit();
  }


  ngOnDestroy(): void {
    // Detener la verificación de traslados y cancelar suscripciones
    this.modulosService.detenerVerificacionTraslados();
    if (this.trasladosPendientesSubscription) {
      this.trasladosPendientesSubscription.unsubscribe();
    }
  }
  cerarToast(){
    $('#liveToast').hide();
  }
}

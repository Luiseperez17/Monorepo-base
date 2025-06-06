import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModulosService } from 'src/app/services/components/admin/modulos/modulos.service';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { PermisosService } from 'src/app/services/global/permisos.service';

@Component({
  selector: 'app-parametrizacion',
  templateUrl: './parametrizacion.component.html',
  styleUrls: ['./parametrizacion.component.css']
})
export class ParametrizacionComponent implements OnInit{

  public tituloModulo:any = "Parametrización";
  public listaModulos:any;
  dataSesion:any;
  public dataLogin:any = [];
  idModulo: any;
  permisosModulo: any;
  public elementos:any;

  // elementos = [
  //   { id: 1, nombre: 'Cargos', icon: 'ti ti-users', ruta: 'cargos' },
  //   { id: 2, nombre: 'Sedes', icon: 'ti ti-map-pin', ruta: 'sedes' },
  //   { id: 3, nombre: 'Sucursales', icon: 'ti ti-map-pins', ruta: 'sucursales' },
  //   { id: 4, nombre: 'Datos Maestros', icon: 'ti ti-server', ruta: 'datosMaestros' },
  // ];
  
  

  constructor(private router: Router,private funciones:FuncionesService,private http:HttpClient,private permisos:PermisosService,private ar:ActivatedRoute,private modulosService:ModulosService) {

    //ordenar por orden alfaberico los botones
    // this.elementos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }


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
    this.getOne();
  }

  getOne(){
    this.modulosService.getOne(7).subscribe((json:any)=>{
      this.elementos = json.datos;
    });
  }

}

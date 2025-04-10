import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PermisosService } from 'src/app/services/global/permisos.service';

@Component({
  selector: 'app-banner-cabecera',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './banner-cabecera.component.html',
  styleUrl: './banner-cabecera.component.css'
})
export class BannerCabeceraComponent implements OnInit {

  @Input() public tituloModulo:any = "";

  public dataLogin:any = [];
  idModulo: any;
  permisosModulo: any;


  constructor(
              public router:Router,
              private ar:ActivatedRoute,
              private permisos:PermisosService
            )
  {

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

  }

}

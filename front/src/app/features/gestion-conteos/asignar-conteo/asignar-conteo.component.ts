import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BannerCabeceraComponent } from 'src/app/core/layout/banner-cabecera/banner-cabecera.component';

@Component({
  selector: 'app-asignar-conteo',
  standalone: true,
  imports: [FormsModule, BannerCabeceraComponent],
  templateUrl: './asignar-conteo.component.html',
  styleUrl: './asignar-conteo.component.css'
})
export class AsignarConteoComponent {


  public usuario:any={
    tx_usuario:"",
    tx_nombre:"",
    in_perfil:"",
    tx_correo:"",
    tx_bodega:"",
    tx_conteo:"",
  };



  setAsignarConteo(){
    console.log("Asignar conteo", this.usuario);
  }

}

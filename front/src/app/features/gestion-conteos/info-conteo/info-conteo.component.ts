import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BannerCabeceraComponent } from 'src/app/core/layout/banner-cabecera/banner-cabecera.component';

@Component({
  selector: 'app-info-conteo',
  standalone: true,
  imports: [FormsModule, BannerCabeceraComponent],
  templateUrl: './info-conteo.component.html',
  styleUrl: './info-conteo.component.css'
})
export class InfoConteoComponent {

  conteo = {
    tx_bodega: '', // Bodega seleccionada
    tx_numConteo1: '', // Número de Conteo 1
    tx_numConteo2: '' // Número de Conteo 2
  };

  onSubmit() {
    console.log('Datos del formulario:', this.conteo);
    // Lógica para procesar los datos del formulario
  }

}

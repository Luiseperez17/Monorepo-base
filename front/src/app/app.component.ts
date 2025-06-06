import { Component, OnDestroy } from '@angular/core';
import { FuncionesService } from './services/global/funciones.service';
import { UsuarioService } from 'src/app/services/components/pages/configuracion/usuario/usuario.service';
import { LoginDbService } from 'src/app/services/components/pages/login/db/login-db.service';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'MTS_SILVERAGRO';
  isLoginPage: boolean | undefined;
  private loginPageInterval: any;
  private retencionesInterval: any;
  isOnline = navigator.onLine; // Verifica la conexión a Internet

  constructor(
    private funciones: FuncionesService,
    private sUsuario: UsuarioService,
    private loginDb: LoginDbService
  ) {
    // Verifica si está en la página de login
    this.isLoginPage = localStorage.getItem('isLoginPage') === 'true';
    this.loginPageInterval = setInterval(() => {
      this.isLoginPage = localStorage.getItem('isLoginPage') === 'true';
    }, 500);
  }

  onToggleMenu() {
    const mainWrapper = document.getElementById('main-wrapper');
    if (mainWrapper) {
      mainWrapper.classList.toggle('show-sidebar');
    }
  }

  onCloseMenu() {
    const mainWrapper = document.getElementById('main-wrapper');
    if (mainWrapper && mainWrapper.classList.contains('show-sidebar')) {
      mainWrapper.classList.remove('show-sidebar');
    }
  }

  ngOnDestroy() {
    // Limpia los intervalos al destruir el componente
    if (this.loginPageInterval) {
      clearInterval(this.loginPageInterval);
    }
    if (this.retencionesInterval) {
      clearInterval(this.retencionesInterval);
    }
  }
}

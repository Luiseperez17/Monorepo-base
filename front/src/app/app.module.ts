import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/layout/cabecera/cabecera.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { EnblancoComponent } from './components/pages/enblanco/enblanco.component';
import { CrearUsuarioComponent } from './components/pages/configuracion/crear-usuario/crear-usuario.component';
import { PerfilesComponent } from './components/pages/configuracion/perfiles/perfiles.component';
import { SearchPipe } from './pipes/globales/search.pipe';
import { PaginatePipe } from './pipes/globales/paginate.pipe';
import { ParametrizacionComponent } from './components/pages/configuracion/parametrizacion/parametrizacion.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MiperfilComponent } from './components/pages/configuracion/miperfil/miperfil.component';
import { ModulosComponent } from './components/pages/admin/modulos/modulos.component';
import { NoAccesoComponent } from './components/layout/no-acceso/no-acceso.component';
import { PrimerIngresoComponent } from './components/pages/primer-ingreso/primer-ingreso.component';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';

import { MenuService } from './services/components/layout/menu.service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { RecordarContrasenaComponent } from './components/pages/recordar-contrasena/recordar-contrasena.component';

@NgModule({ declarations: [
        AppComponent,
        CabeceraComponent,
        MenuComponent,
        HomeComponent,
        LoginComponent,
        EnblancoComponent,
        CrearUsuarioComponent,
        PerfilesComponent,
        SearchPipe,
        PaginatePipe,
        ParametrizacionComponent,
        MiperfilComponent,
        ModulosComponent,
        NoAccesoComponent,
        PrimerIngresoComponent,
        RecordarContrasenaComponent,
    ],
    bootstrap: [AppComponent], imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularSignaturePadModule,
    NgSelectModule,
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
    })], 
    providers: [MenuService, DatePipe, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }

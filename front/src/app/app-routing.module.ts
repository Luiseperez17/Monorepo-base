import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { EnblancoComponent } from './components/pages/enblanco/enblanco.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CrearUsuarioComponent } from './components/pages/configuracion/crear-usuario/crear-usuario.component';
import { PerfilesComponent } from './components/pages/configuracion/perfiles/perfiles.component';
import { ParametrizacionComponent } from './components/pages/configuracion/parametrizacion/parametrizacion.component';
import { MiperfilComponent } from './components/pages/configuracion/miperfil/miperfil.component';
import { ModulosComponent } from './components/pages/admin/modulos/modulos.component';
import { PrimerIngresoComponent } from './components/pages/primer-ingreso/primer-ingreso.component';
import { RecordarContrasenaComponent } from './components/pages/recordar-contrasena/recordar-contrasena.component';


const routes: Routes = [
  { path: 'ejemplo', component: EnblancoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios/:id', component: CrearUsuarioComponent},
  { path: 'perfiles/:id', component: PerfilesComponent },
  { path: 'parametrizacion/:id', component: ParametrizacionComponent },
  { path: 'perfil/:id', component:MiperfilComponent },
  { path: 'modulos/:id', component:ModulosComponent },
  { path: 'primer-ingreso', component:PrimerIngresoComponent },
  { path: 'recordarContrasena', component: RecordarContrasenaComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

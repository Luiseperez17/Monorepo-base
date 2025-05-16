import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { EnblancoComponent } from './features/enblanco/enblanco.component';
import { LoginComponent } from './features/login/login.component';
import { CrearUsuarioComponent } from './features/configuracion/crear-usuario/crear-usuario.component';
import { PerfilesComponent } from './features/configuracion/perfiles/perfiles.component';
import { ParametrizacionComponent } from './features/configuracion/parametrizacion/parametrizacion.component';
import { MiperfilComponent } from './features/configuracion/miperfil/miperfil.component';
import { ModulosComponent } from './features/modulos/modulos.component';
import { PrimerIngresoComponent } from './features/primer-ingreso/primer-ingreso.component';
import { RecordarContrasenaComponent } from './features/recordar-contrasena/recordar-contrasena.component';
import { AsignarConteoComponent } from './features/gestion-conteos/asignar-conteo/asignar-conteo.component';
import { ConteoInventarioComponent } from './features/gestion-conteos/conteo-inventario/conteo-inventario.component';
import { ConteoVencidosComponent } from './features/gestion-conteos/conteo-vencidos/conteo-vencidos.component';
import { ConteoDiferenciasComponent } from './features/gestion-conteos/conteo-diferencias/conteo-diferencias.component';
import { ConteoDiferenciasSapComponent } from './features/gestion-conteos/conteo-diferencias-sap/conteo-diferencias-sap.component';
import { InfoConteoComponent } from './features/gestion-conteos/info-conteo/info-conteo.component';
import { SincronizacionComponent } from './features/sincronizacion/sincronizacion.component';


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
  { path: 'syncSAP/:id', component: SincronizacionComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'gestion-conteos',
    children: [
      { path: 'asignar-conteo/:id', component: AsignarConteoComponent },
      { path: 'conteo-inventario/:id', component: ConteoInventarioComponent },
      { path: 'conteo-vencidos/:id', component: ConteoVencidosComponent },
      { path: 'conteo-diferencias/:id', component: ConteoDiferenciasComponent },
      { path: 'diferencias-sap/:id', component: ConteoDiferenciasSapComponent },
      { path: 'info-conteo/:id', component: InfoConteoComponent	},

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

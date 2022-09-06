import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material';
import { MenuComponent } from './menu/menu.component';
import { GestionComponent } from './gestion/gestion.component';
import { CertificadoSueloComponent } from './certificado-suelo/certificado-suelo.component';
import { CertificadoDistanciaComponent } from './certificado-distancia/certificado-distancia.component';
import { CertificadoNomenclaturaComponent } from './certificado-nomenclatura/certificado-nomenclatura.component';


const routesAdmin: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'gestion', component: GestionComponent },
  { path: 'crtsuelo',component: CertificadoSueloComponent},
  { path: 'crtdistancia', component: CertificadoDistanciaComponent },
  { path: 'crtnomenclatura', component: CertificadoNomenclaturaComponent }
  //{ path: 'bodega', component: BodegaComponent },
  //{ path: 'unidad', component: UnidadCultivoComponent },

];

@NgModule({
  declarations: [LoginComponent, MenuComponent, GestionComponent, CertificadoSueloComponent, CertificadoDistanciaComponent, CertificadoNomenclaturaComponent],
  imports: [
    RouterModule.forChild(routesAdmin),
    CommonModule,
    FormsModule,
    MaterialModule,
    CoreModule
  ],
  exports: [LoginComponent]
})
export class AdministracionModule { }

import { Routes } from '@angular/router';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import { RegistroComponent } from './registro/registro.component';
import { AltasComponent } from './altas/altas.component';
import { AltasProductosComponent } from './altas-productos/altas-productos.component';
import { AltasDoctoresComponent } from './altas-doctores/altas-doctores.component';
import { AltasHospitalesComponent } from './altas-hospitales/altas-hospitales.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [

    // Rutas de la aplicación
    {path: 'inicio', component: InicioComponent},
    {path: 'login', component: IniciosesionComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'altas', component: AltasComponent},
    {path: 'altas-productos', component: AltasProductosComponent},
    {path: 'altas-doctores', component: AltasDoctoresComponent},
    {path: 'altas-hospitales', component: AltasHospitalesComponent},
    {path: 'consultas', component: ConsultasComponent},

    {path: '', redirectTo: 'inicio', pathMatch: 'full'}, // Ruta por defecto
    {path: '**', component: IniciosesionComponent} // Ruta para cuando no se encuentra la ruta
];

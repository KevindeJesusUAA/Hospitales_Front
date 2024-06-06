import { Routes } from '@angular/router';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [

    // Rutas de la aplicación
    {path: 'inicio', component: InicioComponent},
    {path: 'login', component: IniciosesionComponent},
    {path: 'registro', component: RegistroComponent},

    {path: '', redirectTo: 'inicio', pathMatch: 'full'}, // Ruta por defecto
    {path: '**', component: IniciosesionComponent} // Ruta para cuando no se encuentra la ruta
];

import { Routes } from '@angular/router';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [

    // Rutas de la aplicación
    //{path: 'inicio', component: InicioComponent},
    {path: 'login', component: IniciosesionComponent},
    {path: 'registro', component: RegistroComponent},

    {path: '', redirectTo: '/login', pathMatch: 'full'}, // Ruta por defecto
    {path: '**', component: IniciosesionComponent} // Ruta para cuando no se encuentra la ruta
];

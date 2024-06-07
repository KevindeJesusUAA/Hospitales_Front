import { Routes } from '@angular/router';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import { RegistroComponent } from './registro/registro.component';
import { AltasComponent } from './altas/altas.component';
import { AltasProductosComponent } from './altas-productos/altas-productos.component';
import { AltasDoctoresComponent } from './altas-doctores/altas-doctores.component';
import { AltasHospitalesComponent } from './altas-hospitales/altas-hospitales.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReservarCitaComponent } from '../reservaciones/reservar-cita/reservar-cita.component';
import { CitasPersonalesComponent } from '../reservaciones/citas-personales/citas-personales.component';
import { CitasReservadasComponent } from '../reservaciones/citas-reservadas/citas-reservadas.component';
import { RecetaComponent } from './receta/receta.component';

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
    {path: 'reservar-cita', component: ReservarCitaComponent},
    {path: 'citas-personales', component: CitasPersonalesComponent},
    {path: 'citas-reservadas', component: CitasReservadasComponent},
    {path: 'receta', component: RecetaComponent},

    {path: '', redirectTo: 'inicio', pathMatch: 'full'}, // Ruta por defecto
    {path: '**', component: IniciosesionComponent} // Ruta para cuando no se encuentra la ruta
];

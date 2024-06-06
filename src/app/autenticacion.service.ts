import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private usuarioAutenticado: boolean = false;
  private userName: BehaviorSubject<string> = new BehaviorSubject('');


  constructor() { 
    // Recupera la información de autenticación almacenada en el sessionStorage.
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('autenticado')) {
        if (sessionStorage.getItem('autenticado') === 'true') {
          this.usuarioAutenticado = true;
          this.userName.next(sessionStorage.getItem('username') || '');
        }
      }
    } else {
      console.log('sessionStorage no está disponible en este entorno.');
    }
  }

  // Establece la información de autenticación en el sessionStorage.
  setLogin(id: string, username: string) {
    sessionStorage.setItem('autenticado', 'true');
    this.usuarioAutenticado = true;
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('username', username);
    this.userName.next(username); // Actualiza el nombre del usuario autenticado.
  }

  // Devuelve el id del usuario autenticado.
  getIdUsuario(): string {
    return sessionStorage.getItem('id') || '';
  }

  // Devuelve el nombre del usuario autenticado.
  getUsername(): BehaviorSubject<string> {
    return this.userName;
  }

  // Elimina la información de autenticación del sessionStorage.
  cerrarSesion() {
    // Elimina la información de autenticación del sessionStorage.
    sessionStorage.removeItem('autenticado');
    this.usuarioAutenticado = false; 
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    this.userName.next('');
  }

  // Devuelve true si el usuario está autenticado y false en caso contrario.
  estaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  getHoraActual(): string {
    const currentHour = new Date().getHours();
    let formattedTime = '';

    if (currentHour >= 4 && currentHour < 12) {
        formattedTime = 'Buenos días';
    } else if (currentHour >= 12 && currentHour <= 18) {
        formattedTime = 'Buenas tardes';
    } else {
        formattedTime = 'Buenas noches';
    }

    return formattedTime;
  }
}

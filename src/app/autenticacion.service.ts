import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'console';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private usuarioAutenticado: boolean = false;
  private userName: BehaviorSubject<string> = new BehaviorSubject('');
  private rol: BehaviorSubject<string> = new BehaviorSubject(''); // Para manejar el rol del usuario


  constructor(private http: HttpClient) { 
    // Recupera la información de autenticación almacenada en el sessionStorage.
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('autenticado')) {
        if (sessionStorage.getItem('autenticado') === 'true') {
          this.usuarioAutenticado = true;
          this.userName.next(sessionStorage.getItem('username') || '');
        }
        if (sessionStorage.getItem('autenticado') === 'true') {
          this.usuarioAutenticado = true;
          this.userName.next(sessionStorage.getItem('username') || '');
          this.rol.next(sessionStorage.getItem('rol') || ''); // Recupera el rol del usuario
        }
      }
    } else {
      console.log('sessionStorage no está disponible en este entorno.');
    }
  }

  verificaUsuario(correo: string, password: string){

    return this.http.post('http://localhost:3000/usuarios/login', {correo,password}).toPromise();
  }


  // Establece la información de autenticación en el sessionStorage.
  setLogin(id: string, username: string, rol: string) {
    sessionStorage.setItem('autenticado', 'true');
    this.usuarioAutenticado = true;
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('username', username);

    if (rol == "1")
      rol = 'admin';
    else if (rol == "2")
      rol = 'paciente';
    else
      rol = 'doctor';
    console.log(rol);
    
    sessionStorage.setItem('rol', rol); // Guarda el rol del usuario
    this.userName.next(username);
    this.rol.next(rol); // Actualiza el rol
  }


  // Devuelve el id del usuario autenticado.
  getIdUsuario(): string {
    return sessionStorage.getItem('id') || '';
  }

  // Devuelve el nombre del usuario autenticado.
  getUsername(): BehaviorSubject<string> {
    return this.userName;
  }


  // Devuelve el rol del usuario autenticado.
  getRol(): BehaviorSubject<string> {
    return this.rol;
  }

  // Elimina la información de autenticación del sessionStorage.
  cerrarSesion() {
    // Elimina la información de autenticación del sessionStorage.
    sessionStorage.removeItem('autenticado');
    this.usuarioAutenticado = false; 
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('rol'); // Elimina el rol del usuario
    this.userName.next('');
    this.rol.next(''); // Resetea el rol
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

import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  usuarioAutenticado: boolean = false;
  username: string = '';
  private userNameSubscription: Subscription = new Subscription();
  mensaje: string = '';

  constructor(private auth: AutenticacionService) {}

  ngOnInit() {
    this.usuarioAutenticado = this.auth.estaAutenticado();

    console.log('Usuario autenticado: ' + this.usuarioAutenticado);

    this.userNameSubscription = this.auth.getUsername().subscribe(
        (username) => {
          this.username = username
        }
      );
  }

  isAuth():boolean{
    if(this.username == '') {
      return false;
    }
    this.getHoraActual();
    return true;
  }

  ngOnDestroy() {
    this.userNameSubscription.unsubscribe();
  }

  getHoraActual() {
    this.mensaje = this.auth.getHoraActual();
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
    this.usuarioAutenticado = false;
    this.username = '';
    this.mensaje = '';
    this.userNameSubscription.unsubscribe();
  }

  busqueda(producto: string) {
    if(producto == '') {
      return;
    }
  }
}

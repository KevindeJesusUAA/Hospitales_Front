import { Component } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {


  username: string = '';
  correo: string = '';
  password1: string = '';
  password2: string = '';
  mensaje: string = '';
  btnRegistro:boolean = false;

  constructor(private router: Router, private auth: AutenticacionService) {

    if (this.auth.estaAutenticado()) {
      this.router.navigate(['/login']);
      console.log('Usuario autenticado');
    }else{
      this.router.navigate(['/registro']);
      console.log('Usuario no autenticado');
    }
  }

  registrarUsuario() {

    this.setBtnRegistro();

    if (this.validaCorreo() && this.validaPassword() && this.validaUsername()) {

      const usuario = {
        correo: this.correo,
        password: this.password1
      }
        
      this.router.navigate(['/login'],{state: {usuario}});
      


        /*this.apiwishop.registrarUsuario(this.username, this.correo, this.password1).then((response: any) => {
            
            if (response.success == true) {

              console.log('Usuario registrado correctamente');

              const usuario = {
                correo: this.correo,
                password: this.password1
              }
              
              this.router.navigate(['/iniciosesion'],{state: {usuario}});

            } else {
              console.log('Error al registrar el usuario, '+ response.info);
            }
          }
        ); */   
    }else{
      this.mensaje = 'Rellene todos los campos correctamente';
    }
  }

  validaCorreo():boolean{
    if (this.correo.indexOf('@') == -1 || this.correo.indexOf('.') == -1)
      return false;
    
    return true;
  }

  validaPassword():boolean{
    if (this.password1.length < 6 || this.password2.length < 6){
      this.mensaje = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    
    }else if (this.password1 != this.password2){
      this.mensaje = 'Las contraseñas no coinciden';
      return false;
    }
    
    return true;
  }

  validaUsername():boolean{
    if (this.username.length < 3)
      return false;
    
    return true;
  }

  setBtnRegistro(){
    this.btnRegistro = true;
  }

  btnRegistroClick(): boolean{
    return this.btnRegistro;
  }
}

import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-iniciosesion',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './iniciosesion.component.html',
  styleUrl: './iniciosesion.component.css'
})
export class IniciosesionComponent implements OnInit{

  correo: string = '';
  password: string = '';
  btnIniciarSesion:boolean = false;
  mensaje:string = '';
  sesionIniciada:boolean = false;

  //constructor(private apiwishop: ApiwishopService, private router:Router,private auth:AuthService) { }
  constructor(private rutaActiva:Router, private auth:AutenticacionService) { }
  
  ngOnInit(): void {
    
    // Si se recibe un usuario en el historial, se asignan los valores a los campos
    /*if(history.state.usuario){
      this.correo = history.state.usuario.correo;
      this.password = history.state.usuario.password;
    }*/
  }

  iniciaSesion():void{
    this.setBtnIniciarSesion();
    
    if (this.validaCorreo() && this.validaPassword()){

      this.auth.verificaUsuario(this.correo, this.password).then((response: any) => {
        if (response.length == 1) {
          console.log('Inicio de sesión exitoso');
          console.log(response[0]);
          this.auth.setLogin(response[0].idCuenta, response[0].nombre, response[0].Roles_idRoles.toString());
          this.rutaActiva.navigate(['/inicio']);
        
        }else{
          console.log('Error al iniciar sesión, '+ response.info);
          swal("Credenciales Incorrectas", "Vuelve a Intentarlo", "error");
        }
      });
   
    }else{
      this.mensaje = 'Rellene todos los campos correctamente';
    }
  }

  validaCorreo():boolean{
    if (this.correo.indexOf('@') == -1 || this.correo.indexOf('.') == -1){
      this.mensaje = 'Correo inválido';
      return false;
    }
    return true;
  }

  validaPassword():boolean{
    if (this.password.length < 6){
      this.mensaje = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }
    
    return true;
  }

  setBtnIniciarSesion():void{
    this.btnIniciarSesion = true;
  }

  getBtnIniciarSesion():boolean{
    return this.btnIniciarSesion;
  }
}

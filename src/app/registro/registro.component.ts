import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../paciente.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{


  username: string = '';
  correo: string = '';
  password1: string = '';
  password2: string = '';
  mensaje: string = '';
  btnRegistro:boolean = false;
  hospitales: any = [];
  hospital = '';

  constructor(private router: Router, private auth: AutenticacionService, private paciente: PacienteService) {

    if (this.auth.estaAutenticado()) {
      this.router.navigate(['/inicio']);
      console.log('Usuario autenticado');
    }else{
      this.router.navigate(['/registro']);
      console.log('Usuario no autenticado');
    }
  }

  ngOnInit(){
    this.paciente.getHospitales().then((hospitales: any) => {
      this.hospitales = hospitales;
      console.log(this.hospitales);
    });
  }

  registrarUsuario() {

    this.setBtnRegistro();

    if (this.validaCorreo() && this.validaPassword() && this.validaUsername() && this.validarHospital()) {

      for (let i = 0; i < this.hospitales.length; i++){
        if (this.hospitales[i].nombre == this.hospital){
          this.hospital = this.hospitales[i].idHospital;
          break;
        }
      }

      const usuario = {
        correo: this.correo,
        password: this.password1,
        nombre: this.username,
        apellido: 'López',
        telefono: '1234567890',
        direccion: 'Calle 123',
        edad : 20,
        fechanacimiento: '2000-01-01',
        sexo : 'M',
        rol: 2,
        hospital: this.hospital
      }

      console.log(usuario);

      this.paciente.setNuevoRegistro(usuario).then((response: any) => {
        console.log(response);
        if (response.Status == 'Usuario agregado'){
          swal('Usuario registrado correctamente', 'Ahora puedes iniciar sesión', 'success');
          this.router.navigate(['/iniciosesion']);
        }else{
          swal('Error al registrar el usuario', 'Intente de nuevo', 'error');
        }
      });
  
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

  validarHospital():boolean{
    if (this.hospital == '')
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

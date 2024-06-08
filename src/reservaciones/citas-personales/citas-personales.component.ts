import { Component, OnInit } from '@angular/core';
import { Cita } from '../cita.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../app/paciente.service';
import { AutenticacionService } from '../../app/autenticacion.service';
import { response } from 'express';

@Component({
  selector: 'app-citas-personales',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas-personales.component.html',
  styleUrl: './citas-personales.component.css'
})
export class CitasPersonalesComponent implements OnInit {

  citas: Cita[] = [];
  todas: any[] = [];
  
  datos: any;
  claves:any;
  muestra:boolean = false; // bandera para mostrar QR

  constructor(private paciente: PacienteService, private usuario: AutenticacionService){}

  ngOnInit(): void {
    this.cargarCitas();
  }


  cargarCitas():void{
    const id = this.usuario.getIdUsuario();
    let hospital = "";
    const doctor = "";
    
    this.paciente.getHospitalPaciente(id).then((response:any) => {
      if(response.length > 0)
        hospital = response[0].nombre;
    });


    /*this.citas.sort((a, b) => {
      if (a.year < b.year) {
        return -1;
      } else if (a.year == b.year) {
        if (a.mes < b.mes) {
          return -1;
        } else if (a.mes == b.mes) {
          if (a.dia < b.dia) {
            return -1;
          } else if (a.dia == b.dia) {
            if (a.hora < b.hora) {
              return -1;
            } else {
              return 1;
            }
          } else {
            return 1;
          }
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    });*/
  }

  findCita(cita:Cita):number{
    let cont = 0;

    /*
    for (const i of this.todas) {
      if(i.dia == cita.dia && i.hora == cita.hora && i.id == cita.id && i.mesNombre == cita.mesNombre)
        break;
      
      cont++;
    }*/
    return cont;
  }

  generaQR(cita:Cita):void{
    let i = this.findCita(cita);

    let body = {
      index: this.claves[i],
      //usuario: this.login.iduslog()
    }

    /*this.codigoqr.recuperaDatos(body).then((data:any) => {
      this.datos = data;
      console.log(data);
      console.log(this.datos);
      this.value = `Nombre: ${this.datos.nombre}\nTelefono: ${this.datos.telefono}\nCita: ${this.datos.fecha}\nDoctor: ${this.datos.doctor}`;
      this.muestra =true;
    })
    .catch((err: any) => {
      console.log(err);
    });*/

    //this.datos = this.codigoqr.recuperaDatos(body);
    //this.value = `Nombre: ${this.datos.nombre}\nTelefono: ${this.datos.telefono}\nCita: ${this.datos.fecha}\nDoctor: ${this.datos.doctor}`;
    
  }

  borrarCita(cita:Cita):void{
    let i = this.findCita(cita);

    /*this.firebase.borrarCita(this.claves[i]).subscribe((data) => {
      console.log("Borrado");
      this.cargarCitas();
    })*/
  }

}

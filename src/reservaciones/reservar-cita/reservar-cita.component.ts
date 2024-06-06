import { Component, OnInit } from '@angular/core';
import { Cita } from '../cita.model';
import * as alertifyjs from 'alertifyjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from '../calendario/calendario.component';

@Component({
  selector: 'app-reservar-cita',
  standalone: true,
  imports: [FormsModule, CommonModule, CalendarioComponent],
  templateUrl: './reservar-cita.component.html',
  styleUrl: './reservar-cita.component.css'
})
export class ReservarCitaComponent implements OnInit {
  estadoFecha: boolean = false;
  fecha: any;
  fechaString: string | undefined;
  nombre: string = "";
  usuario: any;
  edad: number = 0;
  correoUsuario: string = "";
  cita: Cita = {
    id: "",
    year: 0,
    mes: 0,
    dia: 0,
    hora: 0,
    paciente: '',
    diaNombre: '',
    mesNombre: '',
    edad: 0,
    doctor: ''
  };
  citasFechaSeleccionada: Cita[] = [];
  selectedOption: number = 0;
  horas: any = [];
  horasOcupadas: any = [];
  doctor: any = null;

  constructor(){
    /*private firebase: FirebaseReservaService,private login: LoginServiceService) {
    this.citasService.getCitas();
    this.nombre = this.login.vnom();*/
  }
  
  ngOnInit() {
    //this.cita = this.citasService.nuevaCita(); 
    /*this.firebase.getDatosUsuario(this.login.iduslog()).subscribe((data) => {
      this.usuario = data;
      this.correoUsuario = this.usuario.email;
    });*/
  }

  procesaPropagar(mensaje: any) {
    this.fecha = mensaje;
    this.estadoFecha = true;
    this.fechaString = `${this.fecha.diaNombre} ${this.fecha.dia} de ${this.fecha.mesNombre} del ${this.fecha.year}`;
    this.horas = [];
    this.horasOcupadas = [];
    // Al seleccionar una fecha, buscamos dentro del servicio las citas del mismo dia
    //this.citasFechaSeleccionada = this.citasService.getCitasFecha(this.fecha.dia, this.fecha.mes, this.fecha.year);
    this.citasFechaSeleccionada.forEach((element: {
      hora: any;
    }) => {
      if(element != null){
        this.horasOcupadas.push(element.hora);
      }
    });
    if (this.horasOcupadas.length > 0) {
      for (let i = 8; i < 20; i++) {
        if (!this.horasOcupadas.includes(i)) {
          this.horas.push(i);
        }
      }
    } 
    else {
      for (let i = 8; i < 20; i++) {
        this.horas.push(i);
      }
    }
  }

  reservarCita() {
    console.log(this.edad);
    this.cita.year = this.fecha.year;
    this.cita.mes = this.fecha.mes;
    this.cita.dia = this.fecha.dia;
    this.cita.hora = this.horas[this.selectedOption];
    this.cita.paciente = this.nombre;
    this.cita.doctor = this.doctor;
    this.cita.diaNombre = this.fecha.diaNombre;
    this.cita.mesNombre = this.fecha.mesNombre;
    this.cita.edad = this.edad;
    //this.citasService.setNuevaCitaDB(this.cita);
    this.enviaCorreo(this.cita);
    //this.cita = this.citasService.nuevaCita();
    this.estadoFecha = false;
    this.doctor = '';
    this.edad = 0;
    this.horas = [];
    alertifyjs.alert('Cita Reservada', 'Se ha almacenado tu reservacion en nuestro sistema', function () {
      alertifyjs.success('Reservacion Exitosa');
    });    
  }

  enviaCorreo(cita:Cita):void{
    
    
    let body = {
      correo: this.correoUsuario,
      asunto: `Nueva Cita Para ${this.usuario.nombre}`,
      descripcion: `Su cita se ha programado para ${cita.diaNombre} ${cita.dia} de ${cita.mesNombre} del ${cita.year}`
    };
    console.log(body);

    /*this.correo.enviarCorreo("https://consultorio.fly.dev/api/correo",body).then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });*/
  }

}

import { Component, OnInit } from '@angular/core';
import { Cita } from '../cita.model';
import swal from 'sweetalert';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from '../calendario/calendario.component';
import { PacienteService } from '../../app/paciente.service';
import { AutenticacionService } from '../../app/autenticacion.service';

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
  citasFechaSeleccionada: Cita[] = [];
  selectedOption: number = 0;
  horas: any = [];
  horasOcupadas: any = [];
  doctor: any = null;
  doctores:any = [];
  hospital = '';
  hospitalID = '';
  numerosc = '';

  constructor(private paciente: PacienteService, private auth: AutenticacionService){}
  

  ngOnInit() {
    this.hospitalID = this.auth.getHospital();
    console.log(this.hospitalID);
    
    this.paciente.getHospitalPaciente(this.auth.getIdUsuario()).then((hospital: any) => {
      this.hospital = hospital[0].nombre;
    });

    this.paciente.getDoctores(this.hospitalID).then((doctores: any) => {
      this.doctores = doctores;
      console.log(this.doctores);
    });
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
    for (let i = 0; i < this.doctores.length; i++) {
      if (this.doctores[i].nombre == this.doctor && this.hospitalID == this.doctores[i].idHospital) {
        this.doctor = this.doctores[i];
        break;
      }
    }
    
    let cedula = this.doctor.cedulaProfesional;
    let hora = this.horas[this.selectedOption];

    this.paciente.getNumeroSeguroSocialPaciente(this.auth.getIdUsuario()).then((paciente: any) => {

      this.numerosc = paciente[0].numeroSeguro;

      let cita = {
        cedula: cedula,
        numerosc: this.numerosc,
        fecha: this.fecha.year+'-'+this.fecha.mes+'-'+this.fecha.dia,
        hora: hora + ':00:00',
        ubicacion: this.hospital
      };

      this.paciente.setConsultaNueva(cita).then((res: any) => {
        if (res.Status == 'Consulta creada') {
          swal('Cita reservada', 'La cita ha sido reservada exitosamente', 'success');
        }else{
          swal('Error', 'No se pudo reservar la cita', 'error');
        }
      });
    });


    this.estadoFecha = false;
    this.doctor = '';
    this.horas = [];
  }
}

import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../app/paciente.service';
import { AutenticacionService } from '../../app/autenticacion.service';
import { Cita } from '../cita.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../app/doctor.service';

@Component({
  selector: 'app-citas-reservadas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './citas-reservadas.component.html',
  styleUrl: './citas-reservadas.component.css'
})
export class CitasReservadasComponent implements OnInit {

  citas: Cita[] = [];

  constructor(private doctor: DoctorService, private usuario: AutenticacionService){}

  ngOnInit(): void {
    this.cargarCitas();
  }


  cargarCitas():void{
    const id = this.usuario.getIdUsuario();
    let hospital = this.usuario.getHospital();
    
    this.doctor.getHospitalDoctor(id).then((response:any) => {
      if (response.length > 0){
        hospital = response[0].nombre;
        
        this.doctor.getCitasDoctor(id).then((response:any) => {
          if(response.length > 0)
            console.log(response);
            for(let i = 0; i < response.length; i++){
              let id = response[i].idConsulta;
              let nombre = response[i].nombre;
              let fecha = new Date(response[i].fechaCon).toLocaleDateString();
              let hora = response[i].hora;
              let consultorio = response[i].consultorio;
              this.citas.push({id, nombre, fecha, hora, hospital, consultorio});
            } 
        });
      }
    });
  }
}

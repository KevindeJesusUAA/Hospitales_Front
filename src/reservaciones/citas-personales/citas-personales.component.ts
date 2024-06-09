import { Component, OnInit } from '@angular/core';
import { Cita } from '../cita.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../app/paciente.service';
import { AutenticacionService } from '../../app/autenticacion.service';

@Component({
  selector: 'app-citas-personales',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas-personales.component.html',
  styleUrl: './citas-personales.component.css'
})
export class CitasPersonalesComponent implements OnInit {

  citas: Cita[] = [];

  constructor(private paciente: PacienteService, private usuario: AutenticacionService){}

  ngOnInit(): void {
    this.cargarCitas();
  }


  cargarCitas():void{
    const id = this.usuario.getIdUsuario();
    let hospital = this.usuario.getHospital();

    
    this.paciente.getHospitalPaciente(id).then((response:any) => {
      if (response.length > 0){
        hospital = response[0].nombre;
        this.paciente.getCitasPaciente(id).then((response:any) => {
          if(response.length > 0)
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

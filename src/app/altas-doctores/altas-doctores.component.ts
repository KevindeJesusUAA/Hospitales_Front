import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdministradorsService } from '../administradors.service';

@Component({
  selector: 'app-altas-doctores',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './altas-doctores.component.html',
  styleUrl: './altas-doctores.component.css'
})
export class AltasDoctoresComponent implements OnInit {
  doctorForm: FormGroup;
  usuarios: any[] = [];

  constructor(private fb: FormBuilder, private administradorsService: AdministradorsService) {
    this.doctorForm = this.fb.group({
      cedulaProfesional: [null],
      Especialidad: ['', [Validators.required, Validators.maxLength(50)]],
      turnoDoc: ['', Validators.required],
      salarioDoc: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      consultorio: ['', [Validators.required, Validators.maxLength(45)]],
      estado: ['', [Validators.required, Validators.maxLength(45)]],
      idCuenta: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.administradorsService.getUsuario().subscribe(
      (data: any[]) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener hospitales:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.doctorForm.valid) {
      const doctor = this.doctorForm.value;
      this.guardarDoctor(doctor);
      console.log('Doctor guardado en localStorage:', doctor);
      this.doctorForm.reset();
    }
  }

  /*guardarDoctor(doctor: any): void {
    let doctores = JSON.parse(localStorage.getItem('doctores') || '[]');
    doctores.push(doctor);
    localStorage.setItem('doctores', JSON.stringify(doctores));
  }*/
  guardarDoctor(doctor: any): void {
    this.administradorsService.AddorUpdateDoctor(doctor).subscribe(response => {
      console.log('Doctor guardado en el servidor:', response);
    }, error => {
      console.error('Error al guardar la receta:', error);
    });
  }
}
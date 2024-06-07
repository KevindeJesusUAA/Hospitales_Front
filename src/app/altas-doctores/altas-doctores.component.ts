import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-altas-doctores',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './altas-doctores.component.html',
  styleUrl: './altas-doctores.component.css'
})
export class AltasDoctoresComponent implements OnInit {
  doctorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.doctorForm = this.fb.group({
      cedulaProfesional: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nombre: ['', Validators.required],
      especialidad: ['', [Validators.required, Validators.maxLength(50)]],
      turnoDoc: ['', Validators.required],
      salarioDoc: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      consultorio: ['', [Validators.required, Validators.maxLength(45)]],
      estado: ['', [Validators.required, Validators.maxLength(45)]],
      idCuenta: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const doctor = this.doctorForm.value;
      this.guardarDoctor(doctor);
      console.log('Doctor guardado en localStorage:', doctor);
      this.doctorForm.reset();
    }
  }

  guardarDoctor(doctor: any): void {
    let doctores = JSON.parse(localStorage.getItem('doctores') || '[]');
    doctores.push(doctor);
    localStorage.setItem('doctores', JSON.stringify(doctores));
  }
}
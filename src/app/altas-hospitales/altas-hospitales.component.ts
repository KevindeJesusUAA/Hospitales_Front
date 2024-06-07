import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-altas-hospitales',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './altas-hospitales.component.html',
  styleUrl: './altas-hospitales.component.css'
})
export class AltasHospitalesComponent implements OnInit {
  hospitalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.hospitalForm = this.fb.group({
      idHospital: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]{10,13}$")]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.hospitalForm.valid) {
      const hospital = this.hospitalForm.value;
      this.guardarHospital(hospital);
      console.log('Hospital guardado en localStorage:', hospital);
      this.hospitalForm.reset();
    }
  }

  guardarHospital(hospital: any): void {
    let hospitales = JSON.parse(localStorage.getItem('hospitales') || '[]');
    hospitales.push(hospital);
    localStorage.setItem('hospitales', JSON.stringify(hospitales));
  }
}
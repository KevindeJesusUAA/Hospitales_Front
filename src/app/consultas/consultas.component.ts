import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css'
})
export class ConsultasComponent implements OnInit {
  consultaForm: FormGroup;
  horaActual: string = '';
  fechaActual: string = '';

  constructor(private fb: FormBuilder) {
    this.consultaForm = this.fb.group({
      idConsulta: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      paciente: ['', [Validators.required, Validators.maxLength(45)]],
      diagnostico: ['', [Validators.required, Validators.maxLength(255)]],
      tratamiento: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    this.actualizarHoraYFecha();
    setInterval(() => {
      this.actualizarHoraYFecha();
    }, 1000);
  }

  actualizarHoraYFecha(): void {
    const fechaHoraActual = new Date();
    this.horaActual = this.obtenerHora(fechaHoraActual);
    this.fechaActual = this.obtenerFecha(fechaHoraActual);
  }

  obtenerHora(fecha: Date): string {
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
  }

  obtenerFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  }

  onSubmit(): void {
    if (this.consultaForm.valid) {
      const consulta = this.consultaForm.value;
      this.guardarConsulta(consulta);
      console.log('Consulta guardada en localStorage:', consulta);
      this.consultaForm.reset();
    }
  }

  guardarConsulta(consulta: any): void {
    let consultas = JSON.parse(localStorage.getItem('consultas') || '[]');
    consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));
  }
}
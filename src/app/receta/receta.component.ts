import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import jsPDF from 'jspdf';
import { DoctorService } from '../doctor.service';
//import { DoctorService } from '../doctor.service';
//import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css'
})
export class RecetaComponent implements OnInit {
  recetaForm: FormGroup;
  fechaActual: string = '';

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.recetaForm = this.fb.group({
        idReceta: [null], // Dejarlo como null
        Descripcion: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.actualizarFecha();
  }

  actualizarFecha(): void {
    const fechaActual = new Date();
    this.fechaActual = this.obtenerFecha(fechaActual);
  }

  obtenerFecha(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }


  onSubmit(): void {
    if (this.recetaForm.valid) {
      const receta = this.recetaForm.value;
      receta.fechaRec = this.fechaActual; // Agregar fecha de la receta
      this.guardarReceta(receta);
      this.generarPDF(receta); // Generar el PDF después de guardar los datos
      this.recetaForm.reset();
    }
  }

  guardarReceta(receta: any): void {
    this.doctorService.AddorUpdateReceta(receta).subscribe(response => {
      console.log('Receta guardada en el servidor:', response);
    }, error => {
      console.error('Error al guardar la receta:', error);
    });
  }

  /*guardarReceta(receta: any): void {
    let recetas = JSON.parse(localStorage.getItem('recetas') || '[]');
    recetas.push(receta);
    localStorage.setItem('recetas', JSON.stringify(recetas));
  }*/

  generarPDF(receta: any): void {
    const doc = new jsPDF();
    
    // Agregar la imagen
    const img = new Image();
    img.src = 'assets/hospicare.png'; // Ruta a tu imagen
    img.onload = () => {
    
      const imgWidth = 100; // Ancho de la imagen
      const imgHeight = 50; // Altura de la imagen
      const pageWidth = doc.internal.pageSize.getWidth(); // Ancho de la página
      const x = (pageWidth - imgWidth) / 2; // Centrar horizontalmente la imagen
      doc.addImage(img, 'PNG', x, 10, imgWidth, imgHeight); // Ajustar posición y tamaño según sea necesario


      // Agregar los datos del hospital
      doc.setFontSize(16);
      doc.text('HOSPICARE', pageWidth / 2, 70, { align: 'center' }); // Centrar horizontalmente el texto
      doc.setFontSize(12);
      doc.text('Calidad y servicio para toda la familia', pageWidth / 2, 80, { align: 'center' }); // Centrar horizontalmente el texto

      // Agregar los datos de la receta
      doc.setFontSize(14);
      //doc.text('ID Receta: ' + receta.idReceta, 10, 100);
      doc.text('Fecha Receta: ' + receta.fechaRec, 10, 110);
      doc.text('Descripción: ' + receta.descripcion, 10, 120);

       // Agregar la imagen inferior después de los datos
       const imgBottom = new Image();
       imgBottom.src = 'assets/contacto.png'; // Ruta a tu imagen inferior
       imgBottom.onload = () => {
        const imgHeightBottom = 50; // Altura de la imagen inferior
        const xBottom = (pageWidth - imgWidth) / 2; // Centrar horizontalmente la imagen
        const yBottom = doc.internal.pageSize.getHeight() - imgHeightBottom - 10; // Posición vertical
        doc.addImage(imgBottom, 'PNG', xBottom, yBottom, imgWidth, imgHeightBottom); // Ajustar posición y tamaño según sea necesario
        doc.save('receta.pdf');
      };
    };
  }
}

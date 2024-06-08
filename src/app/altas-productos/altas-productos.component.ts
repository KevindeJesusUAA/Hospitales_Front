import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacionService } from '../autenticacion.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdministradorsService } from '../administradors.service';

@Component({
  selector: 'app-altas-productos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './altas-productos.component.html',
  styleUrl: './altas-productos.component.css'
})
export class AltasProductosComponent implements OnInit {
  productoForm: FormGroup;
  hospitales: any[] = [];

  constructor(private fb: FormBuilder, private auth: AutenticacionService, private administradorsService: AdministradorsService) {
    this.productoForm = this.fb.group({
      idProductos: [null],
      nombre: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      Hospital_idHospital: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]], // Campo de precio
      marca: ['', Validators.required] // Campo de marca
    });
  }

  ngOnInit(): void {
    this.obtenerHospitales();
  }

  obtenerHospitales(): void {
    this.administradorsService.getHospitales().subscribe(
      (data: any[]) => {
        this.hospitales = data;
      },
      (error) => {
        console.error('Error al obtener hospitales:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const producto = this.productoForm.value;
      this.guardarProducto(producto);
      console.log('Producto guardado en localStorage:', producto);
      this.productoForm.reset();
    }
  }

  guardarProducto(producto: any): void {
    this.administradorsService.AddOrUpdateProducto(producto).subscribe(response => {
      console.log('Doctor guardado en el servidor:', response);
    }, error => {
      console.error('Error al guardar la receta:', error);
    });
  }
}

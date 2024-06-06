import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacionService } from '../autenticacion.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-altas-productos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './altas-productos.component.html',
  styleUrl: './altas-productos.component.css'
})
export class AltasProductosComponent implements OnInit {
  productoForm: FormGroup;
  hospitales: any[] = [
    { id: 1, nombre: 'Hospital A' },
    { id: 2, nombre: 'Hospital B' },
    { id: 3, nombre: 'Hospital C' },
  ];

  constructor(private fb: FormBuilder, private auth: AutenticacionService) {
    this.productoForm = this.fb.group({
      idProducto: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      Hospital_idHospital: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productoForm.valid) {
      const producto = this.productoForm.value;
      this.guardarProducto(producto);
      console.log('Producto guardado en localStorage:', producto);
      this.productoForm.reset();
    }
  }

  guardarProducto(producto: any): void {
    let productos = JSON.parse(localStorage.getItem('productos') || '[]');
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
  }
}

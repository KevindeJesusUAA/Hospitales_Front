import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacionService } from '../autenticacion.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AltasProductosComponent } from '../altas-productos/altas-productos.component';
import { AltasDoctoresComponent } from '../altas-doctores/altas-doctores.component';
import { AltasHospitalesComponent } from '../altas-hospitales/altas-hospitales.component';

@Component({
  selector: 'app-altas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AltasProductosComponent, AltasDoctoresComponent, AltasHospitalesComponent, RouterLink],
  templateUrl: './altas.component.html',
  styleUrl: './altas.component.css'
})
export class AltasComponent{
  selectedForm: string = 'productos';

  onFormChange(event: any) {
    this.selectedForm = event.target.value;
  }
}

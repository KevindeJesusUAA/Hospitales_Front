import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AutenticacionService } from './autenticacion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Hospitales';

  constructor(private ruta:Router,private auth: AutenticacionService){ }

  ngOnInit(): void {
    if(this.auth.estaAutenticado()){
      this.ruta.navigate(['/inicio']);
    }else{
      this.ruta.navigate(['/login']);
    }
  }
}

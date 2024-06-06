import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor(private auth: AutenticacionService){ }

  ngOnInit(): void {
    if(this.auth.estaAutenticado()){
      //window.location.href = '/inicio';
    }else{
      //window.location.href = '/login';
    }
  }
}

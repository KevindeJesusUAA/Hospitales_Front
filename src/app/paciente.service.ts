import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:3000/api'; // Cambia esta URL si tu backend está en una dirección diferente

  constructor(private http: HttpClient) {}

  getPacientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pacientes`);
  }

  addOrUpdatePaciente(paciente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pacientes`, paciente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
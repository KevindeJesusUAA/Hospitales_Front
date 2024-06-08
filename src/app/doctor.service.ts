import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:3000'; // Cambia esta URL si tu backend está en una dirección diferente

  constructor(private http: HttpClient) {}

  getReceta(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recetas`);
  }

  AddorUpdateReceta(receta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddorUpdateReceta`, receta, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorsService {
  private apiUrl = 'http://localhost:3000'; // Cambia esta URL si tu backend está en una dirección diferente

  constructor(private http: HttpClient) {}

  getHospitales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/hospitales`);
  }
  getDoctores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctor`);
  }
  getUsuario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  AddorUpdateHospital(hospital: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddorUpdateHospital`, hospital, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  AddorUpdateDoctor(doctor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddorUpdateDoctor`, doctor, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  AddOrUpdateProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddOrUpdateProducto`, producto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
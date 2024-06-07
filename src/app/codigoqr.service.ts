import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodigoqrService {

  myData:any;

  constructor(private http: HttpClient) {}

  recuperaDatos(body:any){
    //return this.http.post('https://consultorio.fly.dev/api/codigoqr',body).toPromise();
    return {
      "nombre":"Juan",
      "telefono":"1234567890",
      "fecha":"2021-08-01 10:00",
      "doctor":"Dr. Pérez"
    };
  }
}

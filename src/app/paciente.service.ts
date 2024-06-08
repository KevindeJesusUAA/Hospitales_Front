import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  getPacientes(){
    return this.http.get('http://localhost:3000/pacientes').toPromise();
  }

  
  getHospitalPaciente(id: string){
    return this.http.get('http://localhost:3000/hospital/'+id).toPromise();
  }


  addOrUpdatePaciente(paciente: any): Observable<any> {
    return this.http.post(`http://localhost:3000/pacientes`, paciente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

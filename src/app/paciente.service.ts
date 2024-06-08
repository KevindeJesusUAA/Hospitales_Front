import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}

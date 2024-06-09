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

  getCitasPaciente(id: string){
    return this.http.get('http://localhost:3000/consultapersonal/'+id).toPromise();
  }

  getDoctores(id: string){
    return this.http.get('http://localhost:3000/doctores/hospital/'+id).toPromise();
  }

  getNumeroSeguroSocialPaciente(id: string){
    return this.http.get('http://localhost:3000/pacientes/numerosc/'+id).toPromise();
  }

  setConsultaNueva(consulta: any){
    return this.http.post('http://localhost:3000/consultas/crear', consulta).toPromise();
  }

  addOrUpdatePaciente(paciente: any): Observable<any> {
    return this.http.post(`http://localhost:3000/pacientes`, paciente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

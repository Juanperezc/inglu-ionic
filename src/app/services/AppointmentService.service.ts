import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  async index() {

    let params = new HttpParams();
    params = params.append('per_page', '100000');

    return await this.http.get(environment.endpoint + `/appointments`,{
      params: params
    }).toPromise();
  }
  
  async my_appointments() {

    let params = new HttpParams();
    params = params.append('per_page', '100000');

    return await this.http.get(environment.endpoint + `/appointment/my_appointments`,{
      params: params
    }).toPromise();
  }

  async update(id : number ,data : any) {
    return await this.http.put(environment.endpoint + `/appointments/`  + id, data).toPromise();
  }

  async delete(id : number) {
    return await this.http.delete(environment.endpoint + `/appointments/`  + id).toPromise();
  }

  async show(id: number) {
    return await this.http.get(environment.endpoint + `/appointments/`  + id).toPromise();
  }

  //by appointment_id
  async show_treatment(id: number) {
    return await this.http.get(environment.endpoint + `/appointment/treatment/` + id).toPromise();
  }

  async store(data : any) {
    return await this.http.post(environment.endpoint + `/appointments`,data).toPromise();
  }

  status(status){
    switch(status){
      case 0: {
        return "Pendiente";
      }
      case 1: {
        return "Agendado";
      }
      case 2: {
       return "Cancelado";
     }
     case 3: {
       return "Culminado";
     }
  }
}
}

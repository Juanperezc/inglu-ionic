import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  constructor(private http: HttpClient) {}


  async index() {
    let params = new HttpParams();
    params =  params.append("per_page", '9999');
    return await this.http.get(environment.endpoint + `/specialties`,{
      params: params
    }).toPromise();
  }

  async show(id : number ) {
    return await this.http.get(environment.endpoint + `/specialties/`  + id).toPromise();
  }
  
  async update(id : number ,data : any) {
    return await this.http.put(environment.endpoint + `/specialties/`  + id, data).toPromise();
  }
  
  async delete(id : number) {
    return await this.http.delete(environment.endpoint + `/specialties/`  + id).toPromise();
  }

  async store(data : any) {
    return await this.http.post(environment.endpoint + `/specialties`,data).toPromise();
  }
  
}

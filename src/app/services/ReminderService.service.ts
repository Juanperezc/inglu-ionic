import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  constructor(private http: HttpClient) {}

  async index() {
    let params = new HttpParams();
    params =  params.append("per_page", '9999');
    return await this.http
      .get(environment.endpoint + `/reminders`, {
        params: params,
      })
      .toPromise();
  }

  async show(id : number ) {
    return await this.http.get(environment.endpoint + `/reminders/`  + id).toPromise();
  }

  async my_reminders() {
    let params = new HttpParams();
    params =  params.append("per_page", '9999');
    return await this.http
      .get(environment.endpoint + `/reminder/my_reminders`, {
        params: params,
      })
      .toPromise();
  }


  async update(id : number ,data : any) {
    return await this.http.put(environment.endpoint + `/reminders/`  + id, data).toPromise();
  }

  async delete(id : number) {
    return await this.http.delete(environment.endpoint + `/reminders/`  + id).toPromise();
  }

  async store(data : any) {
    return await this.http.post(environment.endpoint + `/reminders`,data).toPromise();
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventUserService {
  constructor(private http: HttpClient) {}


  async update(id : number ,data : any) {
    return await this.http.put(environment.endpoint + `/event/user/`  + id, data).toPromise();
  }

  async delete(id : number) {
    return await this.http.delete(environment.endpoint + `/event/user/`  + id).toPromise();
  }

}

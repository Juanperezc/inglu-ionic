import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class EventService {
  constructor(private http: HttpClient) {}

  async index(type = null) {
    let params = new HttpParams();
    params = params.append("per_page", "100000");
    params = params.append("type", type);

    return await this.http
      .get(environment.endpoint + `/events`, {
        params: params,
      })
      .toPromise();
  }

  async my_events(type = null) {
    let params = new HttpParams();
    params = params.append("per_page", "100000");
    params = params.append("type", type);
    return await this.http
      .get(environment.endpoint + `/event/my_events`, {
        params: params,
      })
      .toPromise();
  }

  async show(id: number) {
    return await this.http
      .get(environment.endpoint + `/events/` + id)
      .toPromise();
  }
  async join(id: number) {
    return await this.http
      .put(environment.endpoint + `/event/join/` + id, null)
      .toPromise();
  }
  async update(id: number, data: any) {
    return await this.http
      .put(environment.endpoint + `/events/` + id, data)
      .toPromise();
  }
  async delete(id: number) {
    return await this.http
      .delete(environment.endpoint + `/events/` + id)
      .toPromise();
  }

  async store(data: any) {
    return await this.http
      .post(environment.endpoint + `/events`, data)
      .toPromise();
  }
}

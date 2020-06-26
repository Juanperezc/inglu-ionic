import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ClubPostService {
  constructor(private http: HttpClient) {}

  async index(perPage = 10, category_id = null) {
    let params = new HttpParams();
    params =  params.append("per_page", perPage.toString());
    if (category_id){
      params = params.append("category_id", category_id.toString());
    }
    return await this.http
      .get(environment.endpoint + `/posts`, {
        params: params,
      })
      .toPromise();
  }
  async show(id: number) {
    return await this.http
      .get(environment.endpoint + `/posts/` + id)
      .toPromise();
  }

  async update(id: number, data: any) {
    return await this.http
      .put(environment.endpoint + `/posts/` + id, data)
      .toPromise();
  }

  async store(data: any) {
    return await this.http
      .post(environment.endpoint + `/posts`, data)
      .toPromise();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  async upload_file(file : any, path = "default") {

    let formData = new FormData();
    formData.append("file", file);
    formData.append("path", path); 
 
    console.log(formData);
    return await this.http.post(environment.endpoint + `/upload_file`,
      formData/* ,httpOptions */).toPromise();
  }

}

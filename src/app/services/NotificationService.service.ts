import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
/* import { ILogin } from '../../interfaces/user/login'; */

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  async read_notifications() {
    return await this.http.post(environment.endpoint + `/user/read_notifications`, null).toPromise();
  }



  getRouteFromType(type){
    switch(type){
      case "App\\Notifications\\NewAppointment": {
        return "app/tabs/appointments";
      }
       case "App\\Notifications\\NewReminder": {
        return "app/tabs/reminders";
      }
      default: {
        return null;
      }
    }
  }

   getImgFromType(type){
    switch(type){
      case "App\\Notifications\\NewAppointment": {
        return "/assets/notifications/stethoscope-alt.svg";
      }
      case "App\\Notifications\\NewReminder": {
        return "/assets/notifications/notification.svg";
      } 
      default: {
        return null;
      }
    }
  }

   getTitleFromType(type){
    switch(type){
      case "App\\Notifications\\NewAppointment": {
        return "Tienes una nueva cita agendada";
      }
      case "App\\Notifications\\NewReminder": {
        return "Tienes un recordatorio pendiente";
      }
      default: {
        return null;
      }
    }
  }
}

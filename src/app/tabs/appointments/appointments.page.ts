import { Component } from '@angular/core';
import { AppointmentService } from 'src/app/services/AppointmentService.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-appointments',
  templateUrl: 'appointments.page.html',
  styleUrls: ['appointments.page.scss']
})
export class AppointmentsPage {
  public appointments = [];

  
  constructor(private appointmentService: AppointmentService,
    private navController: NavController) {}

  async ionViewDidEnter() {
    await this.loadAppointments();
    // this.notificationService.getImgFromType()
  }

  async loadAppointments() {
    try {
      /*    await this.globalService.presentLoading(); */
      const postResponse: any = await this.appointmentService.my_appointments();
      this.appointments = postResponse.data;
      console.log('this.appointments', this.appointments);
      /*  await this.globalService.closeLoading();
       await this.globalService.saveToast(); */
    } catch (error) {
      console.error("error", error);
      /*    await this.globalService.closeLoading(); */
    }
  }
  getStatusItem(status){
    return this.appointmentService.status(status);
  }


  goToAppointment(id){
    this.navController.navigateForward(`/app/appointment-detail/${id}`);
  }

}

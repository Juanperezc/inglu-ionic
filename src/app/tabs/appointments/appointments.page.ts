import { Component } from "@angular/core";
import { AppointmentService } from "src/app/services/AppointmentService.service";
import { NavController, ModalController } from "@ionic/angular";
import { UserStorage } from "src/app/services/storage/UserStorage.service";
import { SelectSpecialtyComponent } from "src/app/components/select-specialty/select-specialty.component";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-appointments",
  templateUrl: "appointments.page.html",
  styleUrls: ["appointments.page.scss"],
})
export class AppointmentsPage {
  public appointments: Array<any>;
  public user: any;
  public updateAppointment: any;

  constructor(
    private appointmentService: AppointmentService,
    private navController: NavController,
    private modalController: ModalController,
    private globalService: GlobalService
  ) {}

  async addAppointment() {
    const modal = await this.modalController.create({
      component: SelectSpecialtyComponent,
      cssClass: "select-specialty-component",
    });
    modal.onWillDismiss().then(async (res: any) => {
      console.log("res", res);
      const data = res.data;
      if (data.id != null) {
        this.navController.navigateForward(
          "/app/create-appointment/" + data.id
        );
      }
    });
    await modal.present();
  }

  async ionViewDidEnter() {
    this.user = await UserStorage.getUser();
    this.updateAppointment = this.globalService.updateAppointment.subscribe(
      async (res) => {
        if (res != false) {
          await this.loadAppointments();
        }
      }
    );
    await this.loadAppointments();
    // this.notificationService.getImgFromType()
  }

  async loadAppointments() {
    try {
      /*    await this.globalService.presentLoading(); */
      const postResponse: any = await this.appointmentService.my_appointments();
      this.appointments = postResponse.data;
      console.log("this.appointments", this.appointments);
      /*  await this.globalService.closeLoading();
       await this.globalService.saveToast(); */
    } catch (error) {
      console.error("error", error);
      /*    await this.globalService.closeLoading(); */
    }
  }
  
  ionViewDidLeave() {
    if (this.updateAppointment) {
      this.updateAppointment.unsubscribe();
    }
  }

  getStatusItem(status) {
    return this.appointmentService.status(status);
  }

  goToAppointment(id) {
    this.navController.navigateForward(`/app/appointment-detail/${id}`);
  }
}

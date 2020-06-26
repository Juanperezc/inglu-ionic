import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { AppointmentService } from 'src/app/services/AppointmentService.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.page.html',
  styleUrls: ['./appointment-detail.page.scss'],
})
export class AppointmentDetailPage implements OnInit {

  id: any;
  public appointment= null;
  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private globalService: GlobalService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.id = params["id"];
      console.log("this.id", this.id);
      await this.loadPost(this.id);
    });
  }

  async loadPost(id: any) {
    try {
      await this.globalService.presentLoading();
      const appointmentResponse: any = await this.appointmentService.show(id);
      this.appointment = appointmentResponse.data;
      console.log("this.posts", this.appointment);
      await this.globalService.closeLoading();
    } catch (error) {
      console.error("error", error);
      await this.globalService.closeLoading();
    }
  }

  getMomentFrom(time: any){
    return this.globalService.momentTimeAgo(time, "DD-MM-YYYY HH:mm");
  }
}

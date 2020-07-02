import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { AppointmentService } from 'src/app/services/AppointmentService.service';
import { ReportComponent } from 'src/app/components/report/report.component';
import { SuggestionComponent } from 'src/app/components/suggestion/suggestion.component';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { UserStorage } from 'src/app/services/storage/UserStorage.service';
import { StarRatingComponent } from 'ng-starrating';
import { ReScheduleComponent } from 'src/app/components/re-schedule/re-schedule.component';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.page.html',
  styleUrls: ['./appointment-detail.page.scss'],
})
export class AppointmentDetailPage implements OnInit {

  id: any;
  public a= null;
  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private globalService: GlobalService,
    private modalController: ModalController,
    private alertController: AlertController,
    private navController: NavController,
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.id = params["id"];
      console.log("this.id", this.id);
      await this.loadAppointment(this.id);
    });
  }

  async report() {
    const modal = await this.modalController.create({
      component: ReportComponent,
      cssClass: "report-component",
    });
    modal.onWillDismiss().then(async (res: any) => {});
    await modal.present();
  }

  async suggestion() {
    const modal = await this.modalController.create({
      component: SuggestionComponent,
      cssClass: "suggestion-component",
    });
    modal.onWillDismiss().then(async (res: any) => {});
    await modal.present();
  }

  async reScheduleAppointment(){
    console.log('this.a.medical_staff_id',this.a.medical_staff_id)
    const modal = await this.modalController.create({
      component: ReScheduleComponent,
      cssClass: "re-schedule-component",
      componentProps: {
        'id': this.id,
        'medical_staff_id': this.a.medical_staff_id,
        'user_workspace_id' : this.a.user_workspace_id
      }
    });
    modal.onWillDismiss().then(async (res: any) => {});
    await modal.present();
  }



  async presentRate(qualitication) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Comentario (Opcional)",
      inputs: [
        {
          name: "paragraph",
          id: "paragraph",
          type: "textarea",
          placeholder: "Escribe un comentario",
        },
      ],
      buttons: [
        {
          text: "Atras",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Enviar",
          handler: (e) => {
            console.log("Confirm Ok", e,qualitication);
            let commentary = null;
            if (e.paragraph != ""){
              commentary = e.paragraph;
            }
            this.saveQualification(qualitication,commentary)
          },
        },
      ],
    });

    await alert.present();
  }

  async saveQualification(q,comment = null){
    try {
      await this.globalService.presentLoading();
      const user = await UserStorage.getUser();
      const data = {
        condition : this.a.condition,
        medical_staff_id: this.a.medical_staff_id,
        user_workspace_id: this.a.user_workspace_id,
        patient_id: this.a.patient_id,
        date: this.a.date,
        qualification:q,
        comment: comment
      }
      const appointmentResponse: any = await this.appointmentService.update(this.id,data);
    /*   this.e = appointmentResponse.data; */
      console.log("this.appointment", appointmentResponse);
      await this.globalService.closeLoading();
      await this.loadAppointment(this.id);
    } catch (error) {
      console.error("error", error);
      await this.globalService.closeLoading();
    }
  }  

  async cancelAppointment(){
    try {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Advertencia',
        message: '¿Esta seguro que desea cancelar su cita? No se podran revertir los cambios.',
        buttons: [
          {
            text: 'Volver',
            role: 'cancel',
            cssClass: 'secondary',
            handler: async (blah) => {


            }
          }, {
            text: 'Aceptar',
            handler: async () => {
              await this.globalService.presentLoading();
              const eventResponse: any = await this.appointmentService.delete(this.id);
              console.log("this.event", eventResponse);
              await this.globalService.closeLoading();
              this.globalService.incUpdateAppointment(true);
              this.navController.back();
            }
          }
        ]
      });
  
      await alert.present();
    
    } catch (error) {
      console.error("error", error);
      await this.globalService.closeLoading();
    }
  }
  
  async onRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    console.log(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
    this.presentRate($event.newValue);
  }

  async loadAppointment(id: any) {
    try {
      await this.globalService.presentLoading();
      const appointmentResponse: any = await this.appointmentService.show(id);
      this.a = appointmentResponse.data;
      console.log("this.posts", this.a);
      await this.globalService.closeLoading();
    } catch (error) {
      console.error("error", error);
      await this.globalService.closeLoading();
    }
  }

  getStatus(status){
    switch(status){
      case 1:
        return "Activo"
      case 2:
        return "Cancelado"
      case 3:
        return "Culminado"
    }
  }
  getMomentDate(time: any){
    return this.globalService.momentDate(time);
  }
}

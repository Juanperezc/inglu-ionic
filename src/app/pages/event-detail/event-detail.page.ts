import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "src/app/services/EventService.service";
import { GlobalService } from "src/app/services/global.service";
import { StarRatingComponent } from "ng-starrating";
import { AlertController, ModalController } from "@ionic/angular";
import { ReportComponent } from "src/app/components/report/report.component";
import { SuggestionComponent } from "src/app/components/suggestion/suggestion.component";
import { EventUserService } from 'src/app/services/EventUserService.service';
import { UserStorage } from 'src/app/services/storage/UserStorage.service';

@Component({
  selector: "app-event-detail",
  templateUrl: "./event-detail.page.html",
  styleUrls: ["./event-detail.page.scss"],
})
export class EventDetailPage implements OnInit {
  id: any;
  public e = null;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private eventUserService: EventUserService,
    private globalService: GlobalService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.id = params["id"];
      console.log("this.id", this.id);
      await this.loadEvent(this.id);
    });
  }

  async loadEvent(id: any) {
    try {
      await this.globalService.presentLoading();
      const eventResponse: any = await this.eventService.show(id);
      this.e = eventResponse.data;
      console.log("this.event", this.e);
      await this.globalService.closeLoading();
    } catch (error) {
      console.error("error", error);
      await this.globalService.closeLoading();
    }
  }

  getMomentDate(time) {
    return this.globalService.momentDate(time);
  }

  async joinEvent() {
    try {
      await this.globalService.presentLoading();
      const eventResponse: any = await this.eventService.join(this.id);
      this.e = eventResponse.data;
      console.log("this.event", this.e);
      await this.globalService.closeLoading();
      await this.loadEvent(this.id);
    } catch (error) {
      console.error("error", error);
      await this.globalService.closeLoading();
    }
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
          text: "Volver",
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
        event_id: parseInt(this.id,10),
        user_id: user.id,
        qualification:q,
        comment: comment
      }
      const eventResponse: any = await this.eventUserService.update(this.e.event_user_id,data);
    /*   this.e = eventResponse.data; */
      console.log("this.event", eventResponse);
      await this.globalService.closeLoading();
      await this.loadEvent(this.id);
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

  async unSubscribe(){
    try {
      
      await this.globalService.presentLoading();
      const eventResponse: any = await this.eventUserService.delete(this.e.event_user_id);
      console.log("this.event", eventResponse);
      await this.globalService.closeLoading();
      await this.loadEvent(this.id);
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
}

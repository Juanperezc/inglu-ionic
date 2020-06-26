import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "src/app/services/EventService.service";
import { GlobalService } from "src/app/services/global.service";
import { StarRatingComponent } from "ng-starrating";
import { AlertController, ModalController } from "@ionic/angular";
import { ReportComponent } from "src/app/components/report/report.component";
import { SuggestionComponent } from "src/app/components/suggestion/suggestion.component";

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

  async presentRate() {
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
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Enviar",
          handler: (e) => {
            console.log("Confirm Ok", e);
          },
        },
      ],
    });

    await alert.present();
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
    this.presentRate();
  }
}

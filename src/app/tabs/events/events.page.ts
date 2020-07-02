import { Component } from "@angular/core";
import { NavController, ModalController, AlertController } from "@ionic/angular";
import { EventService } from "src/app/services/EventService.service";
import { FilterEventsComponent } from 'src/app/components/filter-events/filter-events.component';
import { GlobalService } from 'src/app/services/global.service';
import { UserStorage } from 'src/app/services/storage/UserStorage.service';

@Component({
  selector: "app-events",
  templateUrl: "events.page.html",
  styleUrls: ["events.page.scss"],
})
export class EventsPage {
  segmentModel = "events";
  public type = null;
  public events: any;
  public my_events: any;
  public user: any;
  
  constructor(
    private eventService: EventService,
    private navController: NavController,
    private modalController: ModalController,
    private alertController: AlertController,
    private globalService : GlobalService
  ) {}

  async ionViewDidEnter() {
    this.user = await UserStorage.getUser();
    await this.loadEvents();
    await this.loadMyEvents();
    // this.notificationService.getImgFromType()
  }

  async presentFilter() {
    if (this.type != null){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmacion',
        message: '¿Deseas dejar de aplicar el filtro?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            
            }
          }, {
            text: 'Si',
            handler: async() => {
              console.log('Confirm Okay');
              this.type = null;
              await this.loadEvents();
              await this.loadMyEvents();
            }
          }
        ]
      });
      await alert.present();
    }else{
      const modal = await this.modalController.create({
        component: FilterEventsComponent,
        cssClass: 'filter-events-component'
      });
      modal.onWillDismiss().then(async (res: any) => {
        console.log(res);
        const data = res.data;
        if (data.type){
          console.log('type',data.type)
          this.type = data.type;
          await this.loadEvents();
          await this.loadMyEvents();
        }
     
      });
       await modal.present();
    }

  }

  async loadEvents() {
    try {
      /*    await this.globalService.presentLoading(); */
      const eventResponse: any = await this.eventService.index(this.type);
      this.events = eventResponse.data;
      console.log("this.events", this.events);
      /*  await this.globalService.closeLoading();
       await this.globalService.saveToast(); */
    } catch (error) {
      console.error("error", error);
      /*    await this.globalService.closeLoading(); */
    }
  }
  async loadMyEvents() {
    try {
      /*    await this.globalService.presentLoading(); */
      const eventResponse: any = await this.eventService.my_events(this.type);
      this.my_events = eventResponse.data;
      console.log("this.events", this.my_events);
      /*  await this.globalService.closeLoading();
       await this.globalService.saveToast(); */
    } catch (error) {
      console.error("error", error);
      /*    await this.globalService.closeLoading(); */
    }
  }
  /*   getStatusItem(status){
    return this.eventService.status(status);
  }
 */

  segmentChanged(ev: any) {
   /*  console.log("Segment changed", ev); */
  }

  goToEvent(id) {
    this.navController.navigateForward(`/app/event-detail/${id}`);
  }
  getMomentDate(time) {
    return this.globalService.momentDate(time);
  }
}

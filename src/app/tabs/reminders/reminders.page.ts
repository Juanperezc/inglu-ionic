import { Component, OnInit } from '@angular/core';

import { GlobalService } from "../../services/global.service";
import { NavController, AlertController } from '@ionic/angular';
import { UserStorage } from 'src/app/services/storage/UserStorage.service';
import { ReminderService } from 'src/app/services/ReminderService.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {
  public reminders: Array<any>;
  public user: any;

  constructor(
    private globalService: GlobalService,
    private reminderService: ReminderService,
    private navController: NavController,
    private alertController: AlertController) {
      
    }

    async addReminders() {

      this.navController.navigateForward(`/app/create-reminder`);
    }
  
    async ionViewDidEnter() {
      this.user = await UserStorage.getUser();
    
      await this.loadReminders();
      // this.notificationService.getImgFromType()
    }
  
    async loadReminders() {
      try {
        /*    await this.globalService.presentLoading(); */
        const reminderResponse: any = await this.reminderService.my_reminders();
        this.reminders = reminderResponse.data;
        console.log("this.reminders", this.reminders);
        /*  await this.globalService.closeLoading();
         await this.globalService.saveToast(); */
      } catch (error) {
        console.error("error", error);
        /*    await this.globalService.closeLoading(); */
      }
    }
    
    ionViewDidLeave() {
 
    }
  
    getStatusItem(status) {
     /*  return this.reminderService.status(status); */
    }
  
    async deleteReminder(id){
      try {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Advertencia',
          message: '¿Esta seguro que desea cancelar su cita? No se podran revertir los cambios.',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: async (blah) => {
  
  
              }
            }, {
              text: 'Aceptar',
              handler: async () => {
                await this.globalService.presentLoading();
                const reminderResponse: any = await this.reminderService.delete(id);
                console.log("this.event", reminderResponse);
                await this.globalService.closeLoading();
                await this.loadReminders();
                
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

    goToReminder(id) {
      this.navController.navigateForward(`/app/reminder-detail/${id}`);
    }

    async ngOnInit() {
     
    }

}

import { Component, OnInit } from '@angular/core';
import { UserStorage } from 'src/app/services/storage/UserStorage.service';
import { GlobalService } from 'src/app/services/global.service';
import { NotificationService } from 'src/app/services/NotificationService.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications = [];
  constructor(private globalService : GlobalService,
    private notificationService: NotificationService,
    private navController: NavController) { }

  async ngOnInit() {
    const user: any = await UserStorage.getUser();
    this.notifications = user.notifications;
    this.readNotifications();
   // this.notificationService.getImgFromType()
  }

  async readNotifications(){
      try {
    /*    await this.globalService.presentLoading(); */
       const userResponse: any = await this.notificationService.read_notifications();
       await UserStorage.setUser(userResponse.data);
      /*  await this.globalService.closeLoading();
       await this.globalService.saveToast(); */
      } catch (error) {
     /*    await this.globalService.closeLoading(); */
      }
  }

  goToSection(type: any){
    
    const route =  this.notificationService.getRouteFromType(type);
    if (route != null){
      this.navController.navigateForward(route);
    }
  
  }
  getImage(type: any){
    
    return this.notificationService.getImgFromType(type);
  }
  getTitle(type: any){
    return this.notificationService.getTitleFromType(type);
  }
  getMomentFrom(time: any){
    return this.globalService.momentTimeAgo(time);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/UserService.service';
import { UserStorage } from 'src/app/services/storage/UserStorage.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {
  private notifications = [];
  @Input() title: string = null;
  
  constructor(private navController: NavController) { }

  async ngOnInit() {
    const user: any = await UserStorage.getUser();
    console.log(user);
    this.notifications = user.notifications;
  }
  unreadNotification(){
    let unread = 0;
    this.notifications.forEach((element : any) => {
     if (element.read_at == null )
      unread++;
    });
    return unread;
  }

  goToNotifications(){
    this.navController.navigateForward("/app/notifications");
  }
 /*  goToSettings(){
    this.navController.navigateForward("settings");
  } */
}

import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxSpinnerService } from 'ngx-spinner';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { UserStorage } from './services/storage/UserStorage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController : NavController,
    private oneSignal: OneSignal
  
  ) {
 
    /* this.navController.navigateRoot('login') */
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('cordova')) {
        this.oneSignal.startInit('cb5aeb81-0aa0-4952-9578-fa33dd0e0ebd', '517066045765');

        const user = await UserStorage.getUser();
  
        if (user){
          console.log('user',user);
          this.oneSignal.setEmail(user.email);
        }
  
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
  
        this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
        });
  
        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });
  
        this.oneSignal.endInit();

      }
     
    });
  }
}

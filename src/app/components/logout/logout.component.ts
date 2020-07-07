    import { Component, OnInit } from "@angular/core";
    import { NavController, PopoverController, Platform } from "@ionic/angular";
    import { UserStorage } from "../../services/storage/UserStorage.service";
import { OneSignal } from '@ionic-native/onesignal/ngx';

    @Component({
      selector: "app-logout",
      templateUrl: "./logout.component.html",
      styleUrls: ["./logout.component.scss"],
    })
    export class LogoutComponent implements OnInit {
      constructor(
        private platform: Platform,
        private oneSignal: OneSignal,
        private navigationCtrl: NavController,
        private popoverController: PopoverController
      ) {}

      ngOnInit() {}

      async dismissClick() {
        await this.popoverController.dismiss();
      }

      async logout() {
        if (this.platform.is('cordova')) {
          this.oneSignal.logoutEmail().then((res) => console.log(res))
          .catch((err) => console.error('error', err));
        }
        await UserStorage.clear();
        this.dismissClick();
        this.navigationCtrl.navigateRoot("/login");
      }
    }

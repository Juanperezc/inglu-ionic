import { Component, OnInit } from '@angular/core';
import { UserStorage } from 'src/app/services/storage/UserStorage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private navigationCtrl: NavController) { }

  ngOnInit() {
  }
  async logout(){
   await  UserStorage.clear();
   this.navigationCtrl.navigateRoot('/login');

  }

}

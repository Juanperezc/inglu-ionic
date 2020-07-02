import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth-verify',
  templateUrl: './auth-verify.component.html',
  styleUrls: ['./auth-verify.component.scss'],
})
export class AuthVerifyComponent implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {}

  goToLogin(){
    this.navController.navigateForward("/login")
  }
}

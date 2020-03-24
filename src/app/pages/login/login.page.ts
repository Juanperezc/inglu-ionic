import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navController: NavController,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  onLogin(){
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.navController.navigateRoot('')
    }, 3000);
   
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserStorage } from 'src/app/services/storage/UserStorage.service';
import { UserService } from 'src/app/services/UserService.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm : FormGroup;

  constructor(private navController: NavController,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private userService: UserService) { 
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['',Validators.required],
      });
    }

  ngOnInit() {
  }



  async onLogin() {
 
    if (this.loginForm.valid) {
      try {
        await this.globalService.presentLoading("Cargando");
        const loginData: any = await this.userService.login(this.loginForm.value);
        if (!loginData.data){
        throw "Error data not found";
        }
        console.log(loginData);
        await UserStorage.setUser(loginData.data.user)
        await UserStorage.setToken(loginData.data.token);
        this.spinner.show();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.navController.navigateRoot('')
        }, 3000);
        console.log(loginData);
        await this.globalService.closeLoading();

      } catch (error) {
        console.error("error catch", error);
        await this.globalService.closeLoading();

      }
    } else {
     /*  console.log(this.formService.getAllErrors(this.loginForm)); */
    }
  }

}

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserStorage } from '../storage/UserStorage.service';
import { NavController } from '@ionic/angular';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( private navController: NavController) {}
  async canActivate(): Promise<boolean> {
    const isAuthenticated = await UserStorage.isAuthenticated();
  /*   console.log('guard', isAuthenticated); */
    if (isAuthenticated) {
      return true;
    }else{
      this.navController.navigateRoot('/login');
      return false;
    }
   
  }
}
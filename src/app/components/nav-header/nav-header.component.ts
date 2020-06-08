import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {

  @Input() title: string = null;

  constructor(private navController: NavController) { }

  ngOnInit() {}

 /*  goToSettings(){
    this.navController.navigateForward("settings");
  } */
}

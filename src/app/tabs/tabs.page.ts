import { Component } from '@angular/core';
import { UserStorage } from '../services/storage/UserStorage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public user: any;
  constructor() {
    
  }
  async ngOnInit(){
    this.user = await UserStorage.getUser();
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { SpecialtyService } from 'src/app/services/SpecialtyService.service';

@Component({
  selector: 'app-select-specialty',
  templateUrl: './select-specialty.component.html',
  styleUrls: ['./select-specialty.component.scss'],
})
export class SelectSpecialtyComponent implements OnInit {
  public specialties = [];
  constructor(private modalController: ModalController,
    private globalService: GlobalService,
    private specialtyService: SpecialtyService) { }

  async ngOnInit() {
    await this.loadSpecialties();
  }

  async loadSpecialties() {
    try {
      await this.globalService.presentLoading();
      const specialties: any = await this.specialtyService.index();
      this.specialties = specialties.data;
      console.log("this.specialties", this.specialties);
      await this.globalService.closeLoading();
    } catch (error) {
      console.error("error", error);
      await this.globalService.closeLoading();
    }
  }

  dismissModal(id = null){
    this.modalController.dismiss({
      'dismiss': 1,
      'id' : id
    });
  }
}

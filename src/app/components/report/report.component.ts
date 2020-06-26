import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClaimService } from 'src/app/services/ClaimService.service';
import { ClaimUserService } from 'src/app/services/ClaimUserService.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  public claimTypes : [];
  public claimForm : FormGroup;

  constructor(private modalController: ModalController,
    private claimService: ClaimService,
    private claimUserService: ClaimUserService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder) {

    }

    async onReport() {
      if (this.claimForm.valid) {
        try {
          await this.globalService.presentLoading("Cargando");
          const claimUserData: any = await this.claimUserService.store(this.claimForm.value);
          if (!claimUserData.data){
          throw "Error data not found";
          }
          console.log(claimUserData);
          await this.globalService.closeLoading();
          await this.globalService.saveToast("Su reporte se envio correctamente");
          this.dismissModal();
        } catch (error) {
          console.error("error catch", error);
          await this.globalService.closeLoading();
        }
      } else {
       /*  console.log(this.formService.getAllErrors(this.claimForm)); */
      }
    }

    async loadClaimTypes() {
      try {
        await this.globalService.presentLoading();
        const claimTypes: any = await this.claimService.index();
        this.claimTypes = claimTypes.data;
        console.log("this.claimTypes", this.claimTypes);
        await this.globalService.closeLoading();
      } catch (error) {
        console.error("error", error);
        await this.globalService.closeLoading();
      }
    }


  dismissModal(){
    this.modalController.dismiss({
      'dismiss': 1
    });
  }

  async ngOnInit() {
    this.claimForm = this.formBuilder.group({
      claim_id: ['', Validators.required],
      text: ['', Validators.required],
      status: [0, Validators.required],

    });
    await this.loadClaimTypes();
  }

}

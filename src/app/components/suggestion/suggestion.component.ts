import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { SuggestionService } from 'src/app/services/SuggestionService.service';
import { SuggestionUserService } from 'src/app/services/SuggestionUserService.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
})
export class SuggestionComponent implements OnInit {

  public suggestionTypes : [];
  public suggestionForm : FormGroup;

  constructor(private modalController: ModalController,
    private suggestionService: SuggestionService,
    private suggestionUserService: SuggestionUserService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder) {

    }

    async onReport() {
      if (this.suggestionForm.valid) {
        try {
          await this.globalService.presentLoading("Cargando");
          const suggestionUserData: any = await this.suggestionUserService.store(this.suggestionForm.value);
          if (!suggestionUserData.data){
          throw "Error data not found";
          }
          console.log(suggestionUserData);
          await this.globalService.closeLoading();
          await this.globalService.saveToast("Su reporte se envio correctamente");
          this.dismissModal();
        } catch (error) {
          console.error("error catch", error);
          await this.globalService.closeLoading();
        }
      } else {
       /*  console.log(this.formService.getAllErrors(this.suggestionForm)); */
      }
    }

    async loadSuggestionTypes() {
      try {
        await this.globalService.presentLoading();
        const suggestionTypes: any = await this.suggestionService.index();
        this.suggestionTypes = suggestionTypes.data;
        console.log("this.suggestionTypes", this.suggestionTypes);
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
    this.suggestionForm = this.formBuilder.group({
      suggestion_id: ['', Validators.required],
      text: ['', Validators.required],
      status: [0, Validators.required],

    });
    await this.loadSuggestionTypes();
  }
}

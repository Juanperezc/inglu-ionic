import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from "moment";
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { NavController, AlertController } from '@ionic/angular';
import { ReminderService } from '../services/ReminderService.service';
import { UserStorage } from '../services/storage/UserStorage.service';

@Component({
  selector: 'app-reminder-detail',
  templateUrl: './reminder-detail.page.html',
  styleUrls: ['./reminder-detail.page.scss'],
})
export class ReminderDetailPage implements OnInit {

  public id: any = null;
  public reminderForm: FormGroup;
  /* minDate: string = moment().toISOString(); */
  public monthNames: any;
  public monthShortNames: any;
  public reminder: any;

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private reminderService: ReminderService,
    private navController : NavController
  ) {
    moment.locale("es-es");
    this.monthNames = moment.months();
    this.monthShortNames = moment.monthsShort();
   }

  async ngOnInit() {
    const user = await UserStorage.getUser();
    this.route.params.subscribe(async (params) => {
      this.id = params["id"];
      if ( params["id"]){
        await this.globalService.presentLoading();
        await this.loadReminder(this.id);
        await this.globalService.closeLoading();
      }
      this.reminderForm = this.formBuilder.group({
        id:  [this.id],
        title: [this.reminder ? this.reminder.title : null, Validators.required],
        description: [this.reminder ? this.reminder.description : null, Validators.required],
        date: [this.reminder ? this.reminder.date : "", Validators.required],
        user_id: [user.id, null],
        status: [1, null],
      });
    });
  }

  async loadReminder(id){
    try {
      const reminder: any = await this.reminderService.show(id);
      this.reminder = reminder.data;
      
    } catch (error) {
      
    }
  }

  async onSave(form: FormGroup) {
    if (form.valid) {
      const formValue = form.value;
      const momentDate = moment(formValue.date);
       formValue.date = momentDate.format("YYYY-MM-DD HH:mm:ss") 
       if (formValue.id == null){
        this.storeReminder(formValue);
       }else{
        this.updateReminder(formValue);
       }
    }
  }
  async storeReminder(formValue : any){
    try {
      await this.globalService.presentLoading();
      const reminder: any = await this.reminderService.store(
        formValue
      );
      const reminderData: any = reminder.data;
      await this.globalService.closeLoading();
        await this.globalService.saveToast("El recordatorio se creo con exito");
        this.globalService.incUpdateAppointment(true);
        this.navController.back();
   /*      this.navController.navigateRoot("/app/reminder-detail/" + reminderData.id) */
      /*  GlobalService.CloseSweet(); */
    } catch (error) {
      await this.globalService.closeLoading();
       /*  if (error.status == 430){
          this.globalService.errorToast(
            "No hay citas disponibles en ese horario"
          ); */
       /*  this.closeModal(); */
      }
   
  }

  async updateReminder(formValue : any){
    try {
      await this.globalService.presentLoading();
      const reminder: any = await this.reminderService.update(this.id,
        formValue
      );
      await this.globalService.closeLoading();
        await this.globalService.saveToast("El recordatorio se modifico con exito");
        this.globalService.incUpdateAppointment(true);
 /*        this.navController.navigateRoot("/app/tabs/reminders") */
      /*  GlobalService.CloseSweet(); */
    } catch (error) {
      await this.globalService.closeLoading();
       /*  if (error.status == 430){
          this.globalService.errorToast(
            "No hay citas disponibles en ese horario"
          ); */
       /*  this.closeModal(); */
      }
   
  }
 





}

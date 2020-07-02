import { Component, OnInit, Input } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { GlobalService } from "src/app/services/global.service";
import { AppointmentService } from "src/app/services/AppointmentService.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import * as moment from "moment";
import { UserService } from "src/app/services/UserService.service";
import { UserStorage } from 'src/app/services/storage/UserStorage.service';

@Component({
  selector: "app-re-schedule",
  templateUrl: "./re-schedule.component.html",
  styleUrls: ["./re-schedule.component.scss"],
})
export class ReScheduleComponent implements OnInit {
  @Input() id: any;
  @Input() medical_staff_id : any;
  @Input() user_workspace_id :any;
  public minDate = moment().toISOString();
  public appointmentForm: FormGroup;
  public user_workspaces = [];
  public doctors = [];
  public monthNames: any;
  public monthShortNames: any;
  constructor(
    private modalController: ModalController,
    private globalService: GlobalService,
    private appointmentService: AppointmentService,
    private navController: NavController,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    moment.locale("es-es");
    this.monthNames = moment.months();
    this.monthShortNames = moment.monthsShort();
  }

  getDayStr(day) {
    return this.globalService.getDayStr(day);
  }

  dismissModal() {
    this.modalController.dismiss({
      dismiss: 1,
    });
  }


  async loadWorkspace(user_id: any) {
    try {
      await this.globalService.presentLoading();
      const user_workspaces: any = await this.userService.show_workspace(
        user_id
      );
      this.user_workspaces = user_workspaces.data;
      await this.globalService.closeLoading();
    } catch (error) {
      await this.globalService.closeLoading();
    }
  }

  async updateAppointment(appointmentData: any) {
    try {
      await this.globalService.presentLoading();
      const appointment: any = await this.appointmentService.update(
        this.id,
        appointmentData
      );
      await this.globalService.closeLoading();
      await this.globalService.saveToast("La cita se reprogramo con exito");
      this.globalService.incUpdateAppointment(true);
      this.dismissModal();
    
    } catch (error) {
      await this.globalService.closeLoading();
      if (error.status == 430) {
        this.globalService.errorToast(
          "No hay citas disponibles en ese horario"
        );
        /*  this.closeModal(); */
      }
    }
  }

  async onReSchedule(form: FormGroup) {
    const arrayDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    if (form.valid) {
      const formValue = form.value;
      const momentDate = moment(formValue.date);
      const userWorkspace = this.user_workspaces.find(
        (res) => res.id == formValue.user_workspace_id
      );
      if (
        arrayDays[momentDate.day() - 1] == userWorkspace.day &&
        momentDate.format("HH:mm") >= userWorkspace.start_time &&
        momentDate.format("HH:mm") <= userWorkspace.end_time
      ) {
        formValue.date = momentDate.format("YYYY-MM-DD HH:mm:ss");
       this.updateAppointment(formValue);
      } else {
        this.globalService.errorToast(
          "Las fechas introducidas no coinciden con las de la ubicación"
        );
      }

    }
  }

  async ngOnInit() {
    
    const user = await UserStorage.getUser();
    await this.loadWorkspace(this.medical_staff_id);
    this.appointmentForm = this.formBuilder.group({
      medical_staff_id: [this.medical_staff_id, Validators.required],
      user_workspace_id: [this.user_workspace_id, Validators.required],
      patient_id: [user.id, Validators.required],
      date: ["", Validators.required],
      condition: ["Cita agendada (Reprogramada)", null],
    });
  }
}

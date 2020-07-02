import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GlobalService } from "src/app/services/global.service";
import { AlertController, NavController } from "@ionic/angular";
import { UserService } from "src/app/services/UserService.service";
import { SpecialtyService } from "src/app/services/SpecialtyService.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserStorage } from "src/app/services/storage/UserStorage.service";
import * as moment from "moment";
import { AppointmentService } from "src/app/services/AppointmentService.service";
@Component({
  selector: "app-create-appointment",
  templateUrl: "./create-appointment.page.html",
  styleUrls: ["./create-appointment.page.scss"],
})
export class CreateAppointmentPage implements OnInit {
  id: any;
  minDate: string = new Date().toISOString();
  public appointmentForm: FormGroup;
  public monthNames: any;
  public monthShortNames: any;
  public doctors = [];
  public user_workspaces = [];
  public specialty: any = null;
  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private alertController: AlertController,
    private userService: UserService,
    private specialtyService: SpecialtyService,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
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
      await this.globalService.presentLoading();
      await this.loadSpecialty(this.id);
      await this.loadDoctors(this.id);
      await this.globalService.closeLoading();
    });
    this.appointmentForm = this.formBuilder.group({
      medical_staff_id: ["", Validators.required],
      user_workspace_id: ["", Validators.required],
      patient_id: [user.id, Validators.required],
      date: ["", Validators.required],
      condition: ["Cita agendada", null],
    });
  }
  async loadSpecialty(specialty_id: any) {
    try {
      const specialty: any = await this.specialtyService.show(specialty_id);
      this.specialty = specialty.data;
      
    } catch (error) {
      
    }
  }
  async onChangeDoctor($event) {
    
    this.appointmentForm.controls["user_workspace_id"].setValue(null);
    this.loadWorkspace($event.target.value);
  }
  getDayStr(day) {
    return this.globalService.getDayStr(day);
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
  async onSave(form: FormGroup) {
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
      /*
      */
      console.log(
        ">= ",
        momentDate.format("HH:mm") >= userWorkspace.start_time
      );
      if (
        arrayDays[momentDate.day() - 1] == userWorkspace.day &&
        momentDate.format("HH:mm") >= userWorkspace.start_time &&
        momentDate.format("HH:mm") <= userWorkspace.end_time
      ) {
       formValue.date = momentDate.format("YYYY-MM-DD HH:mm:ss") 
        this.storeAppointment(formValue);
      } else {
        this.globalService.errorToast(
          "Las fechas introducidas no coinciden con las de la ubicación"
        );
      }
      
      if (formValue) {
        
      }
    }
  }

  async storeAppointment(appointmentData: any) {
    try {
      await this.globalService.presentLoading();
      const appointment: any = await this.appointmentService.store(
        appointmentData
      );
      await this.globalService.closeLoading();
        await this.globalService.saveToast("La cita se creo con exito");
        this.globalService.incUpdateAppointment(true);
        this.navController.navigateRoot("/app/tabs/appointments")
      /*  GlobalService.CloseSweet(); */
    } catch (error) {
      await this.globalService.closeLoading();
        if (error.status == 430){
          this.globalService.errorToast(
            "No hay citas disponibles en ese horario"
          );
       /*  this.closeModal(); */
      }
    }
  }
  async loadDoctors(specialty_id: any) {
    try {
      const doctors: any = await this.userService.index_doctors_specialty(
        specialty_id
      );
      this.doctors = doctors.data;
      
    } catch (error) {
      
    }
  }
}

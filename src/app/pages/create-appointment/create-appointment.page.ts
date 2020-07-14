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
import { getHours } from "date-fns";
import { CalendarEvent, CalendarView, DAYS_OF_WEEK, CalendarMonthViewDay } from "angular-calendar";

import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es"; // to register french

registerLocaleData(localeEs);

@Component({
  selector: "app-create-appointment",
  templateUrl: "./create-appointment.page.html",
  styleUrls: ["./create-appointment.page.scss"],
})


export class CreateAppointmentPage implements OnInit {
  view: CalendarView = CalendarView.Week;
  events: CalendarEvent[] = [];
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  CalendarView = CalendarView;
  setView(view: CalendarView) {
    this.view = view;
  }

  viewDate = new Date();
  showMarker = true;
  locale: string = "es";
  excludeDays: number[] = [0, 6];
  // just for the purposes of the demo so it all fits in one screen
  dayStartHour = Math.max(0, getHours(new Date()) - 2);
  dayEndHour = Math.min(23, getHours(new Date()) + 2);
  id: any;
  minDate = new Date();

  
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
    private navController: NavController
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
    } catch (error) {}
  }
  async onChangeDoctor($event) {
    this.appointmentForm.controls["user_workspace_id"].setValue(null);
    this.loadWorkspace($event.target.value);
  }
  timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }

  addEvent(time): void {
    const colors: any = {
      red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
      },
      yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
      },
      green: {
        primary: 'green',
        secondary: 'green',
      }
    };

    this.events = [
      {
        title: 'Cita medica',
        start: time,
        end: time,
        color: colors.green,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }


  dateIsValid(date: Date): boolean {
    return date >= this.minDate;
  }
  
/*   beforeWeekViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  } */

  beforeWeekViewRender({ header }: { header: any[] }): void {
    header.forEach(day => {
      console.log('day', day)
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
 });
}

  hourSegmentClicked($event : any){
    console.log('date', $event.date);
    this.appointmentForm.controls["date"].setValue($event.date);
    this.addEvent($event.date);
  }
  onChangeLocation($event) {
    console.log("event", $event.target.value);
    const user_workspace = this.user_workspaces.find(
      (res) => res.id == $event.target.value
    );
    console.log("user_workspace", user_workspace);

    this.dayStartHour = this.timeStringToFloat(user_workspace.start_time);
    console.log("this.dayStartHour: ", this.dayStartHour);
    this.dayEndHour = this.timeStringToFloat(user_workspace.end_time);
    console.log("this.dayEndHour: ", this.dayEndHour);
    let excludeDays = [0, 1, 2, 3, 4, 5, 6];
   
    const arrayDays = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 0,
    };
    delete excludeDays[arrayDays[user_workspace.day]];
    this.excludeDays = excludeDays;
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
        formValue.date = momentDate.format("YYYY-MM-DD HH:mm:ss");
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
      this.navController.navigateRoot("/app/tabs/appointments");
      /*  GlobalService.CloseSweet(); */
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
  async loadDoctors(specialty_id: any) {
    try {
      const doctors: any = await this.userService.index_doctors_specialty(
        specialty_id
      );
      this.doctors = doctors.data;
    } catch (error) {}
  }
}

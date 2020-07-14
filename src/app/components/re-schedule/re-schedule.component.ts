import { Component, OnInit, Input } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { GlobalService } from "src/app/services/global.service";
import { AppointmentService } from "src/app/services/AppointmentService.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import * as moment from "moment";
import { UserService } from "src/app/services/UserService.service";
import { UserStorage } from 'src/app/services/storage/UserStorage.service';


import { CalendarView, CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { getHours } from 'date-fns';

@Component({
  selector: "app-re-schedule",
  templateUrl: "./re-schedule.component.html",
  styleUrls: ["./re-schedule.component.scss"],
})
export class ReScheduleComponent implements OnInit {


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
  minDate = new Date();
  @Input() id: any;
  @Input() medical_staff_id : any;
  @Input() user_workspace_id :any;
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


  beforeWeekViewRender({ header }: { header: any[] }): void {
    header.forEach(day => {
      console.log('day', day)
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
 });
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
  
  dateIsValid(date: Date): boolean {
    return date >= this.minDate;
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
    const event = { target: { value : this.user_workspace_id} };
    this.onChangeLocation(event)
  }
}

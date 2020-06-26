import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-events',
  templateUrl: './filter-events.component.html',
  styleUrls: ['./filter-events.component.scss'],
})
export class FilterEventsComponent implements OnInit {
  public event_types= [];
  constructor(private modalController: ModalController) { 

    this.event_types.push(
      {
        label: "Actividad fisica",
        value: "Actividad fisica",
        color: "primary"
      },
      {
        label: "Apoyo psicologico",
        value: "Apoyo psicologico",
        color: "secondary"
      },
      {
        label: "Integración comunitaria y familiar",
        value: "Integración comunitaria y familiar",
        color: "tertiary"
      },
      {
        label: "Conferencias",
        value: "Conferencias",
        color: "success"
      },
      {
        label: "Recreación",
        value: "Recreación",
        color: "warning"
      })
  }

  
  dismissModal(type = null){
    this.modalController.dismiss({
      'type': type
    });
  }
  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent implements OnInit {
  @Input() text: string = "No posees ninguna información sobre citas"
  constructor() { }

  ngOnInit() {}

}
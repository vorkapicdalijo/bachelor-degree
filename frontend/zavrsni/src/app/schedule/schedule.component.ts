import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-schedule',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './schedule.component.html',
  //template: `<ejs-schedule [eventSettings]='eventSettings'></ejs-schedule>`,
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  //public selectedDate: Date = new Date(2022, 4, 14);
  public eventSettings: EventSettingsModel = {
    dataSource: [
    {
        Id: 1,
        Subject: 'Explosion of Betelgeuse Star',
        StartTime: new Date(2022, 4, 15, 9, 30),
        EndTime: new Date(2022, 4, 15, 11, 0)
    }, {
        Id: 2,
        Subject: 'Thule Air Crash Report',
        StartTime: new Date(2022, 4, 14, 12, 0),
        EndTime: new Date(2022, 4, 14, 14, 0)
    }, {
        Id: 3,
        Subject: 'Blue Moon Eclipse',
        tartTime: new Date(2022, 4, 14, 15, 0),
        EndTime: new Date(2022, 4, 14, 18, 0)
    }, {
        Id: 4,
        Subject: 'Meteor Showers in 2018',
        tartTime: new Date(2022, 4, 16, 12, 0),
        EndTime: new Date(2022, 4, 17, 14, 0)
    }]
};

  constructor(private titleService: Title) {
    this.titleService.setTitle("Schedule");
   }

  ngOnInit(): void {
  }

}

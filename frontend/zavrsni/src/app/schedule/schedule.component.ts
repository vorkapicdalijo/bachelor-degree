import { Component, OnInit } from '@angular/core';
import { ActionEventArgs, AgendaService, DayService, DragEventArgs, EventSettingsModel, GroupModel, MonthService, PopupCloseEventArgs, PopupOpenEventArgs, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-schedule',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public chosenGroups: any[]

  public isResize: boolean = false;
  public isDrag: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  private dataManager: DataManager = new DataManager({
    url: 'http://localhost:8080/sch',
    crudUrl: 'http://localhost:8080/sch/xd',
    adaptor: new UrlAdaptor,
    crossDomain: true
 });

 public eventSettings: EventSettingsModel = { dataSource: this.dataManager };

 onDragStop(args: any) {
   this.isDrag = true;
 }
 onResizeStop(args: any) {
   this.isResize = true;
 }

 onActionBegin(args: any): void {
  if (this.isDrag && args.requestType === "eventChanged") {
    console.log("actionBegin is triggered for Drag event");
    this.isDrag = false;
  }
  if (this.isResize && args.requestType === "eventChanged") {
    console.log("actionBegin is triggered for Resize event")
    this.isResize = false;
    }
  }
  onPopupOpen(args: any): void {
    if (args.type === 'Editor')  {
        
    }
  }

}

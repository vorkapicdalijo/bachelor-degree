import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeEventArgs, DropDownList, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ActionEventArgs, AgendaService, DayService, DragEventArgs, EventSettingsModel, GroupModel, MonthService, PopupCloseEventArgs, PopupOpenEventArgs, WeekService, WorkWeek, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { AppService } from '../services/app.service';


@Component({
  selector: 'app-schedule',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit {

  public isResize: boolean = false;
  public isDrag: boolean = false;

  @ViewChild('dropdown')
  public dropdownObject: DropDownListComponent;

  user = JSON.parse(localStorage.getItem('user') || '{}')
  obj : Object[] = [{
    Authorization:'Bearer '+this.user.access_token
  }]

  workouts: any[] = [];
  workoutNames: string[] = [];
  form: FormGroup;
  objarr: Object[] = []

  public fields: Object = {text:'name', value:'id'}
  showWorkoutInfo = false;

  constructor(private appService: AppService) { 
    this.form = new FormGroup({
      subject: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.workoutNames = [];

    this.appService.getWorkoutsByUserId();

    this.appService.loadedUserWorkoutsSub.subscribe(workouts => {
      this.workouts = workouts;

      this.workouts.forEach(workout => {
        this.workoutNames.push(workout.name);

        this.objarr.push({id: workout.name, name: workout.name});
      })
      console.log(this.objarr);
      

    })
  }

  private dataManager: DataManager = new DataManager({
    url: 'http://localhost:8080/sch',
    crudUrl: 'http://localhost:8080/sch/xd',
    adaptor: new UrlAdaptor,
    crossDomain: true,
    headers: this.obj
 });

 public eventSettings: EventSettingsModel = { dataSource: this.dataManager };

 onDragStop(args: any) {
   this.isDrag = true;
 }
 onResizeStop(args: any) {
   this.isResize = true;
 }

 onEventRendered(args: any): void {
  switch (args.data.EventType) {
    case 'Requested':
      (args.element as HTMLElement).style.backgroundColor = '#F57F17';
      break;
    case 'Confirmed':
      (args.element as HTMLElement).style.backgroundColor = '#7fa900';
      break;
    case 'New':
      (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
      break;
  }
}

 onActionBegin(args: any): void {
  if (this.isDrag && args.requestType === "eventChanged") {
    this.isDrag = false;
  }
  if (this.isResize && args.requestType === "eventChanged") {
    this.isResize = false;
    }

    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      let data: any;
      if (args.requestType === 'eventCreate') {
        data = <any>args.data[0];
      } else if (args.requestType === 'eventChange') {
        data = <any>args.data;
      }
    }

  }
  onPopupOpen(args: any): void {
    if (args.type === 'Editor')  {
      
    }
  }

  getObject(args: any) {
    var fieldObject = this.dropdownObject.getDataByValue(this.form.controls.subject.value);
    console.log(fieldObject)
    
    if (fieldObject) {
      this.showWorkoutInfo = true;
    }
    else
      this.showWorkoutInfo = false;
  }

  onChange(e: ChangeEventArgs) {
    if (e.value) {
      this.showWorkoutInfo = true;
    }
    else 
      this.showWorkoutInfo = false;
  }

  public dateParser(data: string) {
    return new Date(data);
  }

}

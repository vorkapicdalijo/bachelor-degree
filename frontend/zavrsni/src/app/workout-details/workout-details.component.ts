import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Workout } from '../models/workout';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {

  displayedColumns: string[] = ['workout_id', 'name', 'duration', 'complexity'];
  //dataSource = ELEMENT_DATA;
  dataSource:any = [];
  $sub: Subscription;

  workoutToBeAdded: Workout;

  constructor(private titleService: Title, private appService: AppService, public dialog: MatDialog,) {
    this.titleService.setTitle("Workouts");
   }

  ngOnInit(): void {
    this.appService.getWorkouts();

    this.$sub = this.appService.loadedWorkoutsSub.subscribe(workouts => {
      this.dataSource = workouts;
    })
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(WorkoutAddDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: {
             name: this.workoutToBeAdded.name,
             duration: this.workoutToBeAdded.duration,
             complexity: this.workoutToBeAdded.complexity,
             user_id: this.workoutToBeAdded.user_id},
    });
  }

}

@Component({
  selector: 'app-workout-add-dialog',
  templateUrl: './dialogs/workout-add-dialog.component.html',
  styleUrls: ['./dialogs/workout-add-dialog.component.css']
})
export class WorkoutAddDialog {

  constructor(
    public dialogRef: MatDialogRef<WorkoutAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Workout,
  ) {}
}

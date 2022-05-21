import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Exercise } from '../models/exercise';
import { Workout } from '../models/workout';
import { AppService } from '../services/app.service';


export interface ExerciseW {
  name: string;
  weight: number;
  sets: number;
  reps: number;
}
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

  workoutToBeAdded: Workout

  name: string;
  duration: number;
  complexity: string;
  user_id: number

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
      width: '800px',
      height: '900px',
      position: {top:'50px'},
      disableClose: true,
      data: {
             name: this.name,
             duration: this.duration,
             complexity: this.complexity,
             user_id: this.user_id},
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

}

@Component({
  selector: 'app-workout-add-dialog',
  templateUrl: './dialogs/workout-add-dialog.component.html',
  styleUrls: ['./dialogs/workout-add-dialog.component.css']
})
export class WorkoutAddDialog {

  exercisesLoaded: Exercise[] = []

  exercise: ExerciseW;

  namesTest = ['ivek', 'bivek', 'girek'];

  constructor(
    public dialogRef: MatDialogRef<WorkoutAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Workout,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

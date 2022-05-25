import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exercise } from '../models/exercise';
import { Workout } from '../models/workout';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';


export interface ExerciseWorkout {
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

  workoutToBeAdded: any;

  name: string;
  duration: number;
  complexity: string;
  user_id: number;

  exercises: any

  isLoading = false;

  constructor(private titleService: Title, private appService: AppService, private authService: AuthService, private router: Router, public dialog: MatDialog) {
    this.titleService.setTitle("Workouts");
   }

  ngOnInit(): void {
    this.isLoading = true;
    this.appService.getWorkouts();

    this.$sub = this.appService.loadedWorkoutsSub.subscribe(workouts => {
      this.dataSource = workouts;
      this.isLoading = false;
    })
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(WorkoutAddDialog, {
      panelClass: 'custom-dialog-container',
      width: '800px',
      //height: '900px',
      position: {top:'50px'},
      disableClose: true,
      data: {
        name: this.name,
        complexity: this.complexity,
        duration: this.duration,
        exercises: this.exercises
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;

      if(result) {
        this.workoutToBeAdded = result;
        let user = this.authService.getUserFromLocalStorage();
        this.workoutToBeAdded.user_id = user.user_id;
        this.workoutToBeAdded.exercises=JSON.stringify(this.workoutToBeAdded.exercises);
        this.appService.insertWorkout(this.workoutToBeAdded).subscribe(res => {
          this.isLoading = false;

          this.router.navigateByUrl('/', {skipLocationChange: true}).then(
            () => {
              this.router.navigate(['/workouts']);
            })
        })
      }
    })
  }

}

@Component({
  selector: 'app-workout-add-dialog',
  templateUrl: './dialogs/workout-add-dialog.component.html',
  styleUrls: ['./dialogs/workout-add-dialog.component.css']
})
export class WorkoutAddDialog implements OnInit {

  $sub: Subscription;
  exercisesLoaded: Exercise[] = []

  dataSource: MatTableDataSource<ExerciseWorkout>
  displayedColumns = ["position", "name", "weight", "sets", "reps", "action"];

  hasExercises = false;

  // exercise: ExerciseWorkout = {
  //   weight: 0,
  //   sets: 0,
  //   reps: 0,
  //   name: ''
  exercise: any  = {}
    


  exercise_list: ExerciseWorkout[] = []

  namesTest = ['ivek', 'bivek', 'girek'];


  constructor(
    public dialogRef: MatDialogRef<WorkoutAddDialog>,
    private appService: AppService,
    private changeDetectorRefs: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: Workout,
  ) {}

  ngOnInit(): void {
    this.appService.getExercises();

    this.$sub = this.appService.loadedExercisesSub.subscribe(exercises => {
      this.exercisesLoaded = exercises;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(exerciseForm: NgForm){
    this.exercise = {}

    this.exercise.weight = (exerciseForm.controls['weight'].value)

    if (this.exercise.weight == '') {
      this.exercise.weight = "Bodyweight"
    }
    this.exercise.sets = exerciseForm.controls['sets'].value
    this.exercise.reps = exerciseForm.controls['reps'].value
    this.exercise.exercise_loaded = exerciseForm.controls['exercise'].value

    exerciseForm.resetForm();
 
    this.exercise_list.push(this.exercise);

    this.data.exercises = this.exercise_list;

    this.dataSource = new MatTableDataSource(this.exercise_list);
    this.changeDetectorRefs.detectChanges();
    this.hasExercises = true

  }

  getNo(element: any) {
    return this.exercise_list.lastIndexOf(element)+1
  }
}

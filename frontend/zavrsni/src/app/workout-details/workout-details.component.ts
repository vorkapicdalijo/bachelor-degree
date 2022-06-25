import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exercise } from '../models/exercise';
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
  styleUrls: ['./workout-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WorkoutDetailsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['workout_id', 'name', 'duration', 'complexity'];

  displayedColumnsEx = ["name", "sets", "reps", "weight"];
  //dataSource = ELEMENT_DATA;
  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;

  workouts: any[];
  $sub: Subscription;
  $sub1: Subscription;
  $sub2: Subscription;

  workoutToBeAdded: any;

  workoutsExist: boolean = true;

  name: string;
  duration: number;
  complexity: string;
  user_id: number;

  exercises: any

  isLoading = false;

  workoutNames: any[] = []
  workoutNamesObj: any[] = []

  constructor(private titleService: Title, private appService: AppService, private authService: AuthService, private router: Router, public dialog: MatDialog) {
    this.titleService.setTitle("Workouts");
   }

  ngOnInit(): void {
    this.isLoading = true;
    this.appService.getWorkoutsByUserId();

    this.$sub = this.appService.loadedUserWorkoutsSub.subscribe(workouts => {
      this.workouts = workouts;
      if (this.workouts.length == 0) {
        this.workoutsExist = false;
      }

      
    this.workouts.forEach(workout => {
      if(typeof workout.exercises == "string") {
          workout.exercises = JSON.parse(workout.exercises)
      }
      })

    this.isLoading = false;

    this.dataSource = new MatTableDataSource(this.workouts);
   
  })    
  }
  ngOnDestroy(): void {
    this.$sub.unsubscribe();
  }

  openDeleteDialog(id:number, name:string) {
    const dialogRef = this.dialog.open(WorkoutDeleteDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: {name: name,
             id: id,
            },
      position: {top: '60px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(
        () => {
          this.router.navigate(['/workouts']);
        }
      )
    })
  }

  applyFilter(filterValue: any) {

    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }

  getNo(element: any, exercises:any[]) {
    return exercises.lastIndexOf(element)+1
  }

  openAddDialog() {
    this.workoutNames = []
    this.workoutNamesObj = []

    this.workoutNamesObj = this.workouts.map(({user_id, duration, complexity,workout_id,exercises, ...rest}) => {
      return rest
    })
    

    this.workoutNamesObj.forEach(obj => {this.workoutNames.push(obj.name.toLowerCase())})

    const dialogRef = this.dialog.open(WorkoutAddDialog, {
      panelClass: 'custom-dialog-container',
      width: '600px',
      //height: '900px',
      position: {top:'50px'},
      disableClose: true,
      data: {
        name: this.name,
        complexity: this.complexity,
        duration: this.duration,
        exercises: this.exercises,
        workoutNames: this.workoutNames
      },
    });

    this.$sub1 = dialogRef.afterClosed().subscribe(result => {
      

      if(result) {
        this.isLoading = true;
        this.workoutsExist = true;
        this.workoutToBeAdded = result;
        let user = this.authService.getUserFromLocalStorage();
        this.workoutToBeAdded.user_id = user.user_id;
        this.workoutToBeAdded.exercises=JSON.stringify(this.workoutToBeAdded.exercises);
        this.$sub2 = this.appService.insertWorkout(this.workoutToBeAdded).subscribe(res => {
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
export class WorkoutAddDialog implements OnInit, OnDestroy {

  $sub: Subscription;
  exercisesLoaded: Exercise[] = []

  dataSource: MatTableDataSource<ExerciseWorkout>
  displayedColumns = ["position", "name", "weight", "sets", "reps", "action"];

  hasExercises = false;

  exercise: any  = {}

  exercise_list: ExerciseWorkout[] = []

  bodyElement: HTMLElement = document.body;

  editEx = false;

  constructor(
    public dialogRef: MatDialogRef<WorkoutAddDialog>,
    private appService: AppService,
    private changeDetectorRefs: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    

    this.appService.getAdminExercises();
    this.$sub = this.appService.loadedAdminExercisesSub.subscribe(exercises => {
      this.exercisesLoaded = exercises;

      this.appService.getUserExercises();
    })

    this.appService.getUserExercises();

    this.$sub = this.appService.loadedExercisesSub.subscribe(exercises => {
      this.exercisesLoaded = this.exercisesLoaded.concat(exercises);
    });
  }

  ngOnDestroy(): void {
    this.$sub.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(exerciseForm: NgForm){
    this.exercise = {}

    this.exercise.weight = (exerciseForm.controls['weight'].value)
    if (exerciseForm.controls['weight'].value == '' || exerciseForm.controls['weight'].value == null) {
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

  deleteExercise(exercise:any, n: number) {
    this.exercise_list.splice(n-1, 1);
    this.dataSource = new MatTableDataSource(this.exercise_list);
    if(this.exercise_list.length == 0) {
      this.hasExercises = false;
    }
    else {
      this.hasExercises = true;
    }

  }

  editedExerciseSubmit() {

  }

  getNo(element: any) {
    return this.exercise_list.lastIndexOf(element)+1
  }

  dragStart(event: CdkDragStart) {
    this.bodyElement.classList.add('inheritCursors');
    this.bodyElement.style.cursor = 'grabbing';
  }

  drop(event: CdkDragDrop<ExerciseWorkout[]>) {
    this.bodyElement.classList.remove('inheritCursors');
    this.bodyElement.style.cursor = 'unset';

    const previousIndex = this.exercise_list.findIndex((row) => row === event.item.data);
    moveItemInArray(this.exercise_list, previousIndex, event.currentIndex);
    this.dataSource.data = this.dataSource.data;
  }


}

@Component({
  selector: 'app-workout-delete-dialog',
  templateUrl: './dialogs/workout-delete-dialog.component.html'
})
export class WorkoutDeleteDialog implements OnDestroy {
  $sub: Subscription;
  isLoading : boolean = false;

  constructor(private appService: AppService,
              private router: Router,
    public dialogRef: MatDialogRef<WorkoutDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id:number,name:string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.$sub.unsubscribe();
  }

  deleteWorkout(id:number) {
    this.isLoading = true;
    this.$sub = this.appService.deleteWorkout(id).subscribe(res => {
        this.isLoading = false;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(
          () => {
            this.router.navigate(['/workouts']);
        })
      
    });
    this.dialogRef.close();
  }
}

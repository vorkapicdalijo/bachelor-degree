import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Inject, ViewChild, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exercise } from '../models/exercise';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';

// export interface Exercise {
//   name: string;
//   id: number;
//   imageUrl: string;
//   description: string;
// }

export interface AddDialogData {
  name: string;
  imageurl: string;
  description: string;
  exerciseNames: string[];
}




@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit, OnDestroy {
  $sub: Subscription;

  error: boolean = false;

  isLoading : boolean = false;

  showMore: boolean = false;
  exercise_id: number;
  name: string;
  imageurl: string;
  description: string;

  passedValues: any;
  updatedValues: Exercise;

  exercises: Exercise[];

  exerciseNamesObj: any[] = []
  exerciseNames: any[] = []
  dataSource: MatTableDataSource<Exercise>;


  constructor(private router: Router,private appService: AppService, public dialog: MatDialog, private titleService:Title, private authService: AuthService) {
      this.titleService.setTitle("Exercises");
   }



  ngOnInit(): void {
    this.isLoading = true;
    this.appService.getExercises()
    
    this.$sub = this.appService.loadedExercisesSub.subscribe(exercises => {
      this.exercises = exercises;

      this.dataSource = new MatTableDataSource(this.exercises)
      this.isLoading = false;
    })

    // this.$sub = this.appService.loadedExercisesSub.subscribe(exercises => {
    //   console.log(exercises);
    //   this.exercises = exercises;
    // })
  }
  ngOnDestroy(): void {
    this.$sub.unsubscribe();
  }

  applyFilter(filterValue: any) {

    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }

  openDialog() {
    this.exerciseNames = []
    this.exerciseNamesObj = []

    this.exerciseNamesObj = this.exercises.map(({user_id, description, imageurl,exercise_id, ...rest}) => {
      return rest
    })
    

    this.exerciseNamesObj.forEach(obj => {this.exerciseNames.push(obj.name.toLowerCase())})
      


    const dialogRef = this.dialog.open(ExerciseAddDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: {
             name: this.name,
             imageurl: this.imageurl,
             description: this.description,
             exerciseNames: this.exerciseNames},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.passedValues = result;
      if(this.passedValues) {
        const userData = this.authService.getUserFromLocalStorage();
        this.passedValues.user_id = userData.user_id;
        delete this.passedValues.exerciseNames

        let newExercise: Exercise = this.passedValues
        this.isLoading = true;

        this.appService.insertExercise(newExercise)
          .subscribe(res => {
            this.isLoading = false;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(
              () => {
                this.router.navigate(['/exercises']);
              }
            )
          },
          err => {
            this.error = true;
          }
          );
      }
    });
  }

  openDeleteDialog(exercise_id:number, name:string) {
    const dialogRef = this.dialog.open(ExerciseDeleteDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: {name: name,
             exercise_id: exercise_id,
            },
      position: {top: '60px'}
    });
  }

  openUpdateDialog(exercise: Exercise) {
    this.exerciseNamesObj = []
    this.exerciseNames = []

    this.exerciseNamesObj = this.exercises.map(({user_id, description, imageurl,exercise_id, ...rest}) => {
      return rest
    })

    this.exerciseNamesObj.forEach(obj => {this.exerciseNames.push(obj.name.toLowerCase())})

    var exerciseCopy: Exercise = exercise;
    const dialogRef = this.dialog.open(ExerciseUpdateDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: {exercise: exerciseCopy,
             exerciseNames: this.exerciseNames},
      position: {top: '60px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.isLoading = true;
        this.updatedValues = result;
        this.updatedValues.exercise_id = exercise.exercise_id;
        
        this.appService.updateExercise(this.updatedValues.exercise_id, this.updatedValues).subscribe(res => {
          this.isLoading = false;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(
            () => {
              this.router.navigate(['/exercises']);
            }
          )
        })
      }
    });
  }
}

@Component({
  selector: 'app-exercise-add-dialog',
  templateUrl: './dialogs/exercise-add-dialog.component.html',
  styleUrls: ['./dialogs/exercise-add-dialog.component.css']
})
export class ExerciseAddDialog {

  error = false;
  constructor(
    public dialogRef: MatDialogRef<ExerciseAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  invalidImage(url:string) {
    return !(/\.(jpg|jpeg|png|webp|avif|gif|svg).*$/.test(url));
  }

}

//////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-exercise-delete-dialog',
  templateUrl: './dialogs/exercise-delete-dialog.component.html',
  styleUrls: ['./dialogs/exercise-delete-dialog.component.css']
})
export class ExerciseDeleteDialog {
  
  isLoading : boolean = false;

  constructor(private appService: AppService,
              private router: Router,
    public dialogRef: MatDialogRef<ExerciseDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {exercise_id:number,name:string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteExercise(id:number) {
    this.isLoading = true;
    this.appService.deleteExercise(id).subscribe(res => {
        this.isLoading = false;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(
          () => {
            this.router.navigate(['/exercises']);
        })
      
    });
    this.dialogRef.close();
  }
}
  //////////////////////////////////////////////////////////
  @Component({
    selector: 'app-exercise-update-dialog',
    templateUrl: './dialogs/exercise-update-dialog.component.html',
    styleUrls: ['./dialogs/exercise-update-dialog.component.css']
  })
  export class ExerciseUpdateDialog implements OnInit {
    

    constructor(private appService: AppService,
                private router: Router,
      public dialogRef: MatDialogRef<ExerciseUpdateDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
    
    oldData: Exercise;
    newData: any;

    ngOnInit(): void {
      this.oldData = this.data.exercise;
      this.newData = {
        name: this.oldData.name,
        imageurl: this.oldData.imageurl,
        description: this.oldData.description,
      }
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    updateExercise(id:number) {
      //this.appService.updateExercise(id);

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(
        () => {
          this.router.navigate(['/exercises']);
        }
      )
      this.dialogRef.close();
    }

    invalidImage(url:string) {
      return !(/\.(jpg|jpeg|png|webp|avif|gif|svg).*$/.test(url));
    }
}

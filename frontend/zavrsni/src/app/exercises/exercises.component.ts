import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Inject, ViewChild, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exercise } from '../models/exercise';
import { AppService } from '../services/app.service';

// export interface Exercise {
//   name: string;
//   id: number;
//   imageUrl: string;
//   description: string;
// }

export interface AddDialogData {
  name: string;
  imageUrl: string;
  description: string;
}




@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit, OnDestroy {
  $sub: Subscription;


  showMore: boolean = false;
  exercise_id: number;
  name: string;
  imageUrl: string;
  description: string;

  passedValues: Exercise;
  updatedValues: Exercise;

  exercises: Exercise[];

  constructor(private router: Router,private appService: AppService, public dialog: MatDialog, private titleService:Title) {
      this.titleService.setTitle("Exercises");
   }


  ngOnInit(): void {
    this.appService.getExercises();

    this.$sub = this.appService.loadedExercisesSub.subscribe(exercises => {
      console.log(exercises);
      this.exercises = exercises;
    })
  }
  ngOnDestroy(): void {
    this.$sub.unsubscribe();
  }


  openDialog() {
    const dialogRef = this.dialog.open(ExerciseAddDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: {
             name: this.name,
             imageUrl: this.imageUrl,
             description: this.description},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.passedValues = result;

      this.appService.insertExercise(this.passedValues);

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(
        () => {
          this.router.navigate(['/exercises']);
        }
      )
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
    var exerciseCopy: Exercise = exercise;
    const dialogRef = this.dialog.open(ExerciseUpdateDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: exerciseCopy,
      position: {top: '60px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
      this.updatedValues = result;
      this.updatedValues.exercise_id = exercise.exercise_id;
      
      this.appService.updateExercise(this.updatedValues.exercise_id, this.updatedValues);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(
        () => {
          this.router.navigate(['/exercises']);
        }
      )
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
  
  constructor(private appService: AppService,
              private router: Router,
    public dialogRef: MatDialogRef<ExerciseDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {exercise_id:number,name:string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteExercise(id:number) {
    console.log(id);
    this.appService.deleteExercise(id);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(
      () => {
        this.router.navigate(['/exercises']);
      }
    )
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
      @Inject(MAT_DIALOG_DATA) public data: Exercise,
    ) {}
    
    oldData: Exercise;
    newData: any;

    ngOnInit(): void {
      this.oldData = this.data;
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

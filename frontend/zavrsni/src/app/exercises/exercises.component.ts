import { Component, OnInit, Inject, ViewChild, OnDestroy, Pipe, ElementRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exercise } from '../models/exercise';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';


export interface AddDialogData {
  name: string;
  imageurl: string;
  description: string;
  exerciseNames: string[];
}

export interface ExerciseProgress {
  name:string;
  weight:string;
  sets:number;
  reps:number;
  date:string;
  user_id:number;
}


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit, OnDestroy {
  $sub: Subscription;
  $sub1: Subscription;
  $sub2: Subscription;
  $sub3: Subscription;
  $sub4: Subscription;
  $sub5: Subscription;
  $sub6: Subscription;
  $sub7: Subscription;
  $sub8: Subscription;
  $sub9: Subscription;

  error: boolean = false;

  isLoading : boolean = false;

  exercisesOption: string = ""
  filter:string = ""

  showUserExercises:boolean = true;

  showMore: boolean = false;
  exercise_id: number;
  name: string;
  imageurl: string;
  description: string;

  passedValues: any;
  updatedValues: Exercise;

  exercises: Exercise[];
  loggedUser:any;
  isAdmin:boolean = false;
  userExerciseCount: number = 0;

  checkExercises: Exercise[] = [];
  exerciseNamesObj: any[] = []
  exerciseNames: any[] = []
  dataSourceUser: MatTableDataSource<Exercise>;
  dataSourceAdmin: MatTableDataSource<Exercise>;

  progression: ExerciseProgress = {
    name:'',
    date:'',
    weight:'',
    sets:0,
    reps:0,
    user_id:0
  }

  storedProgresses: ExerciseProgress[] = []

  constructor(private router: Router,private appService: AppService, public dialog: MatDialog, private titleService:Title, private authService: AuthService,
      private sanitizer: DomSanitizer) {
      this.titleService.setTitle("Exercises");
   }



  ngOnInit(): void {
    this.isLoading = true;

    this.loggedUser = this.authService.getUserFromLocalStorage();
    if(this.loggedUser.role == "ROLE_ADMIN")
      this.isAdmin = true;

    this.appService.getAdminExercises()

    
    this.$sub = this.appService.loadedAdminExercisesSub.subscribe(exercises => {
      this.exercises = exercises
      this.dataSourceAdmin = new MatTableDataSource(this.exercises.reverse())

      this.appService.getUserExercises();

    })

    this.appService.getUserExercises();

    this.$sub = this.appService.loadedExercisesSub.subscribe(exercises => {
      this.exercises = this.exercises.concat(exercises)
      this.dataSourceUser = new MatTableDataSource(exercises.reverse());
      this.userExerciseCount = exercises.length;
      this.isLoading = false;
    })

    this.$sub1 =  this.appService.getProgresses().subscribe(res => {
      this.storedProgresses = res;
    })

  }
  ngOnDestroy(): void {
    this.$sub.unsubscribe();
    this.$sub1.unsubscribe();
    //this.$sub3.unsubscribe();
    //this.$sub2.unsubscribe();
    //this.$sub4.unsubscribe();
    //this.$sub5.unsubscribe();
    //this.$sub6.unsubscribe();
    //this.$sub7.unsubscribe();
    //this.$sub8.unsubscribe();
    //this.$sub9.unsubscribe();
  }


  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

  exercisesChange(event: MatRadioChange) {
    if(event.value=="user") {
      this.showUserExercises = true;
    }
    else {
      this.showUserExercises = false;
    }

    this.filter = ""
    this.dataSourceAdmin.filter = ""
    this.dataSourceUser.filter = ""
  }

  applyFilter(filterValue: any) {
    if(!this.showUserExercises)
      this.dataSourceAdmin.filter = filterValue.target.value.trim().toLowerCase();
    else
      this.dataSourceUser.filter = filterValue.target.value.trim().toLowerCase();
  }

  openProgressDialog() {
    this.exerciseNames = []
    this.exerciseNamesObj = []
    this.exerciseNamesObj = this.exercises.map(({user_id, description, imageurl,exercise_id, ...rest}) => {
      return rest
    })
    this.exerciseNamesObj.forEach(obj => {this.exerciseNames.push(obj.name)})
 
    const dialogRef = this.dialog.open(ProgressDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: {
        exercises: this.exerciseNames,
        storedProgresses: this.storedProgresses
      }
    });
    this.$sub3 = dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.progression.name = result.selected;
        this.progression.sets = result.sets;
        this.progression.reps = result.reps;

        if (result.weight == null || result.weight == 0)
          this.progression.weight = 'bodyweight'
        else
          this.progression.weight = result.weight;

        let date = new Date(result.date)
        this.progression.date = date.toLocaleDateString();

        let user = this.authService.getUserFromLocalStorage();
        this.progression.user_id = user.user_id;
        
        this.$sub4 = this.appService.insertProgress(this.progression).subscribe(res => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(
            () => {
              this.router.navigate(['/exercises']);
            }
          )
        })
      }
    })
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
    this.$sub5 = dialogRef.afterClosed().subscribe(result => {
      this.passedValues = result;
      if(this.passedValues) {
        const userData = this.authService.getUserFromLocalStorage();
        this.passedValues.user_id = userData.user_id;
        delete this.passedValues.exerciseNames

        let newExercise: Exercise = this.passedValues
        this.isLoading = true;

        this.$sub6 = this.appService.insertExercise(newExercise)
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

    this.exerciseNames = this.exerciseNames.filter(ex => ex !==exercise.name.toLowerCase())

    var exerciseCopy: Exercise = exercise;
    const dialogRef = this.dialog.open(ExerciseUpdateDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: {exercise: exerciseCopy,
             exerciseNames: this.exerciseNames},
      position: {top: '60px'}
    });
    this.$sub7 = dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.isLoading = true;
        this.updatedValues = result;
        this.updatedValues.exercise_id = exercise.exercise_id;
        
        this.$sub8 = this.appService.updateExercise(this.updatedValues.exercise_id, this.updatedValues).subscribe(res => {
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
  selector: 'app-progress-dialog',
  templateUrl: './dialogs/progress-dialog.component.html',
  styleUrls: ['./dialogs/progress-dialog.component.css']
})
export class ProgressDialog {
  exerciseProgress: ExerciseProgress[] = []
  latestProgress: ExerciseProgress;
  contains: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ExerciseAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {exercises: string[], weight: string, sets:number, reps:number, selected: string, date:string, storedProgresses:ExerciseProgress[]},
  ) {}

  onChange(event:any) {
    this.exerciseProgress = []
    let  name = event.value;
    for (let progress of this.data.storedProgresses) {
      if (name == progress.name) {
        this.exerciseProgress.push(progress);
      }
    }
    if (this.exerciseProgress.length > 1)
      this.exerciseProgress.sort(function(a,b) { return new Date(b.date).valueOf() - new Date(a.date).valueOf() } )
    if (this.exerciseProgress.length > 0) {
      this.latestProgress = this.exerciseProgress[0];
      this.contains = true;
    }
    else 
      this.contains = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export class ImageUploadModel {
  Title: string;
  Description: string;
  ImageType: string;
  Base64String: string;
}

@Component({
  selector: 'app-exercise-add-dialog',
  templateUrl: './dialogs/exercise-add-dialog.component.html',
  styleUrls: ['./dialogs/exercise-add-dialog.component.css']
})
export class ExerciseAddDialog {
  validFile: boolean = false;
  imageUploadModel: ImageUploadModel = {
    Title: '',
    Description: '',
    ImageType: '',
    Base64String: ''
  };
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


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      this.validFile = false;
    }
    else {
      this.validFile = true;
    }
    this.imageUploadModel.Title = file.name;
    this.imageUploadModel.ImageType = file.type.split('/')[1];

    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imageUploadModel.Base64String = myReader.result!.toString();

      const body = JSON.stringify(this.imageUploadModel.Base64String).slice(1);
      this.data.imageurl = body.slice(0,-1);
    };
    myReader.readAsDataURL(file);

  }

  

}

//////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-exercise-delete-dialog',
  templateUrl: './dialogs/exercise-delete-dialog.component.html',
  styleUrls: ['./dialogs/exercise-delete-dialog.component.css']
})
export class ExerciseDeleteDialog implements OnDestroy {
  $sub: Subscription;
  isLoading : boolean = false;

  constructor(private appService: AppService,
              private router: Router,
    public dialogRef: MatDialogRef<ExerciseDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {exercise_id:number,name:string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.$sub.unsubscribe();
  }

  deleteExercise(id:number) {
    this.isLoading = true;
    this.$sub = this.appService.deleteExercise(id).subscribe(res => {
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

    imageUrl: SafeUrl;

    constructor(private appService: AppService,
                private router: Router,
                private domSanitizer: DomSanitizer,
                private el: ElementRef,
      public dialogRef: MatDialogRef<ExerciseUpdateDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
    
    oldData: Exercise;
    newData: any;

    ngOnInit(): void {
      this.oldData = this.data.exercise;
      const im: HTMLImageElement = this.el.nativeElement.querySelector('#img');
      im.src = this.oldData.imageurl;
      
      // const imageContent = atob(trimmedString);
      // const buffer = new ArrayBuffer(imageContent.length);
      // const view = new Uint8Array(buffer);

      // for (let n = 0; n < imageContent.length; n++) {
      //   view[n] = imageContent.charCodeAt(n);
      // }
      // const type = 'image/jpeg';
      // const blob = new Blob([buffer], { type });
      // const file = new File([blob], "", { lastModified: new Date().getTime(), type });

      //(document.getElementById("img") as HTMLInputElement).src = string64;

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

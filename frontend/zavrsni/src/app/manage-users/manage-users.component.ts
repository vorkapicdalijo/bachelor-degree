import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';


const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})

export class ManageUsersComponent implements OnInit, OnDestroy {

  $sub1: Subscription;
  $sub2: Subscription;
  $sub3: Subscription;
  $sub4: Subscription;
  $sub5: Subscription;

  loadedUsers: User[] = []
  displayedColumns = ['id', 'name', 'email','action'];

  dataSource: MatTableDataSource<User>;

  emailListObj: any[] = []
  emails: any[] = []

  name:string;
  email:string;
  password:string;

  newUser: User = {
    user_id: 0,
    name:'',
    password: '',
    email: '',
    role: ''
  }
  passedValues: any;
  isLoading:boolean = false;
  updatedValues:User;

  constructor(private authService: AuthService, public dialog: MatDialog, private router: Router) { }

  @ViewChild(MatTable) table: MatTable<User>;

  ngOnInit(): void {
    this.authService.loadUsers();

    this.$sub1 = this.authService.loadedUsersSub.subscribe(users => {
      this.loadedUsers = users;
      this.dataSource = new MatTableDataSource(this.loadedUsers);
    })
  }

  ngOnDestroy(): void {
    this.$sub1.unsubscribe();
    //this.$sub2.unsubscribe();
    //this.$sub3.unsubscribe();
    //this.$sub4.unsubscribe();
    //this.$sub5.unsubscribe();
  }

  openRegisterDialog() {
    this.emailListObj = [];
    this.emails = [];

    this.emailListObj = this.loadedUsers.map(({user_id,name,password,role, ...rest}) => {
      return rest
    })

    this.emailListObj.forEach(obj => {this.emails.push(obj.email.toLowerCase())});

    const dialogRef = this.dialog.open(UserRegisterDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: {
        name: this.name,
        email: this.email,
        password: this.password,
        emails: this.emails
      }
    });

    this.$sub2 = dialogRef.afterClosed().subscribe(result => {
      this.passedValues = result;
      if(result) {
        this.isLoading=true;
        this.newUser.name = result.name;
        this.newUser.email = result.email;
        this.newUser.password = result.password;
        this.newUser.role = "ROLE_USER";

        this.$sub3 = this.authService.saveUser(this.newUser).subscribe(res => {
          this.isLoading=false;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(
            () => {
              this.router.navigate(['/users']);
            })
        })
      }
    })
  }

  openDeleteDialog(id:number, name:string) {
    const dialogRef= this.dialog.open(UserDeleteDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: {
        name: name,
        id: id
      },
      position: {top: '60px'}
    });
  }

  openEditDialog(user: User) {
    this.emailListObj = [];
    this.emails = [];

    this.emailListObj = this.loadedUsers.map(({user_id,name,password,role, ...rest}) => {
      return rest
    })

    this.emailListObj.forEach(obj => {this.emails.push(obj.email.toLowerCase())});
    this.emails = this.emails.filter(email => email !==user.email.toLowerCase())

    var userCopy: User = user;
    const dialogRef = this.dialog.open(UserUpdateDialog, {
      panelClass: 'custom-dialog-container',
      width: '400px',
      data: {
        user:userCopy,
        emails: this.emails
      },
      position: {top:'60px'}
    });

    this.$sub4 = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.isLoading = true;
        this.updatedValues = result;
        this.updatedValues.user_id = user.user_id;
        this.updatedValues.role = user.role;

        this.$sub5 = this.authService.updateUser(user.user_id, this.updatedValues).subscribe(res => {
          this.isLoading = false;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(
            () => {
              this.router.navigate(['/users']);
            }
          )
        })
      }
    })
  }

}

@Component({
  selector: 'app-user-register-dialog',
  templateUrl: './dialogs/user-register-dialog.component.html',
  styleUrls: ['./dialogs/user-register-dialog.component.css']
})
export class UserRegisterDialog {

  hide:boolean = true;

  constructor(
    public dialogRef: MatDialogRef<UserRegisterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  onNoClick() {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './dialogs/user-delete-dialog.component.html',
  styleUrls: ['./dialogs/user-delete-dialog.component.css']
})
export class UserDeleteDialog implements OnDestroy {
  $sub: Subscription;
  isLoading : boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
    public dialogRef: MatDialogRef<UserDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id:number,name:string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.$sub.unsubscribe();
  }

  deleteUser(id:number) {
    this.isLoading = true;
    this.$sub = this.authService.deleteUser(id).subscribe(res => {
        this.isLoading = false;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(
          () => {
            this.router.navigate(['/users']);
        })
      
    });
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './dialogs/user-update-dialog.component.html',
  styleUrls: ['./dialogs/user-update-dialog.component.css']
})
export class UserUpdateDialog implements OnInit {
  

  constructor(private appService: AppService,
              private router: Router,
    public dialogRef: MatDialogRef<UserUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  
  oldData: User;
  newData: any;

  ngOnInit(): void {
    this.oldData = this.data.user;
    this.newData = {
      name: this.oldData.name,
      email: this.oldData.email,
      password: this.oldData.password,
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

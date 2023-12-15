import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  $sub: Subscription;

  loginForm: FormGroup;
  loading: false;
  submitted = false;
  tokens: any;
  failedLogin: boolean = false;

  email:string;
  password: string;

  error:string = '';


  constructor(private titleService: Title, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog) { 
    this.titleService.setTitle("Login");
  }

  ngOnInit(): void {
    this.openDialog();
  }

  ngOnDestroy(): void {
    this.$sub.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialog, {
      panelClass: 'login-dialog-container',
      width: '400px',
      height: '400px',
      data: {
             email: this.email,
             password: this.password,
            },
      disableClose: true
    });
    this.$sub = dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './dialogs/login-dialog.component.html',
  styleUrls: ['./dialogs/login-dialog.component.css']
})
export class LoginDialog {
  error:string = '';
  hide = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {email:string, password:string},
    private authService: AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    var email = this.loginForm.value.email!;
    var password = this.loginForm.value.password!;
    this.authService.login(email, password).subscribe(res => {this.dialogRef.close();}, err => {this.error = 'Cannot find user with given username and password';})

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { MaterialModule } from '../material/material.module';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  $sub: Subscription;
  isAuthenticated = false;
  user: any;
  userName: string = '';
  userRole: string = '';

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    
    //this.isAuthenticated = this.authService.isLoggedIn();

    this.authService.user.pipe(take(1)).subscribe(user => {
      if(user != null){
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
        this.userName = this.user.user_name;
        this.userRole = this.user.role;

        this.isAuthenticated = true;
      }
      else {
        this.isAuthenticated = false;
      }
      
    })
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    if (this.userRole == "ROLE_ADMIN")
      return true;
    return false;
  }

}

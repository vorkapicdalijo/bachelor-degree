import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription, take } from 'rxjs';
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
    
    this.isAuthenticated = this.authService.isLoggedIn();

    this.authService.user.subscribe(user => {
      if(user != null){
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
        this.userName = this.user.user_name;
        this.userRole = this.user.role;

        if (user.access_token != null) {
          let helper = new JwtHelperService();
          let timeout = helper.getTokenExpirationDate(user.access_token)!.valueOf() - new Date().valueOf();

          this.authService.expirationCounter(timeout);
        }

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

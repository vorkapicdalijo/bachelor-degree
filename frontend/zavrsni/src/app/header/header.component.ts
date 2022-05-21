import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { MaterialModule } from '../material/material.module';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  user: any;
  userName: string = '';
  userRole: string = '';

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
      if(this.isAuthenticated)
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
        console.log(this.user);
        this.userName = this.user.user_name;
        this.userRole = this.user.role;
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

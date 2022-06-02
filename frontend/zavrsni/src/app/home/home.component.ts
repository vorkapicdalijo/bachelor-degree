import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postId: any;
  errorMessage: string;

  username: string;
  
  constructor(private http: HttpClient, private titleService: Title) { 
    this.titleService.setTitle("Home");
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if(user) {
      this.username = user.user_name;
      this.username = this.username.split(" ")[0];
    }
  }
}

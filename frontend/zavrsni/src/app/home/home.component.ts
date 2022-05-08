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
  test: User[];
  postId: any;
  errorMessage: string;
  
  constructor(private http: HttpClient, private titleService: Title) { 
    this.titleService.setTitle("Home");
  }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8080/api/v1/person').subscribe(data => {
        this.test = data;
        
    })   
  }

  posalji() {
    this.http.post<any>('http://localhost:8080/api/v1/person',{name:"igore"}).subscribe({
      next: data => {
          this.postId = data;
          console.log(data);
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  })
  }

  update() {
    this.http.put
  }

  delete() {
    
  }

}

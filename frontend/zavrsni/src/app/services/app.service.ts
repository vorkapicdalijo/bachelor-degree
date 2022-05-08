import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  $fetchSub: Subscription;
  loadedExercisesSub = new Subject<Exercise[]>();
  deletedExerciseSub = new Subject<boolean>();

  constructor(private http: HttpClient) { }


  getExercises() {
   this.$fetchSub = this.http.get<Exercise[]>(environment.baseUrl + environment.getExercises)
        .subscribe(exercises => {
          this.loadedExercisesSub.next(exercises);
        })
  }
  deleteExercise(id:number) {
    this.$fetchSub = this.http.delete<Exercise>(environment.baseUrl+environment.getExercises+`${id}`)
      .subscribe(confirmation => {
        //this.deletedExerciseSub.next(true);
      });
  }
  updateExercise(id:number, exercise: Exercise) {
    var body = exercise;
    this.$fetchSub = this.http.put<Exercise>(environment.baseUrl+environment.getExercises+`${id}`,
        body)
      .subscribe(confirmation => {
      });
  }

  insertExercise(exercise: Exercise) {
    var body = exercise;
    this.$fetchSub = this.http.post<Exercise>(environment.baseUrl+environment.getExercises, body )
      .subscribe(confirmation => {
        
      });
  }
}

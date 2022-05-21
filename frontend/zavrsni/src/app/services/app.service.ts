import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exercise } from '../models/exercise';
import { Workout } from '../models/workout';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  $fetchSub: Subscription;
  loadedExercisesSub = new Subject<Exercise[]>();
  loadedWorkoutsSub = new Subject<Workout[]>();

  deletedExerciseSub = new Subject<boolean>();

  exercises: Exercise[] = []

  constructor(private http: HttpClient) { }


  getExercises() {
   return this.http.get<Exercise[]>(environment.baseUrl + environment.getExercises).subscribe(exercises => {
     this.loadedExercisesSub.next(exercises);
     this.exercises = exercises;
   })
  }
  getWorkouts() {
    this.$fetchSub = this.http.get<Workout[]>(environment.baseUrl + environment.getWorkouts)
      .subscribe(workouts => {
          this.loadedWorkoutsSub.next(workouts);
      })
  }

  deleteExercise(id:number) {
    return this.http.delete<Exercise>(environment.baseUrl+environment.getExercises+`${id}`)
     
  }
  updateExercise(id:number, exercise: Exercise) {
    var body = exercise;
    return this.http.put<Exercise>(environment.baseUrl+environment.getExercises+`${id}`,
        body)
  }

  insertExercise(exercise: Exercise) {
    var body = exercise;
    console.log(body);
    return this.http.post<Exercise>(environment.baseUrl+environment.getExercises, body )
      
  }


}

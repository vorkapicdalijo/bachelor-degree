import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exercise } from '../models/exercise';
import { Workout } from '../models/workout';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  $fetchSub: Subscription;
  loadedExercisesSub = new Subject<Exercise[]>();
  loadedWorkoutsSub = new Subject<Workout[]>();
  loadedUserWorkoutsSub = new Subject<Workout[]>();

  deletedExerciseSub = new Subject<boolean>();

  exercises: Exercise[] = []

  constructor(private http: HttpClient, private authService: AuthService) { }


  getExercises() {
   return this.http.get<Exercise[]>(environment.baseUrl + environment.exercises).subscribe(exercises => {
     this.loadedExercisesSub.next(exercises);
     this.exercises = exercises;
   })
  }
  getWorkouts() {
    this.$fetchSub = this.http.get<Workout[]>(environment.baseUrl + environment.workouts)
      .subscribe(workouts => {
          this.loadedWorkoutsSub.next(workouts);
      })
  }

  getWorkoutsByUserId() {
    let user = this.authService.getUserFromLocalStorage();
    let userId = user.user_id;

    this.$fetchSub = this.http.get<Workout[]>(environment.baseUrl+environment.userworkouts+`${userId}`)
      .subscribe(userWorkouts => {
        this.loadedUserWorkoutsSub.next(userWorkouts);
      })

  }

  deleteExercise(id:number) {
    return this.http.delete<Exercise>(environment.baseUrl+environment.exercises+`${id}`)
     
  }
  updateExercise(id:number, exercise: Exercise) {
    var body = exercise;
    return this.http.put<Exercise>(environment.baseUrl+environment.exercises+`${id}`,
        body)
  }

  insertExercise(exercise: Exercise) {
    var body = exercise;
    return this.http.post<Exercise>(environment.baseUrl+environment.exercises, body )
      
  }

  insertWorkout(workout: Workout) {
    var body = workout;
    return this.http.post<Workout>(environment.baseUrl+environment.workouts, body )
  }

  getScheduledWorkouts() {
    return this.http.post<any>(environment.baseUrl+'/sch',{})
  }


}

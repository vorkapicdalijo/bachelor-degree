import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { AuthGuard } from './guards/auth.guard';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  { path: 'workouts', component: WorkoutDetailsComponent, canActivate: [AuthGuard] },
  { path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuard]},
  { path: 'schedule', component: ScheduleComponent,canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [BrowserModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

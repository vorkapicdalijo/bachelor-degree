import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AppRoutingModule } from './app-routing.module';
import { ScheduleAllModule, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent, LoginDialog } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExerciseAddDialog, ExerciseDeleteDialog, ExercisesComponent, ExerciseUpdateDialog } from './exercises/exercises.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AvatarModule } from 'ngx-avatar';
import { NameValidatorDirective } from './validators/name-validator.directive';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    WorkoutDetailsComponent,
    ScheduleComponent,
    StatisticsComponent,
    LoginComponent,
    RegisterComponent,
    ExercisesComponent,
    ExerciseAddDialog,
    ExerciseDeleteDialog,
    ExerciseUpdateDialog,
    LoginDialog,
    NameValidatorDirective
    
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ScheduleModule,
    ScheduleAllModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    AvatarModule
  ],
  exports: [RouterModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService,
        AuthGuard,
        {provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }

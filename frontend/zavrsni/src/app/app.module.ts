import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { WorkoutAddDialog, WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AppRoutingModule } from './app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent, LoginDialog } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExerciseAddDialog, ExerciseDeleteDialog, ExercisesComponent, ExerciseUpdateDialog, ProgressDialog } from './exercises/exercises.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AvatarModule } from 'ngx-avatar';
import { NameValidatorDirective } from './validators/name-validator.directive';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ScheduleComponent } from './schedule/schedule.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RecurrenceEditorAllModule, ScheduleAllModule, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ManageUsersComponent, UserDeleteDialog, UserUpdateDialog } from './manage-users/manage-users.component';
import { UserRegisterDialog} from './manage-users/manage-users.component'
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgApexchartsModule } from 'ng-apexcharts';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    WorkoutDetailsComponent,
    StatisticsComponent,
    LoginComponent,
    RegisterComponent,
    ExercisesComponent,
    ExerciseAddDialog,
    ExerciseDeleteDialog,
    ExerciseUpdateDialog,
    ProgressDialog,
    LoginDialog,
    WorkoutAddDialog,
    UserRegisterDialog,
    UserDeleteDialog,
    UserUpdateDialog,
    NameValidatorDirective,
    ScheduleComponent,
    ManageUsersComponent
    
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    ScheduleModule,
    DropDownListModule,
    DatePickerModule,
    AvatarModule,
    DragDropModule,
    ScheduleAllModule,
    NgApexchartsModule,
    RecurrenceEditorAllModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [RouterModule],
  providers: [
        AuthGuard,
        {provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }

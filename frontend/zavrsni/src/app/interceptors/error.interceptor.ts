import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  sub401 = new Subject<boolean>();

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) {
        //this.authService.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}

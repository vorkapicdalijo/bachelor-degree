import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
   
   const user = JSON.parse(localStorage.getItem('user') || '{}');
  
   const token = user.access_token;

   if(token) {
     const cloned = request.clone({
       headers: request.headers.set("Authorization", "Bearer "+token)
     });

     return next.handle(cloned);
   }

   else {
    return next.handle(request);
   }
   
  }
}

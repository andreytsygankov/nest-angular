import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { HTTP_STATUSES } from '../common/config';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      const token = StorageService.getItem('token');

      if (err.status === HTTP_STATUSES.STATUS_401 && token) {
        // auto logout if 401 response returned from api
        this.authService.logout();
        location.reload();
      }
      const error = err.error.message || err.statusText;

      // const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}

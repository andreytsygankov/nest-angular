import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = StorageService.getItem('token');

    if (token) {
      const headers = {Authorization: `Bearer ${token}`};

      if (!request.headers.has('Contents')) {
        headers['Content-Type'] = 'application/json';
      }

      request = request.clone({
        setHeaders: {...headers}
      });
    }

    return next.handle(request);
  }
}

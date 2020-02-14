import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { get } from 'lodash';

import { API_PATH } from '../common/config';
import { environment } from '../../environments/environment';

import { LoginData } from '../models/loginData.model';
import { LoginResponse } from '../models/loginResponse.model';
import { Router } from '@angular/router';
import {RegisterResponse} from "../models/registerResponse.model";

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(true);

  // public static checkIfTokenExpired(date: string): boolean {
  //   return +new Date() < +new Date(date);
  // }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const sessionToken = StorageService.getItem('token');
    // const isTokenExpire = AuthService.checkIfTokenExpired(StorageService.getItem('accessTokenExpire'));

    // if (!sessionToken || isTokenExpire) {
    //   this.loggedIn.next(false);
    //   return;
    // }

    if (!sessionToken) {
      this.loggedIn.next(false);
      return;
    }

    this.loggedIn
      .subscribe(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
        }
      });
  }
  // Primitive value of Observable
  public get currentUserValue(): boolean {
    return this.loggedIn.value;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get apiUrl() {
    return environment.API_SERVER;
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  setloggedIn(val) {
    this.loggedIn.next(val);
  }

  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/${API_PATH.login}`, data)
      .pipe(
        take(1),
        map((res: LoginResponse) => {

          const { user } = res.data;
          if (!get(res.data, 'token', 'default')) {
            this.setloggedIn(false);
            throw Error();
          }

          StorageService.setItem('token', res.data.token, true);
          StorageService.setItem('user', user);

          this.setloggedIn(true);

          return res;
        })
      );
  }

    register(data): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.apiUrl}/${API_PATH.register}`, data)
            .pipe(
                take(1),
                map((res: RegisterResponse) => {
                    return res;
                })
            );
    }

  logout() {
    StorageService.clearAll();
    this.loggedIn.next(false);
    return this.loggedIn.pipe(first());
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {take, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {get} from 'lodash';

import {API_PATH} from '../common/config';
import {environment} from '../../environments/environment';

import {Router} from '@angular/router';
import {CustomersResponse} from '../models/customers-response.model';
import {Success} from "../models/success.model";
import {UserResponse} from "../models/user-response.model";

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    get apiUrl() {
        return environment.API_SERVER;
    }


    getUser(): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${this.apiUrl}/${API_PATH.userData}`)
            .pipe(
                take(1),
                map((res: UserResponse) => {
                    return res;
                })
            );
    }

    updateUser(body, id): Observable<Success> {
        const options =  { params: new HttpParams().set('userID', id)};
        return this.http.put<Success>(`${this.apiUrl}/${API_PATH.user_update}`, body, options)
            .pipe(
                take(1),
                map((res: Success) => {
                    return res;
                })
            );
    }

}

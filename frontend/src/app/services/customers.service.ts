import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {take, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {get} from 'lodash';

import {API_PATH} from '../common/config';
import {environment} from '../../environments/environment';

import {Router} from '@angular/router';
import {CustomersResponse} from '../models/customers-response.model';
import {Success} from '../models/success.model';

@Injectable()
export class CustomerService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    get apiUrl() {
        return environment.API_SERVER;
    }

    getCustomers(limit, offset, filter?): Observable<CustomersResponse> {
        const options =  { params: new HttpParams().set('limit', limit).set('offset', offset).set('filter', filter)};
        return this.http.get<CustomersResponse>(`${this.apiUrl}/${API_PATH.customers}`, options)
            .pipe(
                take(1),
                map((res: CustomersResponse) => {
                    return res;
                })
            );
    }

    createCustomer(body): Observable<Success> {
        return this.http.post<Success>(`${this.apiUrl}/${API_PATH.create}`, body)
            .pipe(
                take(1),
                map((res: Success) => {
                    return res;
                })
            );
    }

    getCustomer(id): Observable<CustomersResponse> {
        return this.http.get<CustomersResponse>(`${this.apiUrl}/${API_PATH.customer}/${id}`)
            .pipe(
                take(1),
                map((res: CustomersResponse) => {
                    return res;
                })
            );
    }

    updateCustomer(body, id): Observable<Success> {
        const options =  { params: new HttpParams().set('customerID', id)};
        return this.http.put<Success>(`${this.apiUrl}/${API_PATH.update}`, body, options)
            .pipe(
                take(1),
                map((res: Success) => {
                    return res;
                })
            );
    }

    deleteCustomer(id): Observable<Success> {
        const options =  { params: new HttpParams().set('customerID', id)};
        return this.http.delete<Success>(`${this.apiUrl}/${API_PATH.delete}`, options)
            .pipe(
                take(1),
                map((res: Success) => {
                    return res;
                })
            );
    }

}

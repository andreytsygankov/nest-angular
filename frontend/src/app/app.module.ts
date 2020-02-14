import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './services/auth.guard';
import {AuthService} from './services/auth.service';
import {JwtInterceptor} from './services/jwtInterceptor.service';
import {ErrorInterceptor} from './services/errorInterceptor.service';
import {CustomerService} from './services/customers.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CreateCustomerComponent} from './components/create-customer/create-customer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ToastrModule} from 'ngx-toastr';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {ProfileComponent} from './components/profile/profile.component';
import {UserService} from './services/user.service';
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
    declarations: [
        AppComponent,
        SiteLayoutComponent,
        DashboardComponent,
        ProfileComponent,
        CreateCustomerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        ToastrModule.forRoot({
            timeOut: 3000
        }),
        MatSidenavModule,
        MatListModule,
        MatPaginatorModule,
    ],
    providers: [
        HttpClientModule,
        AuthGuard,
        AuthService,
        UserService,
        CustomerService,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

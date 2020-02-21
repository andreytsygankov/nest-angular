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
import {FlexLayoutModule} from '@angular/flex-layout';
import {CreateCustomerComponent} from './components/create-customer/create-customer.component';
import {ToastrModule} from 'ngx-toastr';
import {ProfileComponent} from './components/profile/profile.component';
import {UserService} from './services/user.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {NgZorroAntdModule, NZ_I18N, en_US} from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';

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
        FlexLayoutModule,
        ToastrModule.forRoot({
            timeOut: 3000
        }),
        NzLayoutModule,
        NgZorroAntdModule,
        NzButtonModule,
        NzFormModule
    ],
    providers: [
        HttpClientModule,
        AuthGuard,
        AuthService,
        UserService,
        CustomerService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        { provide: NZ_I18N, useValue: en_US }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

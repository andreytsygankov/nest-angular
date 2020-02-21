import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import {NgZorroAntdModule, NzFormModule, NzInputModule} from 'ng-zorro-antd';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzButtonModule} from 'ng-zorro-antd/button';


export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [LoginComponent],
  providers: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NzFormModule,
        NzInputModule,
        NzLayoutModule,
        NgZorroAntdModule,
        NzButtonModule,
    ]
})
export class LoginModule {
  static routes = routes;
}

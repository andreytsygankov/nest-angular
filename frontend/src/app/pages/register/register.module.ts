import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import {NgZorroAntdModule, NzFormModule, NzInputModule} from 'ng-zorro-antd';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzButtonModule} from 'ng-zorro-antd/button';


export const routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [RegisterComponent],
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
export class RegisterModule {
  static routes = routes;
}

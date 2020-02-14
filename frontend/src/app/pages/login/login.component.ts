import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginData } from '../../models/loginData.model';
import { LoginResponse } from '../../models/loginResponse.model';
import {emailValidator} from "../../common/validators/email.validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.loginForm.get('email').valueChanges.subscribe((val) => {
      if (this.error) {
        this.loginForm.controls.email.setErrors(null);
        this.loginForm.controls.password.setErrors(null);
        this.error = '';
      }
    });
    this.loginForm.get('password').valueChanges.subscribe((val) => {
      if (this.error) {
        this.loginForm.controls.email.setErrors(null);
        this.loginForm.controls.password.setErrors(null);
        this.error = '';
      }
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  get isFormValid() {
    return this.loginForm.valid;
  }

  inputClasses(f, input) {
    return {
      valid: !f[input].errors && (f[input].touched || f[input].dirty),
      invalid: f[input].errors && (f[input].touched || f[input].dirty)
    };
  }

  onSubmit() {
    const loginData: LoginData = {
      ...this.loginForm.value
    };
    this.authService.login(loginData).subscribe((response: LoginResponse) => {
      this.router.navigate(['/']);
    }, error => {
      this.error = error;
      console.warn('error', error);
    });
  }

}

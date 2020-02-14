import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import {RegisterResponse} from '../../models/registerResponse.model';
import {ToastrService} from 'ngx-toastr';
import {passwordValidator} from '../../common/validators/password.validator';
import {emailValidator} from '../../common/validators/email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public error = '';
  passwordPopUp = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]]
    });

    // this.registerForm.get('email').valueChanges.subscribe((val) => {
    //   if (this.error) {
    //     this.registerForm.controls.email.setErrors(null);
    //     this.registerForm.controls.password.setErrors(null);
    //     this.error = '';
    //   }
    // });
    // this.registerForm.get('password').valueChanges.subscribe((val) => {
    //   if (this.error) {
    //     this.registerForm.controls.email.setErrors(null);
    //     this.registerForm.controls.password.setErrors(null);
    //     this.error = '';
    //   }
    // });
  }

  get form() {
    return this.registerForm.controls;
  }

  get isFormValid() {
    return this.registerForm.valid;
  }

  inputClasses(f, input) {
    return {
      valid: !f[input].errors && (f[input].touched || f[input].dirty),
      invalid: f[input].errors && (f[input].touched || f[input].dirty)
    };
  }

  onSubmit() {
    const data = {
      ...this.registerForm.value
    };
    this.authService.register(data).subscribe((res: RegisterResponse) => {
      this.toastrService.success(res.data.message);
      this.router.navigate(['/login']);
    }, error => {
      this.error = error;
      console.warn('error', error);
    });
  }

}

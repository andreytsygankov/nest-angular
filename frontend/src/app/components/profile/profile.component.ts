import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../services/customers.service';
import {CustomersResponse} from '../../models/customers-response.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateCustomer} from '../../models/customer.model';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {UserModule} from '../../../../../backend/src/user/user.module';
import {UserResponse} from '../../models/user-response.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public userForm: FormGroup;
    public userID;
    public dataCustomerObj;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private toastrService: ToastrService,
    ) {
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            address: ['', [Validators.required]],
        });

        this.dataUser();
    }

    get isFormValid() {
        return this.userForm.valid;
    }

    dataUser() {
        this.userService.getUser().subscribe((response: UserResponse) => {
            this.dataCustomerObj = response.data;
            this.userForm.patchValue(response.data, {onlySelf: true});
        }, error => {
            console.warn('error', error);
        });
    }

    onSubmit() {
        const user: User = {
            ...this.userForm.value
        };
        this.userService.updateUser(user, this.userID).subscribe((res) => {
            this.toastrService.success(res.data.message);
        }, error => {
            console.warn('error', error);
        });


    }

}

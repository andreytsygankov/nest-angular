import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../services/customers.service';
import {CustomersResponse} from '../../models/customers-response.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateCustomer} from '../../models/customer.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  public customerForm: FormGroup;
  public customerID;
  public dataCustomerObj;
  public currentState = 'new';
  constructor(
      private customerService: CustomerService,
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private toastrService: ToastrService,
  ) {}

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.customerID = this.route.snapshot.queryParamMap.get('id') || '';

    if (this.customerID) {
      this.dataCustomer(this.customerID);
      this.currentState = 'update';
    }
  }

  get isFormValid() {
    return this.customerForm.valid;
  }

  dataCustomer(id) {
    this.customerService.getCustomer(id).subscribe((response: CustomersResponse) => {
      this.dataCustomerObj = response.data;
      this.customerForm.patchValue(response.data, {onlySelf: true});
    }, error => {
      console.warn('error', error);
    });
  }

  onSubmit() {
    const customer: CreateCustomer = {
      ...this.customerForm.value
    };
    if (this.customerID) {
      this.customerService.updateCustomer(customer, this.customerID).subscribe((res) => {
        this.toastrService.success(res.data.message);
        this.router.navigate(['/']);
      }, error => {
        console.warn('error', error);
      });
    } else {
      this.customerService.createCustomer(customer).subscribe((res) => {
        this.toastrService.success(res.data.message);
        this.router.navigate(['/']);
      }, error => {
        console.warn('error', error);
      });
    }

  }

}

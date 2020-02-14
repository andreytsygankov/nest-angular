import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../services/customers.service';
import {CustomersResponse} from '../../models/customers-response.model';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
      private customerService: CustomerService,
      private router: Router,
      private toastrService: ToastrService,
  ) {}

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phone', 'address', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>();
  sizeOptions = [5, 10];
  limit = this.sizeOptions[0];
  offset = 0;
  length;
  filter = '';

  customersList: any;

  ngOnInit() {
    this.customers(this.limit, this.offset, this.filter);
  }

  customers(limit, offset, filter?) {
    this.customerService.getCustomers(limit, offset, filter).subscribe((res: CustomersResponse) => {
      this.customersList = res.data.list;
      this.length = res.data.count;
      this.dataSource.data = res.data.list;
    }, error => {
      console.log(error);
    });
  }

  editProduct(id) {
    this.router.navigate(['/create'], {queryParams: {id}});
  }

  getServerData(event) {
    this.limit = event.pageSize;
    this.offset = event.pageIndex;
    this.customers(this.limit, this.offset, this.filter);
  }

  applyFilter(event) {
    this.filter = event;
    this.limit = this.sizeOptions[0];
    this.offset = 0;
    this.customers(this.limit, this.offset, this.filter);
  }

  deleteProduct(id) {
    this.customerService.deleteCustomer(id).subscribe((res) => {
      this.toastrService.success(res.data.message);
      this.customers(this.limit, this.offset, this.filter);
    }, error => {
      console.log(error);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserResponse} from '../../models/user-response.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private router: Router,
      private userService: UserService
  ) { }

  isCollapsed = false;
  user;
  userID: any;

  public title = 'Andromeda';
  public placement = 'bottomRight';

  ngOnInit() {
    this.dataUser();
  }

  dataUser() {
    this.userService.getUser().subscribe((response: UserResponse) => {
      this.user = response.data;
    }, error => {
      console.warn('error', error);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

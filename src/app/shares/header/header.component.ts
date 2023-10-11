import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserJwtSessionDto} from "../../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  mySession!: UserJwtSessionDto | null;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authStateChanged.subscribe((isLoggedin) => {
      this.isLoggedIn = isLoggedin;
      this.isAdmin = this.authService.isAdmin();
      this.mySession = this.authService.getCurrentSession();
    });
  }

  logout() {
    this.authService.logout();
  }
}

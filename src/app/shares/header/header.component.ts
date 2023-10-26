import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserDto} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  isLoggedIn: boolean = false;
  isDoctor: boolean = false;
  myInformations!: UserDto;

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
    this.authService.authStateChanged.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.isDoctor = this.authService.isDoctor();
    });
  }

  logout() {
    this.authService.logout();
  }
}

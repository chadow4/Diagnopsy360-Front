import {Component, OnInit} from '@angular/core';
import {UserDto, UserJwtSessionDto} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Flowbite} from "../../decorators/flowbite";

@Flowbite()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  userList!: UserDto[];
  mySession!: UserJwtSessionDto;

  constructor(private userService: UserService,
              private authService: AuthService) {

  }

  ngOnInit() {
  }

  disconnect() {
    this.authService.logout();
  }

}

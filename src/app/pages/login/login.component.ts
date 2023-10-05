import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserLoginDto} from "../../models/user.model";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm : any = {email:'', password:''};


  constructor(private authService : AuthService,
              private router : Router,
              private alertService: AlertService) { }

  ngOnInit(): void {

  }


  onSubmit() {
    const userLogin = this.loginForm as UserLoginDto;
    this.authService.login(userLogin).subscribe({
      next: (res) => {
        this.router.navigate(['/']).then(
          () => this.alertService.success("You are logged in"));
      },
      error: err => this.alertService.error(err.error.message)
    });

  }

}

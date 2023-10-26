import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {UserCreateDto} from "../../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: UserCreateDto = {firstname: '', lastname: '', email: '', password: ''};


  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {
  }

  onSubmit() {
    this.authService.register(this.registerForm).subscribe({
      next: (res) => {
        this.router.navigate(['login']).then(
          () => this.alertService.success(res.message));
      },
      error: err => this.alertService.error(err.error.message)
    });
  }
}

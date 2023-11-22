import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";
import {UserDto, UserUpdateDto, UserUpdatePasswordDto} from "../../models/user.model";
import {Flowbite} from "../../decorators/flowbite";

@Flowbite()
@Component({
  selector: 'app-myinfos',
  templateUrl: './myinfos.component.html',
  styleUrls: ['./myinfos.component.scss']
})
export class MyinfosComponent implements OnInit {
  user!: UserDto;
  userForm: FormGroup;
  passwordForm: FormGroup;
  showPasswordForm: boolean = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    });
    this.passwordForm = this.formBuilder.group({
      lastPassword: ['', [Validators.required, Validators.minLength(4)]],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.userService.getMyInfos().subscribe(res => {
      this.userForm.patchValue({
        email: res.email,
        firstname: res.firstname,
        lastname: res.lastname
      });
    });
  }

  updateUserInfos() {
    if (this.userForm.valid) {
      const updateUser = this.userForm.value as UserUpdateDto;
      this.userService.updateUser(updateUser).subscribe({
        next: (res) => {
          this.ngOnInit();
          this.alertService.success(res.message);
        },
        error: err => this.alertService.error(err.error.message)
      });
    }
  }

  updateUserPassword() {
    if (this.passwordForm.valid) {
      const updateUserPassword = this.passwordForm.value as UserUpdatePasswordDto;
      this.userService.updateUserPassword(updateUserPassword).subscribe({
        next: (res) => {
          this.ngOnInit();
          this.alertService.success(res.message);
        },
        error: err => this.alertService.error(err.error.message)
      });
    }
  }
}

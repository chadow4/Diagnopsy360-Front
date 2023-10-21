import {Component, OnInit} from '@angular/core';
import {Flowbite} from "../../decorators/flowbite";
import { UserDto } from '../../models/user.model';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";  

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
 
  listClient: UserDto[] = []; // Liste pour stocker les utilisateurs avec le rôle 'client'

  constructor(private authService : AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.showPatientsWithNoDoctor().subscribe(clients => {
      this.listClient = clients;
    });

  }
}

import {Component, OnInit} from '@angular/core';
import {Flowbite} from "../../decorators/flowbite";
import { UserDto } from '../../models/user.model';
import {AlertService} from "../../services/alert.service";
import {UserService} from "../../services/user.service";  

@Flowbite()
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
 
  listClient: UserDto[] = []; // Liste pour stocker les utilisateurs avec le rôle 'client'

  constructor(private authService : AlertService,
              private userService: UserService) { }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.userService.getAllUsers().subscribe(users => {
      this.listClient = users.filter(user => user.role === 'admin'); //TODO replace by client
    });
  }


}

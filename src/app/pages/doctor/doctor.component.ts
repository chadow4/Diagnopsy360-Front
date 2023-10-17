import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Flowbite} from "../../decorators/flowbite";

@Flowbite()
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {


  constructor(private authService: AuthService) {

  }

  ngOnInit() {
  }


}

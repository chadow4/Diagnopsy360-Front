import {Component, OnInit} from '@angular/core';
import {Flowbite} from "../../decorators/flowbite";
import { UserDto } from '../../models/user.model';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";  
import { DiagnosisDto } from 'src/app/models/diagnosis.model';
import { DiagnosisService } from 'src/app/services/diagnosis.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
 
  listDiagnosis: DiagnosisDto[] = []; // Liste pour stocker les utilisateurs avec le rôle 'client'

  constructor(private authService : AuthService,
              private diagnosisService: DiagnosisService) { }

  ngOnInit() {
    this.diagnosisService.getDiagnosisNotValidated().subscribe(diag => {
      this.listDiagnosis = diag;
    });

  }
}

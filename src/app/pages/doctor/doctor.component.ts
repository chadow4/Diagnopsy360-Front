import {Component, OnInit} from '@angular/core';
import { DiagnosisDto } from 'src/app/models/diagnosis.model';
import { Router } from "@angular/router";
import { DiagnosisService } from 'src/app/services/diagnosis.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
 
  listDiagnosis: DiagnosisDto[] = []; // Liste pour stocker les utilisateurs avec le rôle 'client'
  myPatients: DiagnosisDto[] = []; // Liste pour stocker les utilisateurs avec le rôle 'client'
  myId: number = 0;

  constructor(private router: Router,private diagnosisService: DiagnosisService) { }

  ngOnInit() {
      this.diagnosisService.getDiagnosisNotValidated().subscribe(diag => {
        this.listDiagnosis = diag;
      });

      this.diagnosisService.selectMyPatientDiagnosis().subscribe(mydiag => {
        this.myPatients = mydiag;
      }, error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }
  onButtonClick(clickId:number) {
    this.router.navigate(['doctor/diag'], { queryParams: {
      id: clickId
    }});
  }
              
            
}

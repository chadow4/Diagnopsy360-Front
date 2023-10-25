import {Component, OnInit} from '@angular/core';
import { DiagnosisDto } from 'src/app/models/diagnosis.model';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { UserDto } from 'src/app/models/user.model';
import {AlertService} from "src/app/services/alert.service";


@Component({
  selector: 'app-doctor',
  templateUrl: './diag.component.html',
  styleUrls: ['./diag.component.scss']
})
export class DiagComponent implements OnInit {
  diag!: DiagnosisDto;
  id: number = 0;
  diagnosticQuestions = [
      {
          questionText: "Comment vous sentez-vous en général?",
      },
      {
          questionText: "Avez-vous des problèmes de sommeil?",
      },
      {
          questionText: "Êtes-vous souvent anxieux?",
      },
      {
          questionText: "Avez-vous des pensées suicidaires?",
      },
      {
          questionText: "Avez-vous des antécédents de troubles mentaux?",
      },
      {
          questionText: "Êtes-vous satisfait de vos relations personnelles?",
      },
      {
          questionText: "Comment gérez-vous le stress?",
      },
      {
          questionText: "Êtes-vous souvent en colère?",
      },
      {
          questionText: "Êtes-vous satisfait de votre travail?",
      },
      {
          questionText: "Avez-vous des problèmes de concentration?",
      }
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private diagnosisService: DiagnosisService,
              private alertService: AlertService) {} 

  ngOnInit() {
    this.id = Number(this.route.snapshot.queryParamMap.get('id'));
    this.diagnosisService.getDiagnosisById(this.id).subscribe(diagnosis => {
      this.diag = diagnosis;
      if (this.diag.diagnosisValidated == true) {
        this.router.navigate(['doctor']).then(
          () => this.alertService.error("Diagnosis already validated"));;
      }
    });
     // Check for security and prevent bybass via GET
    // this.diagnosisService.getDiagnosisNotValidated().subscribe(diag => {
    //   this.listDiagnosis = diag;

    //   const patientWithIdExists = this.listDiagnosis.some(d => d.patient && d.patient.id === this.id);
  
    //   if (patientWithIdExists) {
    //     console.log(`Patient with ID ${this.id} exists in the diagnosis list.`);
    //   } else {
    //     console.log(`Patient with ID ${this.id} does NOT exist in the diagnosis list.`);
    //     this.router.navigate(['doctor']);
    //   }
    // });
  }
              
            
}

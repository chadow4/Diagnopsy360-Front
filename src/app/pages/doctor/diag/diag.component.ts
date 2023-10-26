import {Component, OnInit} from '@angular/core';
import { DiagnosisDto, ResponseDiagnosisDto } from 'src/app/models/diagnosis.model';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import {AlertService} from "src/app/services/alert.service";
import { TreatmentDto } from 'src/app/models/treatment.model';
import { TreatmentService } from 'src/app/services/treatment.service';


@Component({
  selector: 'app-doctor',
  templateUrl: './diag.component.html',
  styleUrls: ['./diag.component.scss']
})
export class DiagComponent implements OnInit {
  diag: DiagnosisDto | null = null;
  listeTreatment: TreatmentDto[] = [];
  id: number = 0;
  diagForm : ResponseDiagnosisDto = {diagnosisResponse:'', treatmentIds:[]};
  selectedTreatments: { [id: number]: boolean } = {};
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
              private alertService: AlertService,
              private treatmentService: TreatmentService) {} 

  ngOnInit() {
    this.id = Number(this.route.snapshot.queryParamMap.get('id'));
    this.diagnosisService.getDiagnosisById(this.id).subscribe(diagnosis => {
      this.diag = diagnosis;
      if (this.diag.diagnosisValidated == true) {
        this.router.navigate(['doctor']).then(
          () => this.alertService.error("Diagnosis already validated"));;
      }
    });
    this.treatmentService.getAllTreatments().subscribe(treat => {
      this.listeTreatment = treat;
    });

    
  }

  onSubmit() {
    this.diagnosisService.selectDoctorDiagnosis(this.id).subscribe(test => {
      this.diagnosisService.createResponseDiagnosis(this.id, this.diagForm).subscribe({
        next: (res) => {
          this.router.navigate(['/doctor']).then(
            () => this.alertService.success("Successfully sent"));
        },
        error: err => this.alertService.error(err.error.message)
      });
    });;
  }

  toggleSelection(treatment: TreatmentDto) {
    const index = this.diagForm.treatmentIds.indexOf(treatment.id);
    if (index === -1) {
        this.diagForm.treatmentIds.push(treatment.id);
    } else {
        this.diagForm.treatmentIds.splice(index, 1);
    }
}
}

import {Component, OnInit} from '@angular/core';
import {DiagnosisDto} from "../../../models/diagnosis.model";
import {DiagnosisService} from "../../../services/diagnosis.service";

@Component({
  selector: 'app-my-diagnosis',
  templateUrl: './my-diagnosis.component.html',
  styleUrls: ['./my-diagnosis.component.scss']
})
export class MyDiagnosisComponent implements OnInit {

  diagnosisValidated: DiagnosisDto[] = [];
  diagnosisNotValidated: DiagnosisDto[] = [];

  constructor(private diagnosisService: DiagnosisService) {
  }

  ngOnInit(): void {
    this.diagnosisService.getMyDiagnosis().subscribe(diag => {
      this.diagnosisValidated = diag.filter(diag => diag.diagnosisValidated);
      this.diagnosisNotValidated = diag.filter(diag => !diag.diagnosisValidated);
    });
  }

}

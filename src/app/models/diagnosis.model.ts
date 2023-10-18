import {TreatmentDto} from "./treatment.model";
import {UserDto} from "./user.model";

export interface SendSymtomsDiagnosisDto {
  symptoms: string[];
}

export interface ResponseDiagnosisDto {
  diagnosisResponse: string;
  treatmentIds: number[];
}

export interface DiagnosisDto {
  id: number;
  name: string;
  diagnosisDate: Date;
  symptoms: string[];
  diagnosisResponse: string;
  diagnosisValidated: boolean;
  patient: UserDto;
  doctor: UserDto;
  treatments: TreatmentDto[];
}

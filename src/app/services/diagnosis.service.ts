import {Injectable} from '@angular/core';
import {API_URL} from "./config";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { catchError } from 'rxjs/operators';

import {DiagnosisDto, ResponseDiagnosisDto, SendSymtomsDiagnosisDto} from "../models/diagnosis.model";

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  user_API = API_URL + "/diagnosis/";

  constructor(private http: HttpClient) {
  }

  public getDiagnosisNotValidated(): Observable<DiagnosisDto[]> {
    return this.http.get<DiagnosisDto[]>(this.user_API);
  }

  public getDiagnosisById(id: number): Observable<DiagnosisDto> {
    return this.http.get<DiagnosisDto>(this.user_API + id);
  }

  public sendSymptomsDiagnosis(sendSymtomsDiagnosisDto: SendSymtomsDiagnosisDto): Observable<any> {
    return this.http.post<SendSymtomsDiagnosisDto>(this.user_API + 'send', sendSymtomsDiagnosisDto);
  }

  public selectDoctorDiagnosis(id: number): Observable<any> {
    return this.http.put<any>(this.user_API + 'select/' + id, {});
  }

  public selectMyDiagnosis(id: number): Observable<DiagnosisDto[]> {
    return this.http.get<DiagnosisDto[]>(this.user_API + 'mydiags/' +id).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des diagnostics:', error);
        return throwError(error);
      })
    );
  }

  public createResponseDiagnosis(id: number, responseDiagnosisDto: ResponseDiagnosisDto): Observable<any> {
    return this.http.put<any>(this.user_API + 'response/' + id, responseDiagnosisDto);
  }


}

import {Injectable} from '@angular/core';
import {API_URL} from "./config";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { catchError } from 'rxjs/operators';

import {TreatmentDto} from "../models/treatment.model";

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  user_API = API_URL + "/treatment/";

  constructor(private http: HttpClient) {
  }

  public getAllTreatments(): Observable<TreatmentDto[]> {
    return this.http.get<TreatmentDto[]>(this.user_API);
  }

  public getDiagnosisById(id: number): Observable<TreatmentDto> {
    return this.http.get<TreatmentDto>(this.user_API + id);
  }

}

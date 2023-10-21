import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "./config";
import {Observable} from "rxjs";
import {UserDto} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user_API = API_URL + "/user/";
  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.user_API);
  }

  public getMyInfos(): Observable<UserDto> {
    return this.http.get<UserDto>(this.user_API + 'myinfos');
  }

  public getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(this.user_API + id);
  }

  public updateUser(user: UserDto): Observable<any> {
    return this.http.put<UserDto>(this.user_API, user);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.user_API + id);
  }

  //Patient part
  public showAllPatient(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.user_API + 'patients');
  }

  public showPatientsWithNoDoctor(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.user_API + 'patientsnodoctor');
  }


}

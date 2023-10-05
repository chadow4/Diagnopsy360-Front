import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AlertService} from "./alert.service";
import {UserCreateDto, UserJwtSessionDto, UserJWtTokenDto, UserLoginDto} from "../models/user.model";
import {API_URL} from "./config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth_API = API_URL + "/auth/";
  USER_JWT_TOKEN_KEY = 'USER_JWT_TOKEN_KEY';

  private isLoggedInSubject = new BehaviorSubject<boolean>(!!this.getCurrentSession());
  public authStateChanged = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {
  }

  public login(userLoginDto: UserLoginDto) {
    return this.http.post<UserJWtTokenDto>(this.auth_API + 'login', userLoginDto).pipe(
      tap((response: UserJWtTokenDto) => {
        this.setCurrentToken(response);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  public register(userCreateDto: UserCreateDto): Observable<any> {
    return this.http.post<UserCreateDto>(this.auth_API + 'register', userCreateDto);
  }

  public logout(): void {
    localStorage.removeItem(this.USER_JWT_TOKEN_KEY);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/home']);
  }

  public getCurrentSession(): UserJwtSessionDto {
    const userJwtToken = localStorage.getItem(this.USER_JWT_TOKEN_KEY);
    return userJwtToken ? JSON.parse(atob(userJwtToken.split('.')[1])) : null;
  }

  public isLoggedIn(): boolean {
    return this.getCurrentSession() !== null;
  }

  public isAdmin(): boolean {
    return this.getCurrentSession().role === "admin";
  }

  public getCurrentToken(): UserJWtTokenDto | null {
    const userJwtToken = window.localStorage.getItem(this.USER_JWT_TOKEN_KEY);
    return userJwtToken ? JSON.parse(userJwtToken) : null;
  }

  private setCurrentToken(userJwtTokenDTO: UserJWtTokenDto) {
    const userJwtTokenString = JSON.stringify(userJwtTokenDTO);
    window.localStorage.setItem(this.USER_JWT_TOKEN_KEY, userJwtTokenString);
  }
}

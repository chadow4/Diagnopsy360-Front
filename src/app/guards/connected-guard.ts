import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {AlertService} from "../services/alert.service";

@Injectable({providedIn: 'root'})

export class ConnectedGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService, private alertService: AlertService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const loggedIn = this.authService.isLoggedIn();
        if (!loggedIn) {
            this.alertService.error("Vous devez être connecté pour accéder à cette page");
            this.router.navigate(['/']);
        }
        return loggedIn;
    }

}

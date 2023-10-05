import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) {
  }


  public success(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['green-snackbar']
    });
  }

  public error(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['red-snackbar']
    });
  }

}
